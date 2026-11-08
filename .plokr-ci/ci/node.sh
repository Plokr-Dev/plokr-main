#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# Node gates shared by the angular and astro profiles.
#   node.sh eslint             REQUIRED: fails when the repo has no ESLint config
#   node.sh test [args...]     npm test (only if package.json defines a test script)
#   node.sh astro-check        npx astro check (only if @astrojs/check is installed)
#   node.sh node-tests         node --test over tests/ (REQUIRED: fails if tests/ is missing)
set -euo pipefail

has_dep() {
  node -e 'const p = require("./package.json"); const n = process.argv[1];
    process.exit(((p.dependencies || {})[n] || (p.devDependencies || {})[n]) ? 0 : 1)' "$1"
}

cmd_eslint() {
  local cfg
  cfg="$(ls eslint.config.js eslint.config.mjs eslint.config.cjs eslint.config.ts eslint.config.mts eslint.config.cts \
           .eslintrc .eslintrc.js .eslintrc.cjs .eslintrc.json .eslintrc.yml .eslintrc.yaml 2>/dev/null | head -n 1 || true)"
  if [[ -z "$cfg" ]]; then
    echo "::error::No ESLint config found. Security linting is a required gate: add eslint.config.js (and eslint to devDependencies)."
    exit 1
  fi
  if ! has_dep eslint; then
    echo "::error::${cfg} exists but eslint is not in (dev)dependencies; CI will not download an unpinned eslint."
    exit 1
  fi
  npx --no-install eslint .
}

cmd_test() {
  local script
  script="$(npm pkg get scripts.test)"
  if [[ "$script" == "{}" || -z "$script" ]]; then
    echo "::notice::package.json has no test script; skipping unit tests."
    return 0
  fi
  npm test -- "$@"
}

cmd_astro_check() {
  if has_dep @astrojs/check; then
    npx --no-install astro check
  else
    echo "::notice::@astrojs/check is not installed; skipping astro check."
  fi
}

cmd_node_tests() {
  if [[ ! -d tests ]]; then
    echo "::error::tests/ is missing. The astro profile requires node:test security-header tests in tests/."
    exit 1
  fi
  local files=()
  while IFS= read -r -d '' f; do files+=("$f"); done < <(
    find tests -type f \( -name '*.test.js' -o -name '*.test.mjs' -o -name '*.test.cjs' \
                        -o -name '*.spec.js' -o -name '*.spec.mjs' -o -name '*.spec.cjs' \) -print0 | sort -z)
  if (( ${#files[@]} == 0 )); then
    while IFS= read -r -d '' f; do files+=("$f"); done < <(
      find tests -type f \( -name '*.js' -o -name '*.mjs' -o -name '*.cjs' \) -print0 | sort -z)
  fi
  if (( ${#files[@]} == 0 )); then
    echo "::error::tests/ contains no JavaScript test files."
    exit 1
  fi
  # `node --test tests/` treats the directory as a module on Node 22, so the
  # files are passed explicitly.
  node --test "${files[@]}"
}

sub="${1:-}"; shift || true
case "$sub" in
  eslint) cmd_eslint ;;
  test) cmd_test "$@" ;;
  astro-check) cmd_astro_check ;;
  node-tests) cmd_node_tests ;;
  *) echo "usage: $0 <eslint|test|astro-check|node-tests>" >&2; exit 2 ;;
esac
