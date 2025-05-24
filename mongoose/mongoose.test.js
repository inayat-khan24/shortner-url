import mongoose, { mongo } from "mongoose";


// step 1: now we are creating connection with mangoose
try {
    // syntx (mangdbURL/databasename)
    await mongoose.connect("mongodb://localhost:27017/mongoose_database");

    // if we will give debug true then mangodb give us error reason.
    mongoose.set("debug",true);

} catch (error) {
    console.error(error)
    // process exit mean if error will come then run way there
    process.exit()
}

// step 2 : create schema
const userSchema = mongoose.Schema({
    // and we should type first latter in chapital 
name:{type: String,required:true},
email:{type: String, required: true, unique:true},
age : {type:Number,required:true , min:5},
createdAt : {type:Date, default: Date.now() }
})

// step 3 : creating a model
// we show pass two parameter in model (this is collection name,ourSchema)
const Users =  mongoose.model("user",userSchema)

await Users.create({name:"roman",age:26,email:"romanrg@gmail.com"})

// for closing method
await mongoose.connection.close()