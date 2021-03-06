const express = require("express");
const connectDB = require("./config/ConnectDB");
const User = require("./model/User");
const app = express();
const port = 4000
const connectDB = require("./config/ConnectDB");
const User = require("./model/User");


app.use(express.json());
//conx
connectDB();

//RETURN ALL USERS 

app.get('/', async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).send({msg : "All Persons are finded", Users })
    } catch (error) {

        res.status(200).send({msg : "All Persons are finded", error })
    }
})

//ADD A NEW USER TO THE DATABASE 
app.post("/", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            emal,
            phone,
            age,
        } = req.body;
        const newUser = new User({
            firstName,
            lastName,
            emal,
            phone,
            age,    
        }) ;
    await newUser.save();
    res.status(200).send({ msg: "New User is added", newUser });

    } catch (error) {

        res.status(200).send({ msg: "New User is added", error });
        
    }
})

//EDIT A USER BY ID 

app.put("/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        const updatUser = await User.findOneAndUpdate(
            { _id: Id },
            { ...req.body },
            { new: true }
        );
        res.status(200).send({ msg: "User is Update", updatUser });
    } catch (error) {
        res.status(500).send({ msg: "User is not Update", error });
    }
})

// REMOVE A USER BY ID 
app.delete("/:Id", async (req, res) => {
    try {
        const { Id } = req.params;
        const deletUser = await User.findOneAndDelete(Id);
        res.status(200).send({ msg: "User deleted", deletUser });
    } catch (error) {
        res.status(500).send({ msg: "User is not deleted", error });
    }
});


app.listen(port , error => 
    error ? console.log("can not run server !!!!")
     : console.log(`server is running on port ${port} ... `)
     )