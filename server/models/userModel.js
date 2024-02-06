import mongoose from "mongoose";
import bcrypt from "bcrypt"

const {Schema, model} = mongoose

const ROLES = ['user', 'seller', 'moderator', 'admin'];
const TYPE = ['individual', 'legal']

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    chats: [
        {
          type: Schema.Types.ObjectId,
          ref: 'chats',
        },
    ],
    role: {
        type: String,
        enum: ROLES,
        default: 'user' // или 'seller', в зависимости от вашего выбора
    },
    userType: {
        type: String,
        enum: TYPE,
        default: 'individual'
    }
}, { versionKey: false, timestamps: true });


userSchema.pre('save', function(next){
    if (!this.isModified('password')) return next()

    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

userSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.password)
}

export default model('users', userSchema)

