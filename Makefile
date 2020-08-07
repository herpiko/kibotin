build:
	docker build -t herpiko/kibotin-app .
	(cd api && docker build -t herpiko/kibotin-api .)
run:
	docker-compose up --force-recreate

proxy:
	docker-compose up --force-recreate proxy


