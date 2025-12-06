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
    require: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  confirm: {
    type: String,
    required: true,
    minLength:7,
    validate: [ function (){
      return this.password == this.confirm
    }, "password should be equal to confirm password"]
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

// Hooks
UserSchema.pre("save", function(){
  console.log("pre hook is called");
  this.confirm = undefined
})

UserSchema.set("toJSON", {
  transform: function(doc, req){
    console.log("Set is called")
    delete req._id;
  }
})

const UserModel = mongoose.model("User", UserSchema);


const CreateUser = async function(req, res) {

  try {
    const UserObj =  req.body;
    const user = await UserModel.create(UserObj);
    res.status(201).json(user);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal Server Error",
      error: error
    })
  }
}


const getAllUsers = async function(req, res) {
  try {

    const user = await UserModel.find() 

    if(user.length != 0){
      res.status(200).json({
        message:user
      })
    } else{
      res.status(404).json({
        message : "did not find any user"
      })
    }
  } catch (error) {
    res.status(500).json({
      status:"Internal Server Error",
      message: error.message
    })
    
  }
}

const getUser = async function(req, res) {
    try {
    const id = req.params.id.trim()
    const user = await UserModel.findById(id)

    if(user){
      res.status(200).json({
        message:user
      })
    } else{
      res.status(404).json({
        message:"did not find any user id"

      })
    }
  } catch (error) {
    res.status(500).json({
      message:"internal Server Error",
      error: error.message

    })
  }
}

const DeleteUser = async function(req, res) {
  try {
    let {id} = req.params
    id = id.trim();
    const user = await UserModel.findByIdAndDelete(id)

    if(!user){
      return res.status(404).json({
        message:"did not find user id"
      })
    } else{
      return res.status(200).json({
        status:"success",
        message:"user found and deleted",
        user

      })
    }
  } catch (error) {
    return res.status(500).json({
      message:"internal Server Error",
      error: error.message

    })
  }
}

app.use(express.json())

app.post("/user", CreateUser)
app.get("/user", getAllUsers)
app.get("/user/:id",getUser)
app.delete("/user/:id",DeleteUser)


// app.post("/user", async (req, res) => {
//     try{
//         const UserObject = req.body;

//         const user = await UserModel.create(UserObject);

//         res.status(201).json(user);

//     }catch(err){
//         res.status(200).json({
//             message:"internal Server error",
//             error:err
//         })
//     }
// })

app.listen(port, () => {
    console.log(`port is listing on ${port}`);
})



