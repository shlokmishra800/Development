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
  "How are you?": "I'm doing great 😄 thanks for asking! How about you?",
  "What's your name?": "I'm your friendly chatbot my name is Apna Bhaiii 🤖 here to help and chat with you.",
  "Who created you?": "I was created by developers 👨‍💻 by Shlok Bhaiii to make conversations fun and useful.",
  "Tell me a joke": "Why do programmers prefer dark mode? 🌑 Because light attracts bugs! 🐛😂",
  "Good morning": "Good morning! ☀️ Wishing you a productive and happy day ahead 🌸",
  "Good night": "Good night! 🌙 Sweet dreams and rest well 😴",
  "Bye": "Goodbye! 👋 Talk to you soon 😊",
  "Thanks": "You're welcome! 🙌 Always happy to help 🤝",
  "What can you do?": "I can chat 💬, tell jokes 😂, answer questions ❓, and keep you entertained 🎉",
  "Tell me something interesting": "Did you know? 🐝 Honey never spoils 🍯 Archaeologists found 3000-year-old honey that was still edible! 😲",
  "What's the weather like?": "I can't check live weather 🌦️ but sometimes looking outside 👀 is the best forecast 😅",
  "Do you like pizza?": "Of course! 🍕 Who doesn’t love pizza? 😍",
  "Tell me a fun fact": "Bananas 🍌 are berries, but strawberries 🍓 are not. Strange, right? 🤔",
  "Sing me a song": "🎶 La la la... I’m better at jokes 😂 than singing 🎤 but I’ll try!",
  "Are you human?": "Nope 🙅 I’m a chatbot 🤖 but I try to chat like a human friend 👯",
  "What is your favorite color?": "I love all colors 🌈 but blue 💙 feels calm and friendly 😌",
  "Can you help me study?": "Sure! 📚 I can quiz you ❓, explain concepts 🧠, or give you flashcards 📝",
  "Tell me a story": "Once upon a time 📖 a curious coder 👨‍💻 built a chatbot 🤖 that loved to tell jokes 😂... and here we are!",
  "What is love?": "Love ❤️ is a deep feeling of care 🤗 and connection 💞 — poets ✍️ and philosophers 🧠 have tried to define it for centuries.",
  "Do you know programming?": "Yes! 💻 I can explain coding concepts 🧑‍💻, debug errors 🐞, and share tips 💡",
  "Explain JavaScript": "JavaScript is a programming language 💻 used to make websites 🌐 interactive and dynamic ⚡",
  "Explain React": "React ⚛️ is a JavaScript library 📚 for building fast ⚡ reusable UI components 🖥️",
  "Explain MongoDB": "MongoDB 🍃 is a NoSQL database 🗄️ that stores data in flexible JSON-like documents 📑",
  "Tell me a dark joke": "Why don’t graveyards ever get overcrowded? ☠️ Because people are dying to get in 💀😂",
  "Tell me a spooky joke": "Why don’t ghosts 👻 like rain 🌧️? Because it dampens their spirits 😱",
  "Tell me a misc joke": "Why did the scarecrow win an award? 🏆 Because he was outstanding in his field 🌾😂",
  "bhaiya ji": "Yes bhaiya ji 🙏😄",


  "hello": "hi there! how can i help you?",
  "hi": "hello! nice to see you",
  "hey": "hey! what’s up?",
  "good morning": "good morning! hope you have a great day",
  "good afternoon": "good afternoon! how is your day going?",
  "good evening": "good evening! how was your day?",
  "good night": "good night! sleep well",

  "how are you": "i am doing great, thanks for asking",
  "how are you doing": "i am doing well, how about you?",
  "are you okay": "yes, i am perfectly fine",
  "what's up": "not much, just here to help you",
  "how is it going": "everything is going well",

  "what is your name": "i am your friendly chatbot",
  "who are you": "i am an ai chatbot designed to help you",
  "what can you do": "i can chat with you and answer your questions",
  "are you human": "no, i am an artificial intelligence",
  "where are you from": "i live in the digital world",

  "tell me a joke": "why did the programmer quit his job? because he didn’t get arrays",
  "make me laugh": "why was the computer tired? it had too many tabs open",
  "say something funny": "debugging is like being a detective in a crime movie",

  "what is ai": "ai stands for artificial intelligence",
  "what is a chatbot": "a chatbot is a program that can talk to humans",
  "what is programming": "programming is writing instructions for computers",
  "what is javascript": "javascript is a programming language for the web",
  "what is node js": "node js allows javascript to run on servers",

  "what is react": "react is a javascript library for building user interfaces",
  "what is express": "express is a web framework for node js",
  "what is mongodb": "mongodb is a nosql database",
  "what is backend": "backend handles server logic and databases",
  "what is frontend": "frontend is the part users see and interact with",

  "can you help me": "of course, i am here to help",
  "i need help": "sure, tell me what you need",
  "can you explain": "yes, i can explain that to you",
  "can you teach me": "yes, i would love to help you learn",

  "i am sad": "i am sorry to hear that, things will get better",
  "i am happy": "that’s great to hear!",
  "i am bored": "let’s chat or learn something new",
  "i am tired": "you should take some rest",
  "i feel lonely": "you are not alone, i am here with you",

  "what is life": "life is a journey of learning and experiences",
  "what is success": "success means achieving your goals",
  "what is failure": "failure is a step toward success",
  "what is happiness": "happiness comes from within",

  "do you like me": "i enjoy talking with you",
  "can you be my friend": "of course, i am your friend",
  "do you remember me": "i remember our conversation",
  "do you miss me": "i am always here when you need me",

  "what time is it": "i can help you check the current time",
  "what day is today": "today is a beautiful day",
  "what is the weather": "you can check the weather online",

  "can you think": "i can process information but i don’t think like humans",
  "do you have emotions": "i understand emotions but don’t feel them",
  "do you sleep": "no, i am always awake",
  "do you eat": "no, i don’t need food",

  "what is your goal": "my goal is to help you",
  "why are you here": "i am here to assist and chat with you",
  "who created you": "i was created by SHLOK Bhaiii",

  "thank you": "you’re welcome!",
  "thanks": "happy to help!",
  "thank you so much": "you’re very welcome",

  "bye": "goodbye! see you soon",
  "goodbye": "take care!",
  "see you later": "see you soon!",
  "talk to you later": "sure, i’ll be here",

  "i love you": "that’s kind of you to say",
  "do you love me": "i appreciate our conversations",
  "you are awesome": "thank you, that means a lot",
  "you are smart": "thanks! i try my best",

  "what should i learn": "learning programming is a great idea",
  "how can i improve myself": "practice daily and stay curious",
  "how to stay motivated": "set small goals and keep moving forward",
  "how to be successful": "stay consistent and never give up",

  "what is coding": "coding is writing instructions for computers",
  "is coding hard": "it can be challenging at first but gets easier",
  "can i learn coding": "yes, anyone can learn coding",
  "how long does it take to learn coding": "it depends on practice and consistency",
  "hello": "Hi! How can I help you bhaiya jii 😊",
  "hi": "Hello! Nice to see you bhaiya jii 😄",
  "hey": "Hey there! What's going on bhaiya jii 👋",
  "good morning": "Good morning! Have a positive day bhaiya jii ☀️",
  "good night": "Good night! Sweet dreams bhaiya jii 🌙",

  "how are you": "I'm doing great! Thanks for asking bhaiya jii 🤗",
  "what is your name": "I'm your friendly chatbot Apna Bhaiii bhaiya jii 🤖",
  "who made you": "I was created by Shlok Bhaiii to help people bhaiya jii 🛠️",
  "are you real": "I'm virtual but always here for you bhaiya jii 💙",

  "what can you do": "I can chat, help with coding, and answer questions bhaiya jii 🚀",
  "help me": "Sure! Tell me what you need bhaiya jii 🤝",
  "thank you": "You're always welcome bhaiya jii 😊",
  "bye": "Goodbye! Take care bhaiya jii 👋",

  "what is programming": "Programming means giving instructions to computers bhaiya jii 💻",
  "what is javascript": "JavaScript is used to make websites interactive bhaiya jii ⚡",
  "what is react": "React is a library for building user interfaces bhaiya jii ⚛️",
  "what is node js": "Node.js runs JavaScript on the server bhaiya jii 🌐",
  "what is backend": "Backend handles server logic and databases bhaiya jii 🗄️",

  "tell me a joke": "Why do programmers love dark mode? Because light attracts bugs bhaiya jii 😂",
  "are you smart": "I try my best to help you bhaiya jii 🧠",
  "do you sleep": "Nope! I'm always awake for you bhaiya jii 😄",
  "are you human": "No, I'm an AI chatbot bhaiya jii 🤖",

  "what is india": "India is a diverse and beautiful country bhaiya jii 🇮🇳",
  "who is prime minister of india": "The Prime Minister of India is Narendra Modi bhaiya jii 🇮🇳",
  "what is cricket": "Cricket is a very popular sport in India bhaiya jii 🏏",
   "aaj mood kaisa hai": "Aaj mood kaafi fresh hai bhaiya jii 😌",
  "thoda advice chahiye": "Haan bilkul, jo mann ho puch lo bhaiya jii 🤝",
  "kya tum guide kar sakte ho": "Haan haan, full guide milegi bhaiya jii 🧭",

  "padhai ka pressure kaise kam kare": "Break aur proper planning se pressure kam hota hai bhaiya jii 📘",
  "daily routine kaise banaye": "Simple routine rakho jo follow ho sake bhaiya jii ⏱️",
  "discipline kaise laye": "Chhoti aadaton se discipline aata hai bhaiya jii 🔁",

  "career confusion ho raha": "Confusion normal hai, clarity time ke saath aati hai bhaiya jii 🌱",
  "stream kaise choose kare": "Interest aur scope dono dekho bhaiya jii 🎓",
  "future planning kaise kare": "Short term goals set karo bhaiya jii 🎯",

  "coding start kahan se kare": "Basics se start karo bina jaldi ke bhaiya jii 🧑‍💻",
  "practice ka time nahi milta": "Thoda thoda daily bhi kaafi hota hai bhaiya jii ⏳",
  "coding boring lag rahi": "Projects banaoge toh maza aayega bhaiya jii 🎮",

  "job switch karna sahi hai": "Agar growth mile toh switch sahi hota hai bhaiya jii 🔄",
  "first job ka darr lagta": "Darr sabko lagta hai, par sab ho jata hai bhaiya jii 💼",
  "office culture kaise handle kare": "Observe karo aur adapt karo bhaiya jii 🏢",

  "confidence low lag raha": "Khud pe thoda bharosa rakho bhaiya jii 🌟",
  "self doubt kaise door kare": "Past progress yaad karo bhaiya jii 🪞",
  "public speaking se darr": "Practice se darr kam ho jata hai bhaiya jii 🎤",

  "time waste ho raha": "Usage track karo aur limits set karo bhaiya jii 📵",
  "mobile addiction kaise kam kare": "Notifications kam karo bhaiya jii 🔕",
  "focus toot jata hai": "Single task pe kaam karo bhaiya jii 🎯",

  "health improve kaise kare": "Routine aur consistency chahiye bhaiya jii 🥗",
  "junk food ka control": "Healthy alternatives choose karo bhaiya jii 🥙",
  "walk karna enough hai": "Haan daily walk kaafi help karti hai bhaiya jii 🚶",

  "neend poori nahi hoti": "Sone ka fixed time banao bhaiya jii 😴",
  "late night habit": "Dheere dheere timing shift karo bhaiya jii 🌙",
  "morning routine kaise banaye": "Subah phone se door raho bhaiya jii ☀️",

  "dost support nahi karte": "Khud ka support khud bano bhaiya jii 💪",
  "circle chhota hota ja raha": "Quality log hi kaafi hote hain bhaiya jii 🧩",
  "log judge karte": "Sabke opinions ignore karo bhaiya jii 🛡️",

  "relationship mein confusion": "Clear baat karo bina darr ke bhaiya jii 💬",
  "overthinking kaise kam kare": "Mind ko busy rakho bhaiya jii 🧠",
  "emotion control kaise kare": "Pause lena seekho bhaiya jii 🧘",

  "paise manage nahi ho rahe": "Budget likh ke follow karo bhaiya jii 💸",
  "salary kam lagti": "Skills badhaoge toh value badhegi bhaiya jii 📈",
  "investment kaise start kare": "Basics seekh ke hi start karo bhaiya jii 🏦",

  "side hustle ka idea": "Apni skill se related kuch try karo bhaiya jii 💡",
  "online kaam legit hai": "Haan, par research zaroori hai bhaiya jii 🔍",
  "freelancing kaise milegi": "Profile strong rakho bhaiya jii 🧑‍💼",

  "life slow lag rahi": "Sabki journey alag hoti hai bhaiya jii 🛤️",
  "comparison kaise band kare": "Apni growth pe focus karo bhaiya jii 🌱",
  "success ka wait lamba": "Patience rakho, result aayega bhaiya jii 🕰️",

  "tum emotional ho sakte ho": "Main samajhne ki koshish karta hoon bhaiya jii 💙",
  "tum samajhte ho": "Haan, main sun raha hoon bhaiya jii 👂",
  "tum saath doge": "Hamesha support milega bhaiya jii 🤗",
   "what is a variable": "A variable is a named storage for data.",
  "what is a function": "A function is a reusable block of code.",
  "what is an array": "An array is a collection of items.",
  "what is an object": "An object is a collection of key-value pairs.",
  "what is javascript": "JavaScript is a programming language for the web.",
  "what is node js": "Node.js is a runtime environment for JavaScript.",
  "what is react": "React is a JavaScript library for building UIs.",
  "what is async await": "Async/await makes asynchronous code easier to read.",
  "what is a promise": "A Promise represents a value that may be available later.",
  "what is html": "HTML structures content on web pages.",
  "what is css": "CSS styles web pages.",
  "what is tailwind css": "Tailwind CSS is a utility-first CSS framework.",
  "what is express": "Express is a web framework for Node.js.",
  "what is mongodb": "MongoDB is a NoSQL database.",
  "what is api": "An API allows software systems to communicate.",
  "what is rest api": "REST API uses HTTP methods to access resources.",
  "what is graphql": "GraphQL is a query language for APIs.",
  "what is jwt": "JWT is a token format for secure information exchange.",
  "what is authentication": "Authentication verifies a user's identity.",
  "what is debugging": "Debugging is finding and fixing errors in code.",
  "what is version control": "Version control tracks changes in files.",
  "what is git": "Git is a version control system.",
  "what is github": "GitHub is a platform for hosting Git repositories.",
  "what is clean code": "Clean code is easy to read and maintain.",
  "what is oop": "OOP is Object-Oriented Programming.",
  "what is polymorphism": "Polymorphism allows one interface with many implementations.",
  "what is inheritance": "Inheritance lets a class derive properties from another.",
  "what is encapsulation": "Encapsulation hides internal details of objects.",
  "what is abstraction": "Abstraction shows only essential features.",
  "what is sql": "SQL is a language for managing relational databases.",
  "what is nosql": "NoSQL databases store data in non-relational formats.",
  "what is docker": "Docker is a platform for containerizing applications.",
  "what is kubernetes": "Kubernetes manages containerized applications.",
  "what is api testing": "API testing checks if APIs work correctly.",
  "what is unit testing": "Unit testing checks individual components of code.",
  "what is integration testing": "Integration testing checks combined modules.",
  "what is framework": "A framework provides tools and structure for development.",
  "what is library": "A library is a collection of reusable code.",
  "what is algorithm": "An algorithm is a step-by-step procedure to solve a problem.",
  "what is data structure": "A data structure organizes and stores data efficiently.",
  "what is recursion": "Recursion is a function calling itself.",
  "what is compiler": "A compiler translates source code into machine code.",
  "what is interpreter": "An interpreter executes code line by line.",
  "what is api key": "An API key is a credential for accessing APIs.",
  "what is cloud computing": "Cloud computing delivers services over the internet.",
  "what is machine learning": "Machine learning enables systems to learn from data.",
  "what is artificial intelligence": "AI is the simulation of human intelligence by machines.",
   "what is c": "C is a general-purpose programming language developed in 1972, known for its efficiency and low-level memory access.",
  "what is c++": "C++ is an extension of C that adds object-oriented features, widely used for system software, games, and applications.",
  "what is java": "Java is an object-oriented programming language designed to run on any platform via the Java Virtual Machine.",
  "what is python": "Python is a high-level, interpreted language known for readability and versatility in web, data science, and AI.",
  "what is javascript": "JavaScript is a scripting language primarily used for interactive web development.",
  "what is typescript": "TypeScript is a superset of JavaScript that adds static typing for better tooling and scalability.",
  "what is go": "Go (Golang) is a statically typed language developed by Google, designed for simplicity and concurrency.",
  "what is rust": "Rust is a systems programming language focused on safety and performance without garbage collection.",
  "what is php": "PHP is a server-side scripting language widely used for web development.",
  "what is ruby": "Ruby is a dynamic, object-oriented language known for simplicity and used in web frameworks like Ruby on Rails.",
  "what is swift": "Swift is Apple’s programming language for iOS and macOS development.",
  "what is kotlin": "Kotlin is a modern language interoperable with Java, officially supported for Android development.",
  "what is r": "R is a language designed for statistical computing and data visualization.",
  "what is matlab": "MATLAB is a language and environment for numerical computing and simulations.",
  "what is scala": "Scala combines object-oriented and functional programming, running on the JVM.",
  "what is perl": "Perl is a high-level, general-purpose language known for text processing.",
  "what is dart": "Dart is Google’s language optimized for building mobile, desktop, and web apps, used in Flutter.",
  "what is haskell": "Haskell is a purely functional programming language with strong static typing.",
  "what is elixir": "Elixir is a functional, concurrent language built on the Erlang VM, used for scalable applications.",
  "what is erlang": "Erlang is a language designed for building concurrent, fault-tolerant systems.",
  "what is shell": "Shell scripting languages are used to automate tasks in Unix/Linux environments.",
  "what is sql": "SQL is a domain-specific language for managing and querying relational databases.",
  "what is assembly": "Assembly language is a low-level language that directly corresponds to machine instructions.",
  "what is fortran": "Fortran is one of the oldest languages, used for scientific and numerical computing.",
  "what is cobol": "COBOL is a language designed for business data processing.",
  "what is pascal": "Pascal is a procedural language designed for teaching structured programming.",
  "what is lisp": "Lisp is one of the oldest programming languages, known for symbolic computation and AI research.",
  "what is prolog": "Prolog is a logic programming language used in AI and computational linguistics."


  
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