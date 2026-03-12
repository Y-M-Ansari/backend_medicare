import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";

import { clerkMiddleware } from "@clerk/express";
import appointmentRouter from "./routes/appointmentRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import serviceRouter from "./routes/serviceRoutes.js";
import serviceAppointmentRouter from "./routes/serviceAppointmentRouter.js";

const app = express();
const port = process.env.PORT || 4000;


const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174", 
  "https://frontend-medicare-ym.vercel.app", 
  "https://admin-medicare-ym.vercel.app", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      
      if (!origin) return callback(null, true);

      const envOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : [];
      const allAllowed = [...allowedOrigins, ...envOrigins];

      if (allAllowed.includes(origin)) {
        return callback(null, true);
      }

      console.error(`CORS Blocked: ${origin} not in allowed origins`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // ✅ REQUIRED for cookies / Clerk
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // ensure common methods
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(clerkMiddleware());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Database Connection
connectDB();

// Static uploads folder

// Routes (unchanged)
app.use("/api/appointments", appointmentRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/services", serviceRouter);
app.use("/api/service-appointments", serviceAppointmentRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working ");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});