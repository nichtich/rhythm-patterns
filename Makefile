test:
	npm run test --workspaces

coverage:
	npm run coverage --if-present --workspaces

lint:
	npm run lint

fix:
	npm run lint -- --fix

ci:
	npm ci && npm ci --workspaces

build: rhythms
	npm run build --if-present --workspaces

docs:
	npm run doc --if-present --workspaces

rhythms: rhythms.json
rhythms.json: rhythms/*.md
	npm run rhythms

dev:
	cd package/rhythmicon-app; npm run dev

all: ci test build
