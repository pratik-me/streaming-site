import mongoose, {Schema, Schema, Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new Schema(
    {
        username : {
            type : String,
            required : [true, "Username is required"],
            unique : true,
            lowercase : true,
            trim : true,
            index : true,     // To make search in the document through this attribute easy but it cost memory
        },
        email : {
            type : String,
            required : [true, "E-mail is required"],
            unique : true,     // This can be false too if multiple user from same email is valid
            lowercase : true,
            trim : true,
        },
        fullname : {
            type : String,
            required : [true, "Name is required"],
            trim : true,
            index : true,
        },
        avatar : {
            type : String,    // Cloudinary URL
            required : true,
        },
        coverImage : {
            type : String,
        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video",
            }
        ],
        password : {
            type : String,
            required : [true, "Password is required"],
        },
        refreshToken : {
            type : String,
        }
    }, {
        timestamps : true, 
    }
)

// Encrypting the password before saving it.
userSchema.pre("save", async function (next) {            // Here can't use arrow function as arrow function doesn't have "this" keyword
    if(!this.isModified("password")) return next();       // "return next" will make sure that rest of this function doesn't run
    
    this.password = bcrypt.hash(this.password, 10);
    next();
})

// Double checking the password by making a user-defined method in the schema
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);        // This will compare and return boolean value
}

// Method for generating access token
userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Method for generating refresh token
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);