import express from 'express';
import * as stockService from '../services/stockloadService.js';
import dbHandler from '../utils/dbHandler.js';

const router = express.Router();
//Get Task
router.get('/tasks', dbHandler( async(req,res) =>
{
	const allTask = await stockService.getAllTask();
	res.json(allTask);
}));

router.get('/tasks/id/:id', dbHandler( async(req,res) =>
{
	const taskDetail = await stockService.getTask(req.params.id,"ID");
	res.json(taskDetail);
}));

router.get('/tasks/serial/:serial', dbHandler( async(req,res) =>
{
	const taskDetail = await stockService.getTask(req.params.serial,"Serial");
	res.json(taskDetail);
}));


//Create Task
router.post('/create', dbHandler( async(req,res) =>
{
	const { createdUser,productID,type,refs } = req.body;
	const id = await stockService.createTask(createdUser,productID,type,refs);
	id.result = "Task Created";
	res.status(201).json({ id });
}));

//Update Task Product
router.patch('/id/:id/product', dbHandler( async(req,res) =>
{
	const id = await stockService.updateTaskProduct(req.params.id,"ID",req.body.product);
	id.result = `Task ID: ${req.params.id} has Product updated to [${req.body.product}]`;
	res.status(201).json({ id });
}));

router.patch('/serial/:serial/product', dbHandler( async(req,res) =>
{
	const id = await stockService.updateTaskProduct(req.params.serial,"Serial",req.body.product);
	id.result = `Task with serial: ${req.params.serial} has Product updated to [${req.body.product}]`;
	res.status(201).json({ id });
}));

//Update Task Status
router.patch('/id/:id/status', dbHandler( async(req,res) =>
{
	const id = await stockService.updateTaskStatus(req.params.id,"ID",req.body);
	id.result = `Task ID: ${req.params.id} has Status updated to [${req.body.status}]`;
	res.status(201).json({ id });
}));

router.patch('/serial/:serial/status', dbHandler( async(req,res) =>
{
	const id = await stockService.updateTaskStatus(req.params.serial,"Serial",req.body);
	id.result = `Task with serial: ${req.params.serial} has Status updated to [${req.body.status}]`;
	res.status(201).json({ id });
}));

//Delete Task
router.delete('/tasks/id/:id', dbHandler( async(req,res) =>
{
	const taskDel = await stockService.deleteTask(req.params.id,"ID");
	taskDel.result = `Task ID: ${req.params.id} has been deleted.`;
	res.json(taskDel);
}));

router.delete('/tasks/serial/:serial', dbHandler( async(req,res) =>
{
	const taskDel = await stockService.deleteTask(req.params.serial,"Serial");
	taskDel.result = `Task with serial: ${req.params.serial} has been deleted.`;
	res.json(taskDel);
}));

export default router;