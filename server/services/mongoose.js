import mongoose from "mongoose";

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('DB is connected'))
        .catch(e => console.log('DB connect error\n', e))
}

export default dbConnect