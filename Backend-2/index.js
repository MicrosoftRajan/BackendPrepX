import express from "express";
import fs from "fs";
const app = express();
const port = 3001;

console.log("Before");

let content = fs.readFileSync("product.json", "utf8");
let jsonCall = JSON.parse(content);

function getHandler(req, res) {
    try{
  console.log("Req Received");
  res.status(200).json(jsonCall);
    }catch(err){
        res.status(500).json({
            message:"internal Sever Error"
        });
    }
}
function getPostById(req, res) {
  res.set("Cache-Control", "no-store"); 

  const postId = parseInt(req.params.postId, 10);
  console.log("postid : ", postId);

  const postArr = jsonCall; // array

  for (let i = 0; i < postArr.length; i++) {
    if (postArr[i].id == postId) {
      return res.status(200).json({
        post: postArr[i],
      });
    }
  }

  // only reached if no post matched
  return res.status(404).json({
    post: "page not found",
  });
}

function CreatePost(req, res){
    try {
        console.log("req Body", req.body);

        const postArr = jsonCall
        postArr.push(req.body);
        res.status(201).json({
            // body:req.body,
            message: "post created"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server error"
        })
        
    }
}



app.use(express.json())

app.post("/posts", CreatePost);
// All data are get
app.get("/posts", getHandler);

app.get("/posts/:postId", getPostById);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log("After");
