import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("limit-key")
        if (!success) return res.status(429).json({ message: "Too Many Requests. Please try again later!!!" })
        next();
    } catch (error) {
        console.error("Rate Limit error: ", error)
        next(error);
    }
}

export default ratelimiter