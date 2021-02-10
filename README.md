### Finances Project
It is a simple API project to organizer your own personal finances.
The motivation to creates this project is to test some libs and technologies.


### How to Run (development)
To run this project we can use `docker-compose`

##### Create `.env`
Fist we need to creates and populate `.env` file (just copy `.env.sample` and define some variables)

##### Startup application
```
docker-compose up
```
##### Creates database:
> Note: `personal_finances_dev` should be the same name that you put at your `POSTGRES_DB` in `.env`, otherwise default options is `personal_finances_dev`
```
docker-compose exec db createdb -h localhost -U postgres personal_finances_dev
```

#### Run migrations:
```
docker-compose exec app yarn typeorm migration:run
```

### Test application
We have 2 endpoints:
`GET /transactions` - list all transactions created
`POST /transactions` - Creates a transaction


### Next steps:
- [ ] Create `Serializer` classes
- [ ] Create `Search` classes
- [ ] Paginate resources
- [ ] Adding logger
- [ ] Improve errros
- [ ] Changes project structure (modules) (?)
- [ ] Add `factory-girl` and `faker` to help in tests
