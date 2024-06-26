# App

GymPass style app.

## RFs (Functional Requirements)

- [x] Must be possible to register;
- [ ] Must be possible to authenticate;
- [ ] Must be possible to retrieve the profile of a logged-in user;
- [ ] Must be possible to retrieve the number of check-ins performed by the logged-in user;
- [ ] Must be possible for the user to retrieve their check-in history;
- [ ] Must be possible for the user to search for nearby gyms;
- [ ] Must be possible for the user to search for gyms by name;
- [ ] Must be possible for the user to check-in at a gym;
- [ ] Must be possible to validate a user's check-in;
- [ ] Must be possible to register a gym;

## RNs (Business Rules)

- [x] user must not be able to register with a duplicate email;
- [ ] The user cannot make 2 check-ins on the same day;
- [ ] The user cannot check-in if not close (100m) to the gym;
- [ ] The check-in can only be validated up to 20 minutes after being created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## RNFs (Non-functional Requirements)

- [x] The user's password needs to be encrypted;
- [x] Application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);
