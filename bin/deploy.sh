#!/bin/bash

#set -x
set -u -e -o pipefail

info() {
    echo -e "\x1b[32m\xE2\x87\x92 $1 \x1b[0m"
}

error() {
    echo -e "\x1b[97m\x1b[41m\x21\x1b[0m \x1b[31m$1\x1b[0m" 1>&2
    exit 1
}

declare -r BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)"

if [[ -z "${BASE}" ]]; then
    error "Base directory cannot be an empty string"
    exit 1
fi

declare -r SRC="${BASE}/mickael-vieira.com/"
declare -r DEST="${BASE}/mickaelvieira.github.io/"

[[ -d $SRC ]] || error "Source directory ${SRC} does not exist"
[[ -d $DEST ]] || error "Destination directory ${DEST} does not exist"

update_source() {
    info "Updating source"

    cd "${SRC}"

    git pull
}

update_destination() {
    info "Updating destination"

    cd "${DEST}"

    git pull
}

sync_files() {
    info "Synchronizing files"

    cd "${SRC}"

    rsync --verbose \
        --times \
        --owner \
        --group \
        --recursive \
        --delete-before \
        --include="index.html" \
        --include="dist/***" \
        --exclude="*" "${SRC}" "${DEST}"
}

build_source() {
    info "Running build"

    cd "${SRC}"

    npm install
}

auto_commit() {
    info "Auto-committing build result and pushing to master"

    cd "${DEST}"

    git add -A .
    git commit -m "Auto-committing build result"
    git push origin master
}

main() {
    update_source
    update_destination
    build_source
    sync_files
    auto_commit

    info "Done!"
    exit 0
}

main

