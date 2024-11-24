import mongoose, { Document, Schema } from "mongoose";

type user = {
    name: string;
    email: string;
    image: string;
    mobile: string | number;
    password: string;
    is_block: boolean;
    is_verified: string;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_block: {
        type: Boolean,
        required: true,
        default: false
    },
    is_verified: {
        type: String,
        default: 0
    }
})

export default mongoose.model<user & Document>("User", userSchema);