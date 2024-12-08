# Brofin Backend

this repository contains router and logic handler code of authentication and database operations in Brofin app

## Table of Contents

- [Introduction](#introduction)
- [Endpoints](#endpoints)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

---

### Introduction

This backend created using express js as server framework, jsonwebtoken as authenticate module, firestore as database, and cloud storage for storing user image.

---

### Endpoints

- hostname/api/auth/register  
  POST method for creating new user authentication data on database  
  required input field:
  - name
  - email
  - password
- hostname/api/auth/login  
  POST method for verifying user authentication data from database  
  required input field:
  - email
  - password
- hostname/api/user/details  
  PUT method for editing user details  
  required input field:
  - name
  - dob (date of birth)
  - savings
  - photoUrl
- hostname/api/user/balances  
  POST and PUT method for create new balance and edit balances information  
  required input field:
  - monthAndYear
  - balance
  - currentBalance
- hostname/api/user/budgetings  
  POST and PUT method for create new budgeting and edit budgetings information  
  required input field:
  - monthAndYear
  - total
  - essentialNeedsLimit
  - wantsLimit
  - savingsLimit
  - isReminder
- hostname/api/user/diaries  
  POST method for creating new diary of transaction  
  required input field:
  - monthAndYear
  - date
  - photoUrl
  - description
  - amount
  - categoryId
- hostname/api/user/getAll
  GET method for get all of user Informations such as details, balaces, diaries, budgetings.

---

### Requirements

- Nodejs20 or above
- Firebase firestore service account
- Cloud storage service account
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
