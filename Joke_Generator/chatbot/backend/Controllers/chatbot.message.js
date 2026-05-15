import botModel from "../models/Bot.model.js";
import userModel from "../models/User.model.js";

export const Message  = async(req , res)=>{
  try{

    const text = req.body.text;
    console.log(text);
    

    if(!text?.trim()){
        return res.status(400).json({error: "you can't send empty message! bhaiya jiii"})
    }




const user =await userModel.create({
    sender:"user",
    text
})

//bot ko train krne ke liye data 





const botResponses = {

  "Hello": "Hi there! 👋 How are you doing today?",
 
}



const normalizedText = text.toLowerCase().trim()


const botResponse = botResponses[normalizedText] || "sorry i dont understand that bhaiya jii!!!";


const bot = await botModel.create({
    sender:"bot",
    text :botResponse

})
return res.status(200).json({
   userMessage:user.text,
   botMessage:bot.text ,

})
 
  }catch(error) {
 console.log("errro in message control",error);
 return res.status(500).json({error:"internal server error aa gaya bhaiya ji"})
 
  }
    
}