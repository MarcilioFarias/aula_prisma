import express from 'express';
import { createUser, createUsers, findEmail, findUserPost, getAllUsers, getUserByEmail } from '../services/user';

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
        {name: 'tester2', email: 'tester2@yahoo.com'},
        {name: 'tester2', email: 'tester2@yahoo.com'},
        {name: 'tester3', email: 'tester3@yahoo.com'},
        {name: 'tester4', email: 'tester4@yahoo.com'},
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

mainRoute.get('/find', async (req, res)=>{    
    const result = await getUserByEmail(
        `${req.query.email}`
    );
    if(result){
        res.status(200).json({result})
    } else {
        res.json({message: 'User not found'})
    }
});

mainRoute.get('/search', async (req, res)=>{
    const result = await findEmail(
        `${req.query.email}`
    );
    if(result){
        res.status(200).json({result});
    } else {
        res.status(500).json({message: 'Email not found'});
    }
});

mainRoute.get('/related', async  (req, res)=> {
    const userPost = await findUserPost(
        `${req.query.title}`
    );
    if(userPost){
        res.status(200).json({found: userPost});
    } else {
        res.json({message: 'No user found'});
    }
});