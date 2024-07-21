import mongoose from "mongoose"
const dbConnect = () => {
    try {
        const connection = mongoose.connect(process.env.MONGOCONNECTION);
        console.log("DB connection successful.")
    } catch (error) {
        console.log(error);
    }
}
export default dbConnect;