## How to Run Locally

##### Live Link: https://tr-buddy-mostakimuls-projects.vercel.app/

### Clone the repository:

```
git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-Mostakimul
```

### Install dependencies:

```
cd l2-b2-fullstack-track-assignment-8-Mostakimul
yarn install
```

### Set up environment variables:

Create a .env file in the root directory and add the following:

```
NODE_ENV="development"
PORT=8000
DATABASE_URL="postgresql://<postgres_user>:<postgres_password>@localhost:5432/<database_name>?schema=public"
JWT_PRIVATE_KEY="your_private_key"
JWT_EXPIRE_IN="30d"
JWT_REFRESH_PRIVATE_KEY="refresh_private_key"
JWT_REFRESH_EXPIRE_IN="30d"
```

### Run the server:

```
yarn dev
```

# Travel Buddy API

Travel buddy is web server api where you can add your trip and find a travel buddy who can join you!

## Technologies Used

- Prisma
- Node.js
- Express.js
- Postgres
- Typescript
- zod
- bcrypt (for password hashing)
- JSON Web Tokens (JWT) for authentication

## API Endpoints

### Authentication

- **Register User**

  - Method: POST
  - Path: `/api/register`

- **Login User**
  - Method: POST
  - Path: `/api/login`

### Trips

- **Create Trip**

  - Method: POST
  - Path: `/api/trips`

- **Get All Trips**
  - Method: GET
  - Path: `/api/trips`

### Travel Buddies

- **Request Travel Buddy for Trip**

  - Method: POST
  - Path: `/api/trip/:tripId/request`

- **Get Travel Buddy by ID**

  - Method: GET
  - Path: `/api/travel-buddies/:tripId`

- **Respond to Travel Buddy Request**
  - Method: PUT
  - Path: `/api/travel-buddies/:buddyId/respond`

### User Profile

- **Get User Profile**

  - Method: GET
  - Path: `/api/profile`

- **Update User Profile**
  - Method: PUT
  - Path: `/api/profile`
