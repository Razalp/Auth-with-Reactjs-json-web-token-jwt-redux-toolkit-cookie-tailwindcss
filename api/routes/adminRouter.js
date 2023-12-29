import express from 'express';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post('/', async (req, res) => {
    console.log("helo");
    try {
      const users = await User.find({}); 
      console.log(users)
      res.status(200).json(users);
    } catch (error) {
   console.log(error)
    }
  });

  router.post('/delete/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('Deleting user with ID:', userId);
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/edit/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
  
    console.log('Editing user with ID:', userId);
    
    try {

      const existingUser = await User.findById(userId);
      
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/search/:username', async (req, res) => {
    const username = req.params.username;
  
    try {
      const users = await User.find({ username: { $regex: new RegExp(username, 'i') } });
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found with the specified username' });
      }
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  export default router;