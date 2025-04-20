import express from 'express';
import * as userService from '../services/userService.js';
import dbHandler from '../utils/dbHandler.js';

const router = express.Router();

//Get Users
router.get('/', dbHandler( async(req,res) =>
{
	const allUsers = await userService.getAllUser();
	res.json(allUsers);
}));

router.get('/id/:id', dbHandler( async(req,res) =>
{
	const userDetail = await userService.getUser(req.params.id,);
	res.json(userDetail);
}));

//Create User
router.post('/create', dbHandler( async(req,res) =>
{
	const { name,role } = req.body;
	const id = await userService.createUser(name,role);
	id.result = "User Created";
	res.status(201).json({ id });
}));

//Update User
router.patch('/id/:id/name', dbHandler( async(req,res) =>
{
	const id = await userService.updateUserName(req.params.id,req.body.name);
	id.result = `User ID: ${req.params.id} has Name updated to [${req.body.name}]`;
	res.status(201).json({ id });
}));

router.patch('/id/:id/role', dbHandler( async(req,res) =>
{
	const id = await userService.updateUserRole(req.params.id,req.body.role);
	id.result = `User ID: ${req.params.id} has Role updated to [${req.body.role}]`;
	res.status(201).json({ id });
}));

//Delete User
router.delete('/id/:id', dbHandler( async(req,res) =>
{
	const taskDel = await userService.deleteUser(req.params.id);
	taskDel.result = `User ID: ${req.params.id} has been removed.`;
	res.json(taskDel);
}));

export default router;