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

app.listen(3000, () => console.log('Node Api app is running on port 3000'));
