#!/bin/bash
# shellcheck disable=SC2034
# Disable https://github.com/koalaman/shellcheck/wiki/SC2034 as it cannot see
# that this file is being sourced by other scripts
set -e -u -o pipefail
# set -x

declare -r PUBLIC_DIR="public"
declare -r DIST_DIR="${PUBLIC_DIR}/dist"

info() {
    printf "\x1b[32m\xE2\x87\x92 %s\x1b[0m\n" "$1"
}

error() {
    printf "\x1b[97m\x1b[41m\x21\x1b[0m \x1b[31m%s\x1b[0m\n" "$1" 1>&2
    exit 1
}

ensure_dir() {
    cd "$(CDPATH="" cd -- "$(dirname -- "$0")" && pwd -P)/../" || return
    info "Working directory $(pwd)"
}

is_install() {
    command -v "$1" > /dev/null 2>&1 || error "'$1' (command not found)"
}
