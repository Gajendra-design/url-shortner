import env from 'dotenv'

env.config();

export const config = {
    PORT: Number(process.env.PORT) ?? 8000,
    MONGO_URL:process.env.MONGO_URL
}