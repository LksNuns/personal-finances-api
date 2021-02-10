## Initializes postgres database with docker

#### Create database:

```
docker-compose up
docker-compose exec db createdb -h localhost -U postgres personal_finances_dev
```

#### Drop database:
```
docker-compose up
docker-compose exec db dropdb -h localhost -U postgres --if-exists personal_finances_dev
```

#### Migrate:
```
docker-compose exec app yarn typeorm migration:run
```
