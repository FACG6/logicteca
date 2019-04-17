## Project Routes

### **Front-End Routes** :

| Route                        | Method | Description                  |
| ---------------------------- | ------ | ---------------------------- |
| /                            | GET    | view projects page           |
| /project/:projectId/:scrumId | GET    | view scrum page              |
| /members                     | GET    | view members page            |
| /projects/new                | GET    | view create new project page |

### **Back-End Routes** :

#### login Route | POST

- `/api/v1/login`, login route.

---

##### Accpetance Criteria :

- [ ] Validation of the request.
- [ ] Query to check the username.
- [ ] Testing.
  ***

##### Request Validation :

the body of the request must contain `username` property with username format and `password` property .

- [ ] request body must be in JSON format.
- [ ] JSON must contain properties called `username` and `password`.

##### The shape of the ideal request body :

```javascript
  { username: 'mohannadShurrab1' , password: 'Mohannad123' }
```

##### The query :

the query function must take an object that contains `username` property and then return a previously inserted row.
then we compare the password coming from the database with the password coming from the request.
example:

```javascript
const user = { username: 'mohannadShurrab1', password: 'Mohannad123' };
checkUser(user.username);
// [{ id: 1,
// username: 'mohannadShurrab1'
// full_name: 'mohannad shurrab' ,
// role : 'scrum master',
//password: 'pass$Mohannad123' }];
```

##### Testing :

The test function should include testing for the query and the route iteself :

- [ ] testing for route `/api/v1/login` | POST
- [ ] testing for `checkUser` query

---

##### Examples :

###### Sucessfull Path :

| client                                                                                 | server |
| -------------------------------------------------------------------------------------- | ------ |
| POST /api/v1/login body : `{ username: 'mohannadShurrab1' , password: 'Mohannad123' }` |
| { status_code : 200, msg : ' sucessfull '}                                             |

##### Error Path :

| client                                                                 | server                                      |
| ---------------------------------------------------------------------- | ------------------------------------------- |
| POST /login body : `{ username: 'mohannadShurrab1' , password: null }` |
|                                                                        | { status_code : 400, msg : ' Bad Request '} |

---

#### Members Route | GET

- `/api/v1/members`, route for update member information .

---

##### Accpetance Criteria :

- [ ] Validation of the request.
- [ ] Query to `getMembers`.
- [ ] Testing
  ***

##### The query :

the query function must return an array of objects contains `username`, `full_name`, `role`

##### Example :

```javascript

 getMembers();
 // result :
 // [{ username: 'mohannadShurrab1'
  // full_name: 'mohannad shurrab' ,
  // role : 'scrum master',
  // password: 'pass$Mohannad123' },
  // { username: 'angham11695'
  // full_name: 'angham aabed' ,
  // role : 'developer',
  // password: 'Angham1234567' }
  ];
```

#### Testing :

the testing should include testing for the query and the route iteself :

- [ ] testing for route `/api/v1/members/:memberId` | PUT
- [ ] testing for `getMembers` query

---

##### Examples :

###### Sucessfull Path :

output :
`data = { msg : 'Success', members: [{ username: 'mohannadShurrab1' full_name: 'mohannad shurrab' , role : 'scrum master', password: 'pass$Mohannad123' }, { username: 'angham11695' full_name: 'angham aabed' , role : 'developer', password: 'Angham1234567' }] }`

###### Error Path :

output :

````data = {
msg : 'Bad Request'
}

---

#### Members Route | POST

- `/api/v1/members/new`, route for update member information .

---

##### Accpetance Criteria :

- [ ] Validation of the request.
- [ ] Query to `addMember`.
- [ ] Testing
  ***

##### Request Validation :

the body of the request must contain a `username`, `full_name`, `password`, `role`

- [ ] request body must be in JSON format.
- [ ] JSON must contain properties .

| property  | constraints                                |
| --------- | ------------------------------------------ |
| username  | must be not null and unique                |
| full_name | must be not null                           |
| password  | must contain text with password formatting |
| role      | must contain enum                          |

##### The shape of the ideal request body :

```javascript
{ username: 'mohannadShurrab1'
  full_name: 'mohannad shurrab' ,
  role : 'scrum master',
  password: 'pass$Mohannad123' };
````

##### The query :

the query function must takes a object contains `username`, `full_name`, `role`, `password`

##### Example :

```javascript
const user = { username: 'mohannadShurrab1'
  full_name: 'mohannad shurrab' ,
  role : 'scrum master',
  password: 'pass$Mohannad123' };

 updateMember(user_id);
 // result :
 // [{ username: 'mohannadShurrab1'
  // full_name: 'mohannad shurrab' ,
  // role : 'scrum master',
  // password: 'pass$Mohannad123' }];
```

##### Testing :

the testing should include testing for the query and the route iteself :

- [ ] testing for route `/api/v1/members/new` | PUT
- [ ] testing for `addMember` query

---

##### Examples :

##### Sucessfull Path :

output :
`data = { msg : 'Success', member: { username: 'mohannadShurrab1' full_name: 'mohannad shurrab' , role : 'scrum master', password: 'pass$Mohannad123' } }`

###### Error Path :

output :
`data = { msg : 'Bad Request' }`

---

#### Members Route | PUT

- `/api/v1/members/:memberId`, route for update member information .

---

##### Accpetance Criteria :

- [ ] Validation of the request.
- [ ] Query to `updateMember`.
- [ ] Testing
  ***

##### Request Validation :

the body of the request must contain a `username`, `full_name`, `password`, `role`

- [ ] request body must be in JSON format.
- [ ] JSON must contain properties .

| property  | constraints                                |
| --------- | ------------------------------------------ |
| username  | must be not null and unique                |
| full_name | must be not null                           |
| password  | must contain text with password formatting |
| role      | must contain enum                          |

##### The shape of the ideal request body :

```javascript
{ username: 'mohannadShurrab1'
  full_name: 'mohannad shurrab' ,
  role : 'scrum master',
  password: 'pass$Mohannad124' };
```

##### The query :

the query function must takes a object contains `username`, `full_name`, `role`, `password`

##### Example :

```javascript
const user = { username: 'mohannadShurrab1'
  full_name: 'mohannad shurrab' ,
  role : 'scrum master',
  password: 'pass$Mohannad124' };

 updateMember(user_id);
 // result :
 // [{ username: 'mohannadShurrab1'
  // full_name: 'mohannad shurrab' ,
  // role : 'scrum master',
  // password: 'pass$Mohannad124' }];
```

##### Testing :

the testing should include testing for the query and the route iteself :

- [ ] testing for route `/api/v1/members/:memberId` | PUT
- [ ] testing for `updateMember` query

---

##### Examples :

###### Sucessfull Path :

output :
`data = { msg : 'Success', member: { username: 'mohannadShurrab1' full_name: 'mohannad shurrab' , role : 'scrum master', password: 'pass$Mohannad124' } }`

###### Error Path :

output :
`data = { msg : 'Bad Request' }`

#### Members Route | DELETE

- `/api/v1/members/:memberId`, route for update member information .

##### Accpetance Criteria :

- [ ] Validation of the request.
- [ ] Query to `deleteMember`.
- [ ] Testing
  ***

##### The shape of the ideal request body :

```javascript
{
  user_id: 1;
}
```

##### The query :

`deleteMember`

the query function must takes a object contains `user_id`

##### Examples :

###### Sucessfull Path :

output :
`data = { msg : 'Success', }`

###### Error Path :

output :

```data = {
msg : 'Bad Request'
}
```

### **Projects Route**

- `/api/v1/projects` get method

  - **Acceptance criteria**

    - [ ] Validation of the request.
    - [ ] Query to fetch data from database.
    - [ ] Testing.

    - **Query**
      The query function should return all projects as array of objects. [{...}, {...}, ...]

    - **Output**

      - Successful path

        **output**

        ```
        {
          error: null,
          data: [
            {...},
            {...},
            ...
          ]
        }
        ```

      - Error path
        ```
        {
          error: {
            code: 400,
            msg: 'bad request'
          },
          data: null
        }
        ```
