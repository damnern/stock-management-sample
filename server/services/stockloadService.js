import db from '../dbconnect.js';

const stockTable = "stock_load_tasks";

//Get Task
async function getAllTask() 
{
	const sqlCmd = "SELECT * FROM " + stockTable;
	const [rows] = await db.execute(sqlCmd);
	return rows;
}

async function getTask(taskID,idType) 
{
	let whereClause;
	let val = [];
	if(idType == "ID")
	{
		whereClause = 'task_id = ?';
	}
	else if(idType == "Serial")
	{
		whereClause = 'task_serial = ?';
	}
	
	const [taskRow] = await db.execute(
	`
		SELECT *
		FROM stock_load_tasks				  
		WHERE ${whereClause};
	`,
    [taskID]);
	return taskRow;
}

//Create Task
async function createTask(createdUser,productID,type,refs) 
{
	console.log("createTask stated.");
	const [insertRes] = await db.execute(
	`
		INSERT INTO stock_load_tasks (created_by,
									  product,
									  started_at,
									  finished_at,
									  type)
		VALUES (?,?,CURRENT_TIMESTAMP, NULL,?)
	`,
    [createdUser, productID, type]);
	
	const newTaskNum = type+"-"+insertRes.insertId;
	console.log("newTaskNum: "+newTaskNum);
	
	const [updateRes] = await db.execute(
	`
		UPDATE stock_load_tasks 
		SET task_serial = ?
		WHERE stock_load_tasks.task_id = ?
	`,
	[newTaskNum,insertRes.insertId]);
	
	console.log("Task: "+insertRes.insertId+" Added!");
	
	if(type == "Urgent")
	{
		const [updateRes] = await db.execute(
		`
			UPDATE stock_load_urgent 
			SET description = ?
			WHERE stock_load_urgent.task_id = ?
		`,
		[refs,insertRes.insertId]);
		console.log("New Urgent Load desc Added!");
	}
	else if(type == "Special")
	{
		console.log(refs);
		const [updateRes] = await db.execute(
		`
			UPDATE stock_load_special 
			SET width = ?,
				length = ?,
				height = ?,
				weight = ?,
				instruction = ?
			WHERE stock_load_special.task_id = ?
		`,
		[refs.width,refs.length,refs.height,refs.weight,refs.instruction,insertRes.insertId]);
	}
	
	return updateRes;
}

//Update Task
async function updateTaskProduct(taskID,idType,newTxt) 
{
	let whereClause;
	if(idType == "ID")
	{
		whereClause = 'stock_load_tasks.task_id = ?';
	}
	else if(idType == "Serial")
	{
		whereClause = 'stock_load_tasks.task_serial = ?';
	}
	
	const [updateProduct] = await db.execute(
	`
		UPDATE stock_load_tasks 
		SET product = ?
		WHERE ${whereClause}
	`,
	[newTxt,taskID]);
	return updateProduct;
}

async function updateTaskStatus(taskID,idType,dat) 
{
	const newStat = dat.status;
	let setClause = 'status = ?';
	let values = [newStat];
	
	//Additional column to update
	if(newStat === "Assigned")
	{
		setClause += ',assigned_to = ?'
		values.push(dat.refs);
		
	}
	else if(newStat === "Done")
	{
		setClause += ',finished_at = CURRENT_TIMESTAMP';
	}
	
	//Update by ID or Serial
	let whereClause;
	if(idType == "ID")
	{
		whereClause = 'stock_load_tasks.task_id = ?';
	}
	else if(idType == "Serial")
	{
		whereClause = 'stock_load_tasks.task_serial = ?';
	}
	values.push(taskID);
	
	const [updateStat] = await db.execute(
	`
		UPDATE stock_load_tasks 
		SET ${setClause}
		WHERE ${whereClause}
	`,
	values);
	return updateStat;
}

//Delete Task
async function deleteTask(taskID,idType) 
{
	console.log("Enter: ",deleteTask,taskID,idType);
	let whereClause;
	if(idType == "ID")
	{
		whereClause = 'task_id = ?';
	}
	else if(idType == "Serial")
	{
		whereClause = 'task_serial = ?';
	}
	
	const [taskRow] = await db.execute(
	`
		DELETE FROM stock_load_tasks				  
		WHERE ${whereClause};
	`,
    [taskID]);
	return taskRow;
}

export {
	getAllTask,
	getTask,
	createTask,
	updateTaskProduct,
	updateTaskStatus,
	deleteTask
};