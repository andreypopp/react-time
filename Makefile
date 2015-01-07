BIN = ./node_modules/.bin
TEST_OPTIONS = -R dot --transform [ reactify --harmony ]

install link:
	@npm $@

test:
	@$(BIN)/mochify $(TEST_OPTIONS) ./spec.js

ci:
	@$(BIN)/mochify $(TEST_OPTIONS) --watch ./spec.js

lint:
	@$(BIN)/jsxhint --force-transform src/index.js

release-patch: lint test build
	@$(call release,patch)

release-minor: lint test build
	@$(call release,minor)

release-major: lint test build
	@$(call release,major)

dist/index.js: src/index.js
	@mkdir -p $(@D)
	@$(BIN)/jsx --harmony $< > $@

build: dist/index.js

clean:
	@rm -rf ./dist

publish: build
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
