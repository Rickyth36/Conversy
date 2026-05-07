import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/conversy`);
  console.log("Connected DB:", mongoose.connection.name);        
        
    } catch (error) {
        console.log(error);
    }
}