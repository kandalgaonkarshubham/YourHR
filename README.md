
# Live Demo
Frontend: https://yourhrfrontend.vercel.app/ Backend: https://yourhrback-end.vercel.app/


## Features

- Frontend
    - **Home Page (/):** The landing page of the application.
    - **Jobs Page (/jobs):** Displays a list of jobs fetched from the backend, with the ability to filter jobs based on user profiles and other criteria.
    - **Profile Page (/profile):** Allows users to update their profile information, including adding a profile picture and uploading a resume.
- Backend
  - **/jobs:** Fetches jobs data.
  - **/skills:** Fetches skills data.
  - **/depts:** Fetches departments data.
  - **/register:** User registration.
  - **/login:** User authentication.
  - **/user:** Fetches or updates user details.
  - **/upload:** Handles file uploads for resumes and profile pictures.
- Database
    - **SQLite:** The project uses SQLite for its database, with the database file located at backend/prisma. Due to hosting limitations, the database is hosted on a free SQLite cloud service as Vercel does not support hosting SQLite files directly.


## How it works
  - **Authentication:** The app uses authentication to secure access to job listings and the user profile page. You must log in or register on the /auth route to access these features.
  - **Profile:** Update your profile on the /profile page to fetch jobs that match your skills and preferences.
  - **Job Filtering:** The /jobs page displays all jobs fetched from the database and allows filtering. On the first page load, jobs matching your profile will be shown if your profile fields are updated. Additionally, when viewing a job, indicators beside each field will show if your details match the job's requirements.
  - **Data Generation:** The job data is generated randomly using Faker.js, so the values may not be consistent or realistic.
  - **Pre-existing User :** For testing purposes, there is already a user available in the database: `EMAIL: shubham@gmail.com, PASS: sam`. Feel free to use this user for testing the application's features.
## TechStack
  - **Frontend:** React, Axios, Vercel for hosting
  - **Backend:** Node.js, Express, Prisma, Vercel for hosting
  - **Database:** I initially used SQLite Database, but at the time of deployment i found out that vercel doesnt support sqlite, so i had to migrate my entire db to mongo. As a result, the project now uses MongoDB, but the old SQLite database file remains in the prisma folder.
## Setup and Installation

git clone https://github.com/kandalgaonkarshubham/YourHR

In the root directory of folder run : `npm run initate`, this will install all dependancies for all folders, then run `npm run dev` in root directory to start both backend and frontend concurrenly.
```bash
npm run initate
npm run dev
```

## Usage/Examples

  - **Register/Login:** Visit the /auth route to register or log in.
  - **Update Profile:** Go to the /profile page to fill details such as your resume and profile picture.
  - **Browse Jobs:** Use the /jobs page to view and filter available job listings.


## Notes
- The data used in this project is randomly generated using Faker.js, so expect random and diverse values.
- Currently, the code to filter jobs use only two profile fields _(Job Type & Work Location)_ and rest is commented due to fetch jobs due to limited data in the backend.
