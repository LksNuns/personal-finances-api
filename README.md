## Initializes postgres database with docker

#### Creates a docker container to postgres:
```
docker run --name personal_finances_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

#### Creates a database:
```
docker exec -it personal_finances_postgres createdb -h localhost -U postgres personal_finances_dev
```
