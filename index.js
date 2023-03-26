const express = require("express")
const { connection } = require("./configs/db")
// const { authenticate } = require("./middleware/authenticate")
const { adminRouter } = require("./routes/admin.routes")
const { userRouter } = require("./routes/users.routes")
const { taskRouter } = require("./routes/tasks.routes")
const app = express()
app.use(express.json())

// app.use("/",(req,res)=>{
    //     res.send("hello welcome to  the app")
    // })
    app.use("/admin",adminRouter)
    app.use("/users",userRouter)
    // app.use(authenticate)
    app.use("/tasks",taskRouter)
    
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
   console.log(`app running at ${process.env.port}`);
})
