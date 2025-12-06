import express from "express"
import cookieParser from "cookie-parser"
const app = express()
const port = 3001

app.use(cookieParser())

app.get("/", function (req, res) {

    res.cookie("prevpage", "homepage", {
        maxAge: 1000*60*60*24,
    })
    res.status(200).json({
        message:"received req from home page"
    })
})


app.get("/products", function (req,res){

    let messageStr = "";

    if(req.cookies && req.cookies.prevpage){
        messageStr = `User have already visited ${req.cookies.prevpage} before`
    } else{
        messageStr = "Np Previous page found"
    }

    res.status(200).json({
        message:messageStr
    })
})


app.get("/clearcookies", function(req,res){

    console.log("cookie get is called")
    res.clearCookie("prevpage", {path:"/"})


    res.status(200).json({
        message:"i have cleared cookies successful"
    })
})

app.listen(port, () => {
    console.log(`Server is listing on port ${port}`)
})