BIN = ./node_modules/.bin

install link:
	@npm $@

test:
	@$(BIN)/mochify -R dot ./spec.js

ci:
	@$(BIN)/mochify --watch -R dot ./spec.js

lint:
	@$(BIN)/jsxhint --force-transform index.js

release-patch: lint test
	@$(call release,patch)

release-minor: lint test
	@$(call release,minor)

release-major: lint test
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	@$(BIN)/jsx --harmony src/index.jsx > dist/index.js
	npm publish

define release
	npm version $(1)
endef
