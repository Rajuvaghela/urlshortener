import mongoose from 'mongoose';

//Step 1
try {
    await mongoose.connect('mongodb://127.0.0.1/mongoose_middleware');
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
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

userSchema.pre(['updateOne','updateMany','findOneAndUpdate'], function(next) {
    this.set({updatedAt:Date.now()});
    next();
});

const users = mongoose.model('user',userSchema);

//await users.create({name:'raju',age:30,email:'raju@gmail.com'});

await users.updateOne({email:'raju@gmail.com'},{$set: {age:28}})

await mongoose.connection.close();

