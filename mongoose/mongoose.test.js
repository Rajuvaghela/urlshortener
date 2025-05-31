import mongoose from 'mongoose';
import { type } from 'os';

//Step 1
try {
    await mongoose.connect('mongodb://127.0.0.1/mongoose_database');
    mongoose.set("debug", true);
} catch (error) {
    console.error(error);
    process.exit();
}

//Step 2 create schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, required: true , min:5},
    createdAt: { type: Date, default: Date.now() }
});

//step 3 creating model
const users = mongoose.model('user',userSchema);

await users.create({name:'raju',age:30,email:'raju@gmail.com'});

await mongoose.connection.close();