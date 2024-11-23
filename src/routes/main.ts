import express from 'express';
import { createUser, createUsers, getAllUsers } from '../services/user';

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

mainRoute.post('/users', async (req, res)=>{
    const newUsers = await createUsers([
        {name: 'tester2', email: 'tester2@test.com'},
        {name: 'tester2', email: 'tester2@test.com'},
        {name: 'tester3', email: 'tester3@test.com'},
        {name: 'tester4', email: 'tester4@test.com'},
    ]);
    if(newUsers){
        res.status(201).json({newUsers})
    }
});

mainRoute.get('/list', async (req, res)=>{
    const listUsers = await getAllUsers();
    if(listUsers){
        res.status(200).json({list: listUsers})
    }
});