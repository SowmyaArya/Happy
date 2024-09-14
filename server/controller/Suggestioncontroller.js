const suggestionSchema=require('../model/Suggestion_model');


const Suggadd = async(req,res)=>{
    try{
        console.log(req.body);
        const {name,email,suggestion}=req.body;

        const sugdata=new suggestionSchema({name,email,suggestion})
        const sugdatasave=await sugdata.save();
        res.send(sugdatasave);

    }catch(error){
        console.log(error.message);
        res.status(500).send("error");
    }
}

const Getsug=async(req,res)=>{
    try{
        const suggestion=await suggestionSchema.find();
        res.send(suggestion);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Issue");
    }
}






module.exports= {Suggadd,Getsug};


