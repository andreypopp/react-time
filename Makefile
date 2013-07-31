BIN = ./node_modules/.bin
SRC = $(wildcard *.jsx)
LIB = $(SRC:%.jsx=%.js)
REPO = $(shell cat .git/config | grep url | xargs echo | sed -E 's/^url = //g')
REPONAME = $(shell echo $(REPO) | sed -E 's_.+:([a-zA-Z0-9_\-]+)/([a-zA-Z0-9_\-]+)\.git_\1/\2_')

build: $(LIB)

%.js: %.jsx
	@mkdir -p $(@D)
	@$(BIN)/jsx $< > $@

clean:
	@rm -f $(LIB)

install link:
	@npm $@

test:
	@$(BIN)/mocha -t 5000 -b -R spec spec.js

release-patch: build test
	@$(call release,patch)

release-minor: build test
	@$(call release,minor)

release-major: build test
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	VERSION=`node -pe "require('./package.json').version"` && \
	NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
  node -e "\
  	var j = require('./package.json');\
  	j.version = \"$$NEXT_VERSION\";\
  	var s = JSON.stringify(j, null, 2);\
  	require('fs').writeFileSync('./package.json', s);" && \
  git commit -m "release $$NEXT_VERSION" -- package.json && \
  git tag "$$NEXT_VERSION" -m "release $$NEXT_VERSION"
endef
