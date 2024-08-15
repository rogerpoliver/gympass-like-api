![GymPass Like API](.github/img/readme_header.png)

![Unit Tests badge](https://github.com/rogerpoliver/gympass-like-api/actions/workflows/unit-tests.yml/badge.svg)

[Kanban board](https://github.com/users/rogerpoliver/projects/1/views/1)

<details>
  <summary>Functional Requirements</summary>

- [x] Must be possible to register;
- [x] Must be possible to authenticate;
- [x] Must be possible to retrieve the profile of a logged-in user;
- [x] Must be possible to retrieve the number of check-ins performed by the logged-in user;
- [x] Must be possible for the user to retrieve their check-in history;
- [x] Must be possible for the user to search for nearby gyms (10km);
- [x] Must be possible for the user to search for gyms by name;
- [x] Must be possible for the user to check-in at a gym;
- [x] Must be possible to validate a user's check-in;
- [x] Must be possible to register a gym;

</details>

<details>
  <summary>Business Rules</summary>

- [x] user must not be able to register with a duplicate email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] The user cannot check-in if not close (100m) to the gym;
- [x] The check-in can only be validated up to 20 minutes after being created;
- [x] The check-in can only be validated by administrators;
- [x] The gym can only be registered by administrators;

</details>

<details>
  <summary>Non-functional Requirements</summary>

- [x] The user's password needs to be encrypted;
- [x] Application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);

</details>

## Running the API

```sh
npm ci
```

```sh
docker-compose up
```

```sh
npm run prisma:migrate-prod
```

```sh
npm start:dev
```
