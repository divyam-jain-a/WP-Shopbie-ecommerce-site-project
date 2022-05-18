const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/registration-form-shopbie", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true
}).then(()=> {
    console.log("Connected to database");
}).catch((e)=>{
    console.log(e);
})