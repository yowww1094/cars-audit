import mongoose from "mongoose";

const validateMongoDbId = (id) => {
    const validateId = mongoose.isValidObjectId(id);
    if (!validateId) {
        //throw new Error("Id is not valid or does not exist!");
        return ({ error: "Id is not valid or does not exist!"})
    }
};

export default validateMongoDbId;