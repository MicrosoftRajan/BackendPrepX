import express from "express"

const app = express()

const port = 3001;

// function CreatePosts(req, res) {
//     console.log("Post is called")
//     res.status(200).json({
//         message:"Response Send"
//     })
// }


function before(req, res, next){
    console.log("before fn() is called");
    console.log("req.body" , req.body);
    next();
}

function after(req, res){
    console.log("after fn() is called");
    console.log("req.body" , req.body);


    res.status(200).json({
        message:"request send",
        body: req.body
    })

}

app.post("/posts", before)
app.use(express.json()) // data ko body main add karta hai
app.post("/posts", after)



// app.post("/posts", CreatePosts);
// app.get("/posts", getAllReqHandler)
// app.get("/posts/:postId", getPostsById)
// app.patch("/posts", UpdatePosts)
// app.delete("/posts/:postId", DeletePosts)





app.listen(port, () => {
    console.log(`port is listing on ${port}`)
})