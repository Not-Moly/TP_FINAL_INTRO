# To RUN: "make 'function'" from main folder

.PHONY: start-db start-npm stop-db run-backend start-http-server run-frontend

# BACK
start-db:
	cd ./backend && docker compose up -d
stop-db:
	cd ./backend && docker compose down
start-npm:
	cd ./backend && npm run dev

run-backend:start-db start-npm

# FRONT
start-http-server:
	cd ./frontend && http-server --cors

run-frontend:start-http-server
	
