import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_secret_key: process.env.JWT_PRIVATE_KEY,
  jwt_expire_in: process.env.JWT_EXPIRE_IN,
  jwt_refresh_secret_key: process.env.JWT_REFRESH_PRIVATE_KEY,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
};
