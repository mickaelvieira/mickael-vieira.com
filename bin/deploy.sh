#!/bin/bash

set -o nounset # set -u
set -o errexit # set -e
set -o pipefail
#set -x

declare -r RESET_ALL="\x1b[0m"
declare -r BG_RED="\x1b[41m"
declare -r BG_BLUE="\x1b[44m"
declare -r BG_MAGENTA="\x1b[45m"
declare -r FG_WHITE="\x1b[97m"
declare -r FG_RED="\x1b[31m"
declare -r FG_BLUE="\x1b[34m"
declare -r FG_MAGENTA="\x1b[35m"

error() {
    echo -e "${BG_RED}${FG_WHITE}ERROR${RESET_ALL}  ${FG_RED}$1${RESET_ALL}" >&2
}
info() {
    echo -e "${BG_BLUE}${FG_WHITE}INFO${RESET_ALL}  ${FG_BLUE}$1${RESET_ALL}"
}

declare -r base=${DEV_DIR:-}

if [[ -z "${base}" ]]; then
    error "Base directory cannot be an empty string"
    exit 1
fi

declare -r src="${base}mickael-vieira.com/"
declare -r dest="${base}mickaelvieira.github.io/"

info "RUnning build"
npm run build

info "Synchronizing files"

rsync --verbose \
        --times \
        --owner \
        --group \
        --recursive \
        --delete-before \
        --include="index.html" \
        --include="dist/***" \
        --include="cv/***" \
        --exclude="*" "${src}" "${dest}"

cd "${dest}"

info "Moved to $(pwd)"

info "Auto-committing build result and pushing to master"

git add -A .
git commit -m "Auto-committing build result"
git push origin master

info "Done!"
exit 0
