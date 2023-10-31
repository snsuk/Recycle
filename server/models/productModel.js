import mongoose from "mongoose"

const {Schema, model} = mongoose

const productSchema = new Schema ({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String
    },
    description: {
        type: String,
        trim: true,
        default: "No description provided"
    },
    inStock: {
        type: Boolean,
        default: true
    },
    comments: [String]
}, {timestamps: true, versionKey: false})

export default model('products', productSchema)