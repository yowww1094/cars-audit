import mongoose from "mongoose";

const validateMongoDbId = (id) => {
    const validateId = mongoose.Schema.ObjectId.isValid(id);
    if (!validateId) {
        throw new Error("Id is not valid or does not exist!");
    }
};

export default validateMongoDbId;