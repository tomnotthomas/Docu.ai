import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import router from './router.js';


const app = express()



//enable cors to send and receive things from frontend
app.use(cors())
//Use express body parser 
app.use(express.json())
//use routes 
app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/DocumentOCR')
  .then(() => {  
    console.log('Database Connected!'); 
    app.listen(8080, () => console.log('Node Api app is running on port 8080'));
  });
