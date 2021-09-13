const express = require("express")
const mongoose = require("mongoose")

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/masai", {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    }

const app = express()
app.use(express.json())
    
const userSchema = new mongoose.Schema({
    student: { type: String, required: true },
    batch: { type: String, required: true },
    gender: { type: String, required: false, default: "Male" },
    course: { type: String, required: true },
    age: { type: String, required: true },
    instructure: { type: String, required: true }
    

    
    
}, {
    versionKey: false,
    timestamps: true
    
})

const User = mongoose.model("student", userSchema)

app.post("/students", async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).json({user})
})

//  Age greater than 18-----------------------------------------------------------------------
// app.get("/students", async (req, res) => {
//     const users = await User.find({ age: { $gt: 18 } }).lean().exec()
    
//     res.send(users)
// })






app.get("/students", async (req, res) => {
    const fullStack = await User.find({ course: "full stack" }).lean().exec()
    lengthf = Object.keys(fullStack).length
    const male = await User.find({gender:"male"}).lean().exec()
    lengthm = Object.keys(male).length
    const female = await User.find({gender:"female"}).lean().exec()
    length1f = Object.keys(female).length
    total = lengthm + length1f
    const ninja = await User.find({batch:"ninja"}).lean().exec()
    lengthn = Object.keys(ninja).length
    const androide = await User.find({batch:"androide"}).lean().exec()
    length1a = Object.keys(androide).length
    const samurai = await User.find({batch:"samurai"}).lean().exec()
    length1as = Object.keys(androide).length
    
    var arr1 = {
        Ninja: lengthn,
        Androide: length1a,
        Samurai:length1as
    }
    var name5;
    var temp5 = 0;
    for (key in arr1) {
        if (arr1[key] > temp5) {
            temp5 = arr1[key]
            name5 = key;
            }
        }
    const venu = await User.find({instructure:"venu"}).lean().exec()
    lengthv = Object.keys(venu).length
    const aman = await User.find({instructure:"aman"}).lean().exec()
    length1n = Object.keys(aman).length
    const dhaval = await User.find({instructure:"dhaval"}).lean().exec()
    length2d = Object.keys(aman).length
    
    var arr = {
        Venu: lengthv,
        Aman: length1n,
        Dhaval:length2d
    }
    var name;
    var temp = 0;
    for (key in arr) {
        if (arr[key] > temp) {
            temp = arr[key]
            name = key;
            }
        }
    res.status(201).json({
        no_of_students_apply_for_full_stack: lengthf,
         no_of_students_that_are_male: lengthm,
            no_of_student_that_are_female: length1f,
        total_no_of_student: total,
        Most_student_in_batch: name5,
              Teacher_currently_teaching_most_num_of_student:name
    })
})


  




app.listen(4567, async function () {
    await connect()
    console.log("listining to port 4567")
})

