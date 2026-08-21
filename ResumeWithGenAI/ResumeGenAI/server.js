require("dotenv").config()
const app = require("./src/app")
const connectTODB = require("./src/config/database")


const PORT = process.env.PORT || 3000


connectTODB()
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}` );
    
})