import fs from "fs";

const content = fs.readFileSync("posts.json", "utf-8")
console.log(content)