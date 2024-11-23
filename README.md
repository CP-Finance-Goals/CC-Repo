# CC-Repo  
## Prerequisite requirements  
- NodeJs 20  
- Mysql v5.7 minimum database  
- Google Cloud Storage or any cloud storaging for images  

## How to Install  
- first clone this repository or download zip  
  
  ```bash
  git clone https://github.com/CP-Finance-Goals/CC-Repo.git
  cd CP-Finance-Goals
- then install all the dependencies using  

  ```bash
  npm install
- setup environtment variables in .env  

  ```bash
  DB_NAME=your_database_name
  DB_USER=your_database_user_connection
  DB_PASS=your_DB_USER_password
  DB_HOST=your_host
  DB_DIALECT=your_dialect
  PORT=your_specified_port
  ACCESS_TOKEN_SECRET=your_jwt_access_secret_key
  KEY_FILE=your_api_key.json_path
  PROJECT_ID=your_GC_Project_id_for_cloudsql_and_bucket
  BUCKET_NAME=your_image_bucket_name
- setup your api_key for backend service  
  Google Cloud Platform requires a credential file in the form of api_key.json to access various services. Here are the steps to make it:
  - Go to Google Cloud Console then sign in with your account
  - Create new or use existing empty project
  - Go to IAM & Admin then select service account on the left menu
  - Create new service account with specified Sql Admin and Storage Object Admin Roles
  - After you created it you will go back to previous page then click on the 3 dots on the right edge of your SA
  - Select manage keys
  - Create new keys and choose json
  - Then a key.json will downloaded into your device
  - rename it into api_key.json and copy it into CP-Finance-Goals folder
- run project on local environment
  ```bash
  npm run start:dev
  ```
  or
  ```bash
  node server.js
  ```






  
