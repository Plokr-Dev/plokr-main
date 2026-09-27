#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# Decide which heavy CI jobs a change needs, to save Actions minutes WITHOUT
# using workflow-level `paths` filters (those would let a docs-only PR skip the
# secret scan). Security jobs always run; this only gates build/test/image jobs.
# Writes to $GITHUB_OUTPUT:
#   code=true|false    anything besides docs changed
#   image=true|false   container build inputs changed (always true on push/schedule)
# Requires a checkout with fetch-depth: 0.
set -euo pipefail

zero="0000000000000000000000000000000000000000"
has_commit() { [[ -n "${1:-}" && "$1" != "$zero" ]] && git cat-file -e "${1}^{commit}" 2>/dev/null; }

has_dockerfile=false
if [[ -n "$(git ls-files -- 'Dockerfile' 'Dockerfile.*')" ]]; then has_dockerfile=true; fi

changed=""
all=false
if [[ "${EVENT_NAME:-}" == "pull_request" ]] && has_commit "${PR_BASE_SHA:-}" && has_commit "${PR_HEAD_SHA:-}"; then
  changed="$(git diff --name-only "${PR_BASE_SHA}...${PR_HEAD_SHA}")"
else
  # push to main, schedule, workflow_dispatch: run everything.
  all=true
fi

code=true
image=$has_dockerfile
if [[ "$all" == "false" ]]; then
  code=false
  image=false
  while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    case "$f" in
      *.md|docs/*|LICENSE|LICENSE.*|.github/ISSUE_TEMPLATE/*) ;;
      *) code=true ;;
    esac
    case "$f" in
      Dockerfile|Dockerfile.*|.dockerignore|docker-compose*.yml|compose*.yml|go.mod|go.sum|package.json|package-lock.json|nginx.conf|.trivyignore|.plokr-ci/*|.github/workflows/*)
        image=$has_dockerfile ;;
    esac
  done <<< "$changed"
fi

echo "code=${code} image=${image} (event=${EVENT_NAME:-unknown}, dockerfile=${has_dockerfile})"
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  { echo "code=${code}"; echo "image=${image}"; } >> "$GITHUB_OUTPUT"
fi
