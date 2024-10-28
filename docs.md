# Auth System

- Application auth system logic

## Structure directors and files

## Libs and Frameworks

`"dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^5.0.1",
    "express-rate-limit": "^7.4.1",
    "helmet": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.7.2",
    "nodemailer": "^6.9.15",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^22.7.9",
    "@types/nodemailer": "^6.4.16",
    "@types/passport-google-oauth20": "^2.0.16",
    "nodemon": "^3.1.7",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }`

## Step one `DONE`

- Create logic
  | Login `request body: email and password response: token`
  | register `request body: email and password, response: message success`

## Step tow

### Use Nodemailer

- Logic verify email `DONE`
- Logic register by gmail account
- Logic edit or forget password

### Replace nodemaile with sendgrid

- Logic verify email
- Logic register by gmail account
- Logic edit or forget password

## Step three

- Use swagger to generate API documentation `DONE`
  - `npm install swagger-ui-express swagger-jsdoc`
  - `npm i --save-dev @types/swagger-ui-express`
- Use Docker

## Routes auth

- Start point `/api/v1/auth`
- `POST /login` `DONE`
- `POST /register` `DONE`
- `GET /verify-mail` `DONE`

- `POST /register/google`
- `POST /forget-password`
