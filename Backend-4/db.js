import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();


const port = 3001;
const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.qbi2ag4.mongodb.net/?appName=Cluster0`;

mongoose
  .connect(db)
  .then(function () {
    console.log("db is connected");
  })
  .catch((err) => console.log("Error in code", err));

// Create User

const UserRules= {
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    length: 10,
  },
  confirm: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  role: {
    type:String,
    enum:["user", "user2", "user3"],
  },
};

const UserSchema = new mongoose.Schema(UserRules);

const UserModel = mongoose.model("User", UserSchema);

app.use(express.json())


app.post("/user", async (req, res) => {
    try{
        const UserObject = req.body;

        const user = await UserModel.create(UserObject);

        res.status(201).json(user);

    }catch(err){
        res.status(200).json({
            message:"internal Server error",
            error:err
        })
    }
})

app.listen(port, () => {
    console.log(`port is listing on ${port}`);
})



