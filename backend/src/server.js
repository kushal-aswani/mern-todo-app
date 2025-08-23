import express from "express"
import dotenv from "dotenv"
import NoteRoute from "./routes/NoteRoute.js"
import connectDb from "./config/db.js"
import ratelimiter from "./middleware/rateLimiter.js"
import cors from "cors"

dotenv.config()

const app = express()

const PORT = process.env.PORT

console.log(process.cwd())

console.log(process.env.PORT)

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(ratelimiter)

app.use("/api/notes", NoteRoute)

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("App listening on port: 5001")
    });
});

