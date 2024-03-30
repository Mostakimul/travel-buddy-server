## How to Run Locally

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
