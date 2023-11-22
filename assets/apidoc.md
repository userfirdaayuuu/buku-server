# Server Book

List of available endpoints:

CRUD Books
- `POST /books`
- `GET /books`
- `GET /books/:bookId`
- `PATCH /books/:bookId`
- `DELETE /books/:bookId`

CRUD Review
- `POST /books/:bookId/reviews`
- `DELETE /books/:bookId/reviews/:reviewId`

CRUD User
-  `POST /register`
-  `POST /login`
-  `GET /me`

### POST /books
Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```

- body:

```json
{
    "title": "AlphaGirls",
    "description": "girlslalala",
    "genre": "novel",
    "userId": "3",
    "author": "elisabeta"
}
```
Response:

Success
- status: 201
- body:

```json
{
    "message": "Book created successfully",
    "data": {
        "id": 3,
        "title": "AlphaGirls",
        "description": "girlslalala",
        "genre": "novel",
        "userId": 2,
        "author": "elisabeta",
        "updatedAt": "2023-11-22T16:25:28.019Z",
        "createdAt": "2023-11-22T16:25:28.019Z"
    }
}
```
Forbidden
- status: 403
- body:

```json
{
    "errors": {
        "message": "Forbidden"
    }
}
```

### GET /books/:id

Request:

- param:

```json
{
  "id": 3
}
```

Response:

- status: 200
- body:

```json
{
    "id": 3,
    "title": "AlphaGirls",
    "description": "girlslalala",
    "genre": "novel",
    "userId": 2,
    "author": "elisabeta",
    "createdAt": "2023-11-22T16:25:28.000Z",
    "updatedAt": "2023-11-22T16:25:28.000Z",
    "reviews": []
}
```

### GET /books

Response:

- status: 200
- body:

```json
[
    {
        "id": 3,
        "title": "AlphaGirls",
        "description": "girlslalala",
        "genre": "novel",
        "userId": 2,
        "author": "elisabeta",
        "createdAt": "2023-11-22T16:25:28.000Z",
        "updatedAt": "2023-11-22T16:25:28.000Z",
        "reviews": []
    }
]
```

### DELETE /books/:bookId

Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```

- param:

```json
{
  "id": 3
}
```

- body:
  none

Response:

- status: 200
- body:

```json
{
    "message": "Book deleted successfully"
}
```

Forbidden
- status: 403
- body:

```json
{
    "errors": {
        "message": "Forbidden"
    }
}
```

## Review

### POST /books/:bookId/reviews
Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```


- body:

```json
{
   "body": "MANTEPPPP",
   "userId": 1,
   "bookId": 3
}
```

Response:

- status: 201
- body:

```json
{
    "message": "Review created successfully",
    "data": {
        "id": 1,
        "body": "MANTEPPPP",
        "userId": 1,
        "bookId": "3",
        "updatedAt": "2023-11-22T16:52:47.228Z",
        "createdAt": "2023-11-22T16:52:47.228Z"
    }
}
```

Forbidden
- status: 403
- body:

```json
{
    "errors": {
        "message": "Forbidden"
    }
}
```

### DELETE /books/:bookId/reviews/:reviewId

description:
delete single review
when deleting review that is used in at least one movies, the on delete association should also delete the one to many relationship

Request:

- headers:

```json
{
  "authorization" : "Bearer TokenFromJWT"
}
```

- param:

```json
{
        "userId": 1,
        "bookId": 3
}
```

- body:
  none

Response:

- status: 200
- body:

```json
{
    "message": "Review deleted"
}
```

## User
### POST /register (admin)

Request:

- body:

```json
{
    "name": "Lalali",
    "email": "vocasia@email.com",
    "password" : "12345678",
    "isAdmin": true
}
```

Response:

Success
- status: 201
- body:

```json
{
    "message": "Register success",
    "data": {
        "id": 4,
        "name": "Lalali",
        "email": "vocasia@email.com"
    }
}
```

### POST /register (non-admin)

Request:

- body:

```json
{
    "name": "Abelvani",
    "email": "abelva@email.com",
    "password" : "123yutr78"
}
```

Response:

Success
- status: 201
- body:

```json
{
    "message": "Register success",
    "data": {
        "id": 5,
        "name": "Abelvani",
        "email": "abelva@email.com"
    }
}
```


### POST /login

description:
Login user 

Request:


- body:

```json
{
  "email": "vocasia@email.com",
  "password" : "12345678"
}
```

Response:

Success
- status: 200
- body:

```json
{
    "message": "Login success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzAwNjcyOTU5LCJleHAiOjE3MDA3NTkzNTl9.2jhpSit0a3U_vwLKZFXcbLByuSYe2WAlCntuZtQNo6Y"
    }
}
```
