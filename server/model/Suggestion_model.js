const mongoose =require('mongoose')


const suggestionSchema=new mongoose.Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String,
        },
        suggestion:{
            type:String,
        },
    }
)



module.exports=mongoose.model("suggestion",suggestionSchema)