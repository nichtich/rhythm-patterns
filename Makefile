test:
	npm run test --workspaces

lint:
	npm run lint

fix:
	npm run lint -- --fix

ci:
	npm ci --workspaces

build:
	npm run build --if-present --workspaces

docs:
	npm run doc --if-present --workspaces

all: ci test build
