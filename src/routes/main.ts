import express from 'express';
import { createUser } from '../services/user';

export const mainRoute = express.Router();

mainRoute.get('/ping', (req, res)=>{
    res.json({pong: true});
});

mainRoute.post('/user', async (req, res)=>{
    const newUser = await createUser({
        name: `${req.body.name}`,
        email: `${req.body.email}`,
        Post: {
            create: {
                title: 'Default Title',
                body: 'Default Body'
            }
        }
    });
    if(newUser){
        res.status(201).json({newUser});
    } else {
        res.status(500).json({error: 'Something went wrong'})
    }
});