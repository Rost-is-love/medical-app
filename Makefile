install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon bin/index.js

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml .

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test

.PHONY: test