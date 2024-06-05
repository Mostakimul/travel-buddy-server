## How to Run Locally

##### Backend API Link: https://travel-buddy-server-smoky.vercel.app/

##### Frontend Link:

##### Frontend Repo Link: https://github.com/Mostakimul/travel-budyy-client

### Clone the repository:

```
git clone https://github.com/Mostakimul/travel-buddy-server.git
```

### Install dependencies:

```
cd travel-buddy-server
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

## API Documentation

- https://documenter.getpostman.com/view/16306758/2sA3QzZU32
