import mongoose from "mongoose";

// now we are creating connection with mangoose
try {
    // syntx (mangdbURL/databasename)
    await mongoose.connect("mongodb://localhost:27017/mongoose_database")

} catch (error) {
    console.error(error)
    // process exit mean if error will come then run way there
    process.exit()
}