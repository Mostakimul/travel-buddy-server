import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_private_key: process.env.JWT_PRIVATE_KEY,
  jwt_expire_in: process.env.JWT_EXPIRE_IN,
  jwt_refresh_private_key: process.env.JWT_REFRESH_PRIVATE_KEY,
  jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  reset_secret: process.env.RESET_PASSWORD_TOKEN,
  reset_secret_expire_in: process.env.RESET_PASSWORD_TOKEN_EXPIRE_IN,
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  emailSender: {
    email: process.env.APP_EMAIL,
    password: process.env.APP_PASSWORD,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
