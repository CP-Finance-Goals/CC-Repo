# Brofin Backend

This repository contains router and logic handler code of authentication and database operations in Brofin app

## Table of Contents

- [Introduction](#introduction)
- [Endpoints](#endpoints)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contact](#contact)

---

### Introduction

This backend created using express js as server framework, jsonwebtoken as authenticate module, firestore as database, and cloud storage for storing user image.

---

### Endpoints
Deployed link : https://be-brofin.et.r.appspot.com/

- `/api/auth/register`  
  Creating new user authentication data on database  
  Method : POST  
  Input :

  ```bash
      {
        "name" : "string",
        "email" : "string",
        "password" : "string"
      }
  ```

- `/api/auth/login  `  
  Verifying user auth attempt from database user and generate jwt token  
  Method: POST  
  Input:

  ```bash
      {
        "email" : "string",
        "password" : "string"
      }
  ```

- `/api/user/details`  
  Editing user details  
  Method : PUT  
  Authorization : Token  
  Input :

  ```bash
      {
        "name" : "string",
        "dob" : "string",
        "savings": "integer",
        "image" : file
      }
  ```

- `/api/user/balances  `
  Create new balance and edit balances information  
  Method : POST (create), PUT (edit)  
  Authorization : Token  
  Input :

  ```bash
      {
        "monthAndYear" : "long or string",
        "balance" : "integer",
        "currentBalance": "integer",
      }
  ```

- `/api/user/budgetings`  
  Create new budgeting and edit budgetings information  
  Method : POST (create), PUT (edit)  
  Authorization : Token  
  Input :

  ```bash
      {
        "monthAndYear" : "long or string",
        "total" : "integer",
        "essentialNeedsLimit": "integer",
        "wantsLimit": "integer",
        "savingsLimit": "integer",
        "isReminder": "boolean",
      }
  ```

- `/api/user/diaries`  
  Creating new diary of transaction  
  Method : POST  
  Authorization : Token  
  Input :

  ```bash
      {
        "monthAndYear" : "long or string",
        "date" : "string",
        "image": file,
        "description": "text",
        "amount": "integer",
        "categoryId": "integer",
      }
  ```

- `/api/user/expenses`  
  Add new expenses (budgeting, balance, user details) and edit expenses (budgeting, balance, diary) information  
  Method : POST (add), PUT (edit)  
  Authorization : Token  
  POST Input :

  ```bash
      {
        "monthAndYear" : "long or string",
        "total" : "integer",
        "essentialNeedsLimit": "integer",
        "wantsLimit": "integer",
        "savingsLimit": "integer",
        "isReminder": "boolean",
        "balance" : "integer",
        "currentBalance": "integer",
        "name" : "string",
        "dob" : "string",
        "savings": "integer",
        "image" : file
      }
  ```

  PUT Input :

  ```bash
      {
        "monthAndYear" : "long or string",
        "total" : "integer",
        "essentialNeedsLimit": "integer",
        "wantsLimit": "integer",
        "savingsLimit": "integer",
        "isReminder": "boolean",
        "balance" : "integer",
        "currentBalance": "integer",
        "date" : "string",
        "image": file,
        "description": "text",
        "amount": "integer",
        "categoryId": "integer",
      }
  ```

- `/api/user/getAll`  
  Get all of user Informations such as details, balaces, diaries, budgetings  
  Method : GET  
  Authorization : Token  

---

### Requirements

- Nodejs20 or above
- Firebase firestore service account as key.json
- Cloud storage service account as storage_key.json
- Dependencies:
  - @google-cloud/storage
  - bcryptjs
  - cookie-parser
  - cors
  - dotenv
  - express
  - firebase-admin
  - jsonwebtoken
  - moment
  - multer

---

### Installation

1. Clone this repository:

```bash
   git clone https://github.com/CP-Finance-Goals/CC-Repo.git
   cd CC-Repo
```

2. Install the dependencies:

```bash
   npm install
```

---

### Usage

- Navigate to the correct directory:
  ```bash
  cd CC-Repo
  ```
- Run the application:
  ```bash
  node server.js
  ```

---

### Deployment

We recommend using Google App Engine as the deployment platform. Follow these steps:

#### 1. Enable Required APIs

Enable the following APIs in your Google Cloud project:

- App Engine Admin API

#### 2. Setup Code

- Navigate to the correct directory:
  ```bash
  cd CC-Repo
  ```
- Ensure you have .env contain this:
  ```bash
  PORT=8080
  SECRET_KEY=your_secret
  PROJECT_ID=your_gcp_project_id
  BUCKET_NAME=your_bucket_name
  ```
- Build your App Engine Instance:
  ```bash
  gcloud app create --region=your_specified_region
  ```
- Ensure you have app.yaml like this:

  ```bash
  runtime: nodejs20
  env: standard

  handlers:
    - url: /.*
      script: auto

  ```

- Optional: you could add this autoscale rules:
  ```bash
  automatic_scaling:
  target_cpu_utilization: your_target
  max_instances: your_specified
  ```

#### 3. Deploy to App Engine

Deploy the Code from GCP console using the following command:

```bash
gcloud app deploy
```

---

### Contact

Contact us if you need help or feedback at [Dev's Email](mukhgia12@gmail.com)
