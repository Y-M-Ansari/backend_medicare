# Backend Service

This directory contains the backend portion of the MEDICARE application.

## Overview

The backend is built using Node.js and Express, with MongoDB as the database. It exposes RESTful APIs for managing doctors, appointments, and services.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables (create a `.env` file) with values for:
   - `MONGO_URI` – MongoDB connection string
   - `JWT_SECRET` – Secret for signing JSON Web Tokens
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – for image uploads

3. Start the server:
   ```bash
   npm run dev
   ```

## Project Structure

- `config/` – database configuration
- `controllers/` – request handlers
- `models/` – Mongoose schemas
- `routes/` – API route definitions
- `middlewares/` – custom middleware (authentication, file uploads)
- `utils/` – utility modules (e.g., Cloudinary config)

## Scripts

- `npm start` – start the server in production
- `npm run dev` – start the server with nodemon for development

## API Endpoints

Refer to the source code in `routes/` for available endpoints.

## License

Specify license information here.