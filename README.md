Live Demo
Frontend: https://yourhrfrontend.vercel.app/
Backend: https://yourhrback-end.vercel.app/

Features

Frontend
Home Page (/): The landing page of the application.
Jobs Page (/jobs): Displays a list of jobs fetched from the backend, with the ability to filter jobs based on user profiles and other criteria.
Profile Page (/profile): Allows users to update their profile information, including adding a profile picture and uploading a resume.

Backend
The backend provides the following routes:
/jobs: Fetches jobs data.
/skills: Fetches skills data.
/depts: Fetches departments data.
/register: User registration.
/login: User authentication.
/user: Fetches or updates user details.
/upload: Handles file uploads for resumes and profile pictures.

Database
SQLite: The project uses SQLite for its database, with the database file located at backend/prisma.
Due to hosting limitations, the database is hosted on a free SQLite cloud service as Vercel does not support hosting SQLite files directly.

How It Works
Authentication: The app uses authentication to secure access to job listings and the user profile page. You must log in or register on the /auth route to access these features.
Profile: Update your profile on the /profile page to fetch jobs that match your skills and preferences.
Job Filtering: The /jobs page displays all jobs fetched from the database and allows filtering. On the first page load, jobs matching your profile will be shown if your profile fields are updated. Additionally, when viewing a job, indicators beside each field will show if your details match the job's requirements.
Data Generation: The job data is generated randomly using Faker.js, so the values may not be consistent or realistic.
Pre-existing User :
For testing purposes, there is already a user available in the database:
Email: shubham@gmail.com
Password: sam
Feel free to use this user for testing the application's features.

Tech Stack
Frontend: React, Axios, Vercel for hosting
Backend: Node.js, Express, Prisma, Vercel for hosting
Database: SQLite (hosted on a free SQLite cloud service)

Setup and Installation

git clone https://github.com/kandalgaonkarshubham/YourHR

In the root directory of folder run : `npm run initate`, this will install all dependancies for all folders, then run `npm run dev` in root directory to start both backend and frontend concurrenly.


Usage
Register/Login: Visit the /auth route to register or log in.
Update Profile: Go to the /profile page to fill details such as your resume and profile picture.
Browse Jobs: Use the /jobs page to view and filter available job listings.

Notes
The data used in this project is randomly generated using Faker.js, so expect random and diverse values.
Currently, only two profile fields are used to fetch jobs due to limited data in the backend.
