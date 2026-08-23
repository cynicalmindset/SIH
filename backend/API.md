# Backend API

Base URL:
http://localhost:3000

## Authentication

### POST /api/auth/register

Request:
{
  "name": "Yash",
  "email": "yash@test.com",
  "password": "123456"
}

Response:
{
  "message": "User created",
  "userId": "..."
}

---

### POST /api/auth/login

Request:
{
  "email": "yash@test.com",
  "password": "123456"
}

Response:
{
  "token": "JWT_TOKEN"
}

---

## Spills

### GET /api/spills

Headers:
Authorization: Bearer <token>

Response:
[
  {
    "id": "...",
    "latitude": 18.52,
    "longitude": 72.84,
    "status": "PENDING"
  }
]

### POST /api/spills

Headers:
Authorization: Bearer <token>

Request:
{
  "latitude": 18.52,
  "longitude": 72.84,
  "detectedAt": "2026-08-24T10:00:00Z",
  "imageUrl": "..."
}