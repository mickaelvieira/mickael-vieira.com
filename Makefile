.PHONY: all clean install show watch build build_dir build_css build_js \
	build_fonts fonts_css fonts_files rewrite_font_paths minify_css hash test test-watch \
	test-coverage test-coveralls fmt lint docker server

OS         := $(shell uname -s)
PATH       := node_modules/.bin:$(PATH)
SHELL      := /bin/bash
NODE_DIR   := node_modules
SOURCE_DIR := public
TARGET_DIR := $(SOURCE_DIR)/dist

ifeq ($(NODE_ENV),production)
	SASS_FLAGS := --sourcemap=none
else
	SASS_FLAGS := --sourcemap=inline --trace
endif

POSTCSS_FLAGS := --replace true --no-map --use autoprefixer

SASS     := sass $(SASS_FLAGS)
CP       := cp -p
CPR      := cp -vpPR
MKD      := mkdir -p
NODE     := node
JEST     := NODE_ENV=test jest --config=jest.json
RSYNC    := rsync -rut --delete-before
UGLIFY   := uglifycss --ugly-comments
PRETTIER := prettier --write
LOGGER   := logger() { printf "\x1b[32m\xE2\x87\x92 %s\x1b[0m\n" "$$1"; }

# Resources paths ==============================================================
# Stylesheets
src_scss              := $(SOURCE_DIR)/scss
src_scss_main         := $(wildcard $(addprefix $(src_scss)/,*.scss))
src_css               := $(SOURCE_DIR)/css
tgt_css               := $(TARGET_DIR)/css

# Javascripts
src_js                := $(SOURCE_DIR)/js
src_js_main           := $(wildcard $(addprefix $(src_js)/,*.js))
tgt_js                := $(TARGET_DIR)/js

# Fonts
src_awesome_family    := $(NODE_DIR)/font-awesome
src_awesome_files     := $(src_awesome_family)/fonts
src_awesome_regular   := $(src_awesome_family)/css

src_roboto_family     := $(NODE_DIR)/roboto-fontface
src_roboto_files      := $(src_roboto_family)/fonts
src_roboto_regular    := $(src_roboto_family)/css/roboto
src_roboto_condensed  := $(src_roboto_family)/css/roboto-condensed
src_roboto_slab       := $(src_roboto_family)/css/roboto-slab

src_bootstrap_family  := $(NODE_DIR)/bootstrap/dist
src_bootstrap_files   := $(src_bootstrap_family)/fonts
src_bootstrap_regular := $(src_bootstrap_family)/css

tgt_fonts             := $(TARGET_DIR)/fonts
tgt_awesome           := $(tgt_fonts)/font-awesome
tgt_roboto            := $(tgt_fonts)/roboto
tgt_bootstrap         := $(tgt_fonts)/bootstrap

# Images
src_images := $(SOURCE_DIR)/images
tgt_images := $(TARGET_DIR)/images

# Phony commands ===============================================================
all: install clean build hash

install:
	NODE_ENV=development yarn

clean:
	$(MKD) $(TARGET_DIR)
	rm -rf $(TARGET_DIR)/*
	rm -f caches.json public/caches.js

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

docker-run:
	@docker run -dt -p 127.0.0.1:8000:8000 --name website --rm -P website

docker-build:
	@bin/docker

server:
	$(NODE) server/index.js

watch:
	@bin/watch

hash:
	@bin/hash

test:
	$(JEST)

test-watch:
	$(JEST) --watch

test-coverage:
	$(JEST) --coverage

test-coveralls:
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

lint:
	@eslint --quiet -c .eslintrc src
	@for file in docker hash lib.sh watch; do \
		shellcheck -e SC1090 -e SC2155 "bin/$$file" || exit 1; \
	done

fmt:
	$(PRETTIER) './public/js/**/*.js'
	$(PRETTIER) './public/sw.js'
	$(PRETTIER) './server/**/*.js'
	$(PRETTIER) './spec/**/*.js'
	$(PRETTIER) rollup.config.js

build:        build_dir build_css build_js build_fonts rewrite_font_paths autoprefix_css minify_css build_images
build_dir:    $(tgt_css) $(tgt_js) $(tgt_roboto) $(tgt_awesome) $(tgt_bootstrap) $(tgt_images)
build_css:    $(addprefix $(tgt_css)/,styles.css normalize.css)
build_js:     $(addprefix $(tgt_js)/,main.js)
build_fonts:  fonts_css fonts_files
fonts_css:    $(addprefix $(tgt_css)/,roboto.css roboto-condensed.css roboto-slab.css font-awesome.css bootstrap.css)
fonts_files:  $(tgt_roboto)/% $(tgt_awesome)/% $(tgt_bootstrap)/%
build_images: $(tgt_images)/%

rewrite_font_paths:
	@$(LOGGER); logger "Rewriting fonts paths..."
ifeq ($(OS),Darwin)
	# @sed -i .bak -E "s/fonts\/fontawesome/fonts\/font-awesome\/fontawesome/g" $(TARGET_DIR)/css/font-awesome.css
	# @rm -f $(TARGET_DIR)/css/font-awesome.css.bak
	# @sed -i .bak -E "s/\.\.\/fonts/..\/fonts\/bootstrap/g" $(TARGET_DIR)/css/bootstrap.css
	# @rm -f $(TARGET_DIR)/css/bootstrap.css.bak
	@for file in roboto.css roboto-condensed.css roboto-slab.css; do \
		sed -i .bak -E "s/\.\.\/\.\.\/fonts/..\/fonts\/roboto/g" "$(TARGET_DIR)/css/$$file"; \
		rm -f $(TARGET_DIR)/css/$$file.bak; \
	done
else
	# @sed -E "s/fonts\/fontawesome/fonts\/font-awesome\/fontawesome/g" -i $(TARGET_DIR)/css/font-awesome.css
	# @sed -E "s/\.\.\/fonts/..\/fonts\/bootstrap/g" -i $(TARGET_DIR)/css/bootstrap.css
	@for file in roboto.css roboto-condensed.css roboto-slab.css; do \
		sed -E "s/\.\.\/\.\.\/fonts/..\/fonts\/roboto/g" -i "$(TARGET_DIR)/css/$$file"; \
	done
endif

minify_css:
ifeq ($(NODE_ENV),production)
	@$(LOGGER); logger "Minifying css files..."
	@for file in $(shell find $(tgt_css) -type f -name "*.css"); do \
		$(UGLIFY) "$$file" > "$$file.tmp"; \
		rm -f "$$file"; \
		mv "$$file.tmp" "$$file"; \
	done
endif

autoprefix_css:
ifeq ($(NODE_ENV),production)
	@$(LOGGER); logger "Autoprefixing css files..."
	@postcss $(addprefix $(tgt_css)/,styles.css) $(POSTCSS_FLAGS)
endif

# Target directories ===========================================================
$(tgt_css):
	$(MKD) $(tgt_css)

$(tgt_js):
	$(MKD) $(tgt_js)

$(tgt_fonts):
	$(MKD) $(tgt_fonts)

$(tgt_roboto):
	$(MKD) $(tgt_roboto)

$(tgt_awesome):
	$(MKD) $(tgt_awesome)

$(tgt_bootstrap):
	$(MKD) $(tgt_bootstrap)

$(tgt_images):
	$(MKD) $(tgt_images)

# Targets ======================================================================
# Stylesheets
$(tgt_css)/styles.css: $(src_scss_main) | $(tgt_css)
	$(SASS) $(src_scss)/styles.scss:$@

$(tgt_css)/normalize.css: $(NODE_DIR)/normalize-css/normalize.css | $(tgt_css)
	$(UGLIFY) $< > $@

# Javascripts
$(tgt_js)/main.js: $(src_js_main) | $(tgt_js)
	rollup -c rollup.config.js

# Fonts CSS
$(tgt_css)/roboto.css: $(src_roboto_regular)/roboto-fontface.css | $(tgt_css)
	$(CP) $< $@

$(tgt_css)/roboto-condensed.css: $(src_roboto_condensed)/roboto-condensed-fontface.css | $(tgt_css)
	$(CP) $< $@

$(tgt_css)/roboto-slab.css: $(src_roboto_slab)/roboto-slab-fontface.css | $(tgt_css)
	$(CP) $< $@

$(tgt_css)/font-awesome.css: $(src_awesome_regular)/font-awesome.min.css | $(tgt_css)
	$(CP) $< $@

$(tgt_css)/bootstrap.css: $(src_bootstrap_regular)/bootstrap.css | $(tgt_css)
	$(CP) $< $@

# Fonts Files
$(tgt_roboto)/%: $(src_roboto_files) | $(tgt_roboto)
	$(RSYNC) $</. $(@D)

$(tgt_awesome)/%: $(src_awesome_files) | $(tgt_awesome)
	$(RSYNC) $</. $(@D)

$(tgt_bootstrap)/%: $(src_bootstrap_files) | $(tgt_bootstrap)
	$(RSYNC) $</. $(@D)

# Images
$(tgt_images)/%: $(src_images) | $(tgt_images)
	$(RSYNC) $</. $(@D)
