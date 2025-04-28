import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(
    {
        path: './.env'
    }
);

const app = express();
app.use(express.json()) ;
// app.use(cors({
//     origin: ["https://eco-fusion.vercel.app" , "http://localhost:5173"], 
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
//     allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"], 
//     credentials: true
// }));

app.use(cors({
    origin: ["https://demo-cyan-one-26.vercel.app" , "http://localhost:5173"], 
 
    credentials: true
}));

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true, 
// }));


// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   }));

app.get('/', (req, res)=> {
    res.send('Server Is Now Ready Bro')
})

app.use("/api/auth", authRoutes);

export { app }