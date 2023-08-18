const messageModele = require("../models/messageModels")


module.exports.addMsg = async(req,res,next)=>{
try {
    const {from,to,message}= req.body
    const data =  await messageModele.create({
        message:{text:message},
        chatBtw:[from,to],
        sender:from,
    })
    if (data) {
        return res.json({msg:"add succesfully"})
        
    }else{
        return res.json({msg:"add failsx"})
    }
} catch (error) {
    next(error)
}
  
}

module.exports.showMsg= async (req,res,next)=>{


    try {
        const {from,to } = req.body
const chat = await messageModele.find({chatBtw:{
    $all: [from, to ]
}
 
}).sort({'updated_At':1}) ;
 
 const projectedMsg = chat.map((msg)=>{
        return{
            fromSelf: msg.sender.toString()===from,
            message: msg.message.text,
        }
        
        
    })

    res.json(projectedMsg)
    
    
    
    
    } catch (error) {
        next(error)
    }
}