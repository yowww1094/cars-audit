import mongoose from "mongoose";

const URI = process.env.URI;

const dbConnection = mongoose.connect(URI) 
    .then(console.log('MongoDB connected successfully!'))
    .catch(error=>console.log('Error connecting to MongoDB', error));

export default dbConnection;