# CC-Repo  
## Prerequisite requirements  
- NodeJs 20  
- Firestore 
- Google Cloud Storage or any cloud storaging for images  

## How to Install  
- first clone this repository or download zip  
  
  ```bash
  git clone https://github.com/CP-Finance-Goals/CC-Repo.git
  cd CC-Repo-newchanges
- then install all the dependencies using  

  ```bash
  npm install
- setup environtment variables in .env  

  ```bash
  PORT=your_specified_port
  ACCESS_TOKEN_SECRET=your_jwt_access_secret_key
  PROJECT_ID=your_GC_Project_id_for_cloudsql_and_bucket
  BUCKET_NAME=your_image_bucket_name
- setup your key.json and storage_key.json for backend service
  Google Cloud requires a credential file in the form of api_key.json to access various services. Here are the steps to make it:
  - Go to Google Cloud Console then sign in with your account
  - Create new or use existing empty project
  - Go to IAM & Admin then select service account on the left menu
  - Create new service account with specified Storage Admin Roles
  - After you created it you will go back to previous page then click on the 3 dots on the right edge of your SA
  - Select manage keys
  - Create new keys and choose json
  - Then a key.json will downloaded into your device
  - rename it into storage_key.json and copy it into root of CC-Repo-newchanges folder

  - for key.json you need to setup your project earlier in firebase admin
  - go to firebase setting and go to menu service account
  - set to node js and download service account
  - rename it into key.json and copy it into root of CC-Repo-newchanges folder
- run project on local environment
  ```bash
  node server.js
  ```






  
