.PHONY: build server

OS         := $(shell uname -s)
PATH       := node_modules/.bin:$(PATH)
SHELL      := /bin/bash
NODE_DIR   := node_modules
PUBLIC_DIR := public
SOURCE_DIR := src
TARGET_DIR := $(PUBLIC_DIR)/dist

ifeq ($(NODE_ENV),production)
	SASS_FLAGS := --sourcemap=none
else
	SASS_FLAGS := --sourcemap=inline --trace
endif

POSTCSS_FLAGS := --replace true --no-map --use autoprefixer

SASS       := sass $(SASS_FLAGS)
CP         := cp -p
CPR        := cp -vpPR
MKD        := mkdir -p
NODE       := node
JEST       := NODE_ENV=test jest --config=jest.json
RSYNC      := rsync -rut --delete-before
UGLIFY     := uglifycss --ugly-comments
PRETTIER   := prettier --write
LOGGER     := logger() { printf "\x1b[32m\xE2\x87\x92 %s\x1b[0m\n" "$$1"; }
WEBPACK    := webpack --config webpack.config.js

# Phony commands ===============================================================
all: install clean build-client build-server

install:
	NODE_ENV=development yarn

clean:
	$(MKD) $(TARGET_DIR)
	rm -rf $(TARGET_DIR)/*
	rm -f caches.json public/dist/caches.js public/dist/hashes.json
	rm -f ./server/server

show:
	@echo '====== ENVIRONMENT ======'
	@echo 'OS      :' $(OS)
	@echo 'PATH    :' $(PATH)
	@echo 'SHELL   :' $(SHELL)
	@echo 'NODE    :' $(NODE_ENV)
	@echo '====== SOURCES ======'
	@echo 'SASS    :' $(src_scss)
	@echo 'CSS     :' $(src_css)
	@echo 'JS      :' $(src_js)
	@echo '====== TARGETS ======'
	@echo 'FONTS   :' $(tgt_fonts)
	@echo 'CSS     :' $(tgt_css)
	@echo 'JS      :' $(tgt_js)

build-client:
	yarn build:client

build-server:
	cd ./server && go build

server:
	cd ./server && ./server

watch:
	yarn watch:client

test:
	$(JEST)

test-watch:
	$(JEST) --watch

test-coverage:
	$(JEST) --coverage

test-coveralls:
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

lint:
	yarn lint
	# @for file in docker hash lib.sh watch; do \
	# 	shellcheck -e SC1090 -e SC2155 "bin/$$file" || exit 1; \
	# done

fmt:
	$(PRETTIER) './src/js/**/*.js'
	$(PRETTIER) './server/**/*.js'
	$(PRETTIER) './spec/**/*.js'
