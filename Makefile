# To RUN: "make 'function'" from main folder

.PHONY: start-db start-npm stop-db

start-db:
	cd ./backend && docker compose up -d

stop-db:
	cd ./backend && docker compose down

start-npm:
	cd ./backend && npm run dev

run-backend:start-db start-npm
start-frontend:
	cd ./frontend && http-server --cors

	
