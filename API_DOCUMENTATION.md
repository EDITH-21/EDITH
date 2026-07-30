# EDITH – REST API Documentation

Base URL: `/api/v1`

---

## Authentication Endpoints

### 1. Register User
- **POST** `/auth/register`
- **Body**: `{ "name": "Shivam", "email": "shivam@edith.ai", "password": "password123" }`
- **Response**: `201 Created` with JWT token and user profile object.

### 2. Login User
- **POST** `/auth/login`
- **Body**: `{ "email": "shivam@edith.ai", "password": "password123" }`
- **Response**: `200 OK` with HTTP-only cookies and token.

### 3. Get Current User
- **GET** `/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with user details.

---

## Tasks Endpoints

### 1. Get All Tasks
- **GET** `/tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with array of tasks.

### 2. Create Task
- **POST** `/tasks`
- **Body**: `{ "title": "Design homepage", "status": "To Do", "priority": "High", "category": "Design" }`
- **Response**: `201 Created`.

### 3. Update Task
- **PUT** `/tasks/:id`
- **Body**: `{ "status": "In Progress", "progress": 60 }`
- **Response**: `200 OK`.

### 4. Delete Task
- **DELETE** `/tasks/:id`
- **Response**: `200 OK`.

---

## Expenses Endpoints

### 1. Get Expenses & Budget Summary
- **GET** `/expenses`
- **Response**: `200 OK` with expense list and total budget.

### 2. Add Expense
- **POST** `/expenses`
- **Body**: `{ "title": "Zomato", "amount": 650, "type": "Expense", "category": "Food & Dining", "paymentMethod": "UPI" }`
- **Response**: `201 Created`.
