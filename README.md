# TAMARA Backend
<p align="center">
  <img src="https://github.com/Tamara-Capstone/tamara-backend/assets/84588706/068f885f-20c7-4a5c-b661-ca93d51d3dd3"/>
</p>

## Overview

This repository contains backend application projects used in TAMARA mobile application (Android). There are several APIs that we build into multiple endpoints such as User Authentication (Login & Register), Plants Disease Prediction, Weather Prediction, and Track Productivity of user land.

We use JavaScript programming language with Node.js environment. For the framework, we use Express because this framework is used to design and build webservice applications (RESTful API) quickly and easily.

## Contributors

| Name                           | Bangkit ID  |
| ------------------------------ | ----------- |
| Ferdinan Imanuel Tumanggor     | C214DSX1933 |
| Margaretha Valencia Lumbanraja | C037DSY2610 |


## Requirements

- Code Editor ([Visual Studio Code] prefferable)
- [Node.js]
- [Postman]

## Project Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Tamara-Capstone/tamara-backend.git <project_name>
    ```

2. Open the project directory on terminal

    ```bash
    cd <project_name>
    ```

3. Setting up the environment variables. Create `.env` file and fill this to that file

    ```bash
    ACCESS_TOKEN_SECRET=
    MACHINE_LEARNING_URL=
    MONGODB_URL=
    FRUITS="cassava, chili, corn, guava, mango, potato, tea, tomato"

    # GCP
    GOOGLE_PROJECT_ID=
    STORAGE_BUCKET_NAME=
    ```

4. Install all required dependencies

    ```bash
    npm install
    ```

## Run The Application

Open Command Prompt/Powershell and type:

    ```bash
    cd <project_name>
    npm run start
    ```

## API Endpoints

- **[POST]** `/auth/register` : This endpoint allows the client to register to the application and save user data to MongoDB.
- **[POST]** `/auth/login` : This endpoint allows the client to log in and get the Bearer token response for the application.
- **[GET]** `/user` : This endpoint allows the client to get their details.
- **[GET]** `/weather?lat=<lat>&lon=<lon>` : This endpoint allows the client to get the current weather data.
- **[GET]** `/weather/detail?lat=<lat>&lon=<lon>` : This endpoint allows the client to get weather predictions
- **[POST]** `/predict` : This endpoint allows the client to get predictions of crop conditions
- **[GET]** `/predict` : This endpoint allows the client to get all the prediction data that has been done by the client
- **[POST]** `/analyze` : This endpoint allows the client to make an analysis of the production produced by their crops
- **[GET]** `/analyze` : This endpoint allows the client to get all their production analysis data in the application as tracking.

## Test The Application

1. Run the application (Check 'Run The Application' section)
2. Your application should be running on http://localhost:5000
3. Open POSTMAN
4. Set the method you want to test (Check 'API Endpoints' section), e.g GET
5. Set http://localhost:5000 as the base URL.
6. Add endpoint on the end of base URL, e.g http://localhost:5000/register
7. Filled out the body request
    ```bash
    {
      "fullname": "your_full_name"
      "email": "name@email.com",
      "password": "securePassword",
    }

    ```
8. Click Send
9. You should get a JSON response 
