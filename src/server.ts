import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { mainRoute } from './routes/main';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.urlencoded({extended:true}));

server.use(mainRoute);

server.get('/', (req, res)=>{
    res.send('Server running');
});

server.listen(3000, ()=>{
    console.log('http://localhost:3000');
});