#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$ROOT_DIR/dist"

REMOTE_HOST="${DEPLOY_HOST:-}"
REMOTE_USER="${DEPLOY_USER:-}"
REMOTE_PATH="${DEPLOY_PATH:-}"
REMOTE_PORT="${DEPLOY_PORT:-22}"
RSYNC_DELETE="${DEPLOY_DELETE:-false}"

usage() {
  cat <<'USAGE'
Deploy Party Club website to a live server.

Required environment variables:
  DEPLOY_HOST   Server hostname or IP, for example partyclubapp.com
  DEPLOY_USER   SSH user, for example ubuntu
  DEPLOY_PATH   Absolute web root path, for example /var/www/partyclubapp.com/html

Optional environment variables:
  DEPLOY_PORT   SSH port. Defaults to 22.
  DEPLOY_DELETE Set to true to delete remote files that are not in dist/.

Example:
  DEPLOY_HOST=partyclubapp.com \
  DEPLOY_USER=ubuntu \
  DEPLOY_PATH=/var/www/partyclubapp.com/html \
  ./deploy.sh
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

for value_name in DEPLOY_HOST DEPLOY_USER DEPLOY_PATH; do
  if [[ -z "${!value_name:-}" ]]; then
    echo "Missing required environment variable: $value_name" >&2
    echo >&2
    usage >&2
    exit 1
  fi
done

command -v npm >/dev/null 2>&1 || {
  echo "npm is required but was not found." >&2
  exit 1
}

command -v rsync >/dev/null 2>&1 || {
  echo "rsync is required but was not found." >&2
  exit 1
}

cd "$ROOT_DIR"

echo "Building production bundle..."
npm run build

if [[ ! -f "$DIST_DIR/index.html" ]]; then
  echo "Build did not produce $DIST_DIR/index.html" >&2
  exit 1
fi

RSYNC_ARGS=(-az --human-readable --info=stats2,progress2)
if [[ "$RSYNC_DELETE" == "true" ]]; then
  RSYNC_ARGS+=(--delete)
fi

echo "Deploying dist/ to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH ..."
rsync "${RSYNC_ARGS[@]}" -e "ssh -p $REMOTE_PORT" "$DIST_DIR"/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"/

echo "Deployment complete."
echo "Verify: https://partyclubapp.com/"
