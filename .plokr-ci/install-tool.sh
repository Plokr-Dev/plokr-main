#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync (check-drift.sh enforces this).
#
# Download a pinned security tool and verify it against a hardcoded SHA-256
# before it is ever executed. Linux x86_64 only (GitHub-hosted ubuntu runners).
#
#   .plokr-ci/install-tool.sh <gitleaks|trivy|osv-scanner|hadolint|actionlint|syft|lefthook> [bin-dir]
#
# The checksums below were copied from each project's release checksum file
# for the pinned version. To bump a tool: change version AND sha256 together,
# in plokr-ci, then re-sync every repo.
set -euo pipefail

tool="${1:-}"
bin_dir="${2:-${RUNNER_TEMP:-/tmp}/plokr-bin}"

if [[ "$(uname -s)" != "Linux" || "$(uname -m)" != "x86_64" ]]; then
  echo "install-tool.sh: only linux/x86_64 is supported (got $(uname -s)/$(uname -m))." >&2
  echo "Install ${tool:-the tool} with your OS package manager instead." >&2
  exit 2
fi

case "$tool" in
  gitleaks)
    version="8.30.1"
    url="https://github.com/gitleaks/gitleaks/releases/download/v${version}/gitleaks_${version}_linux_x64.tar.gz"
    sha256="551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb"
    kind="tar"; member="gitleaks" ;;
  trivy)
    version="0.74.0"
    url="https://github.com/aquasecurity/trivy/releases/download/v${version}/trivy_${version}_Linux-64bit.tar.gz"
    sha256="2ae6fe3ee734b7fdf11335663e18c75ea12dccc76062f09f164a3b0f8be4371a"
    kind="tar"; member="trivy" ;;
  osv-scanner)
    version="2.6.0"
    url="https://github.com/google/osv-scanner/releases/download/v${version}/osv-scanner_linux_amd64"
    sha256="ca69b3d3cd08f889a49dc0a383122f71cc528b83803671df5fd874d97485b108"
    kind="bin"; member="osv-scanner" ;;
  hadolint)
    version="2.15.1"
    url="https://github.com/hadolint/hadolint/releases/download/v${version}/hadolint-linux-x86_64"
    sha256="c7187db94eeeeca956519a6af171adc31453941a1e777961f6e680f697c8c507"
    kind="bin"; member="hadolint" ;;
  actionlint)
    version="1.7.12"
    url="https://github.com/rhysd/actionlint/releases/download/v${version}/actionlint_${version}_linux_amd64.tar.gz"
    sha256="8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8"
    kind="tar"; member="actionlint" ;;
  syft)
    version="1.52.0"
    url="https://github.com/anchore/syft/releases/download/v${version}/syft_${version}_linux_amd64.tar.gz"
    sha256="caeedb81fb0491615f1ebd1761e4145d41ee86dd2cc7bf80669f9f5ad9d6133d"
    kind="tar"; member="syft" ;;
  lefthook)
    version="2.1.14"
    url="https://github.com/evilmartians/lefthook/releases/download/v${version}/lefthook_${version}_Linux_x86_64"
    sha256="3a00d7c023a701a72ee071a91d4c9f347a862fcd68295d8d8dffd02f92d81ddf"
    kind="bin"; member="lefthook" ;;
  *)
    echo "usage: $0 <gitleaks|trivy|osv-scanner|hadolint|actionlint|syft|lefthook> [bin-dir]" >&2
    exit 2 ;;
esac

mkdir -p "$bin_dir"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

download="$work/download"
curl --fail --silent --show-error --location --retry 3 --proto '=https' --tlsv1.2 \
  --output "$download" "$url"

echo "${sha256}  ${download}" | sha256sum --check --strict --quiet || {
  echo "install-tool.sh: SHA-256 MISMATCH for ${tool} ${version} (${url}). Refusing to install." >&2
  exit 1
}

if [[ "$kind" == "tar" ]]; then
  tar -xzf "$download" -C "$work" "$member"
  install -m 0755 "$work/$member" "$bin_dir/$member"
else
  install -m 0755 "$download" "$bin_dir/$member"
fi

if [[ -n "${GITHUB_PATH:-}" ]]; then
  echo "$bin_dir" >> "$GITHUB_PATH"
fi
echo "installed ${tool} ${version} -> ${bin_dir}/${member} (sha256 verified)"
