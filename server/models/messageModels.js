const mongoose =  require("mongoose")
const messageSchema = new mongoose.Schema(
    {
    message:{
        text:{
            type:String,
            require:true
        },
       
    },
    chatBtw:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true

    },
},{
    timestamps:true
}

   
    
)

module.exports = mongoose.model("messageCollection",messageSchema)