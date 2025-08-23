import mongoose from "mongoose"

const connectDb = async () => {

    const mongodb_uri = process.env.MONGODB_URI

    // console.log(mongodb_uri)

    try {
        await mongoose.connect(mongodb_uri)
        console.log("MongoDB connected successfully!")
    } catch (error) {
        console.error("Error connecting Mongo DB: ", error)
        process.exit(1)
    }
}

export default connectDb