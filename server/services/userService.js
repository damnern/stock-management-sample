import db from '../dbconnect.js';

async function getAllUser() 
{
	const sqlCmd = "SELECT * FROM users";
	const [rows] = await db.execute(sqlCmd);
	return rows;
}


async function getUser(userID) 
{
	const [userRow] = await db.execute(
	`
		SELECT *
		FROM users				  
		WHERE id = ?
	`,
    [userID]);
	return userRow;
}


async function createUser(name,role) 
{
	const [insertRes] = await db.execute(
	`
		INSERT INTO users (name,
						   role)
		VALUES (?,?)
	`,
    [name, role]);
	return insertRes;
}

async function updateUserName(userID,newName)
{	
	const [updateName] = await db.execute(
	`
		UPDATE users 
		SET name = ?
		WHERE users.id = ?
	`,
	[newName,userID]);
	return updateName;
}

async function updateUserRole(userID,newRole)
{	
	const [updateRole] = await db.execute(
	`
		UPDATE users 
		SET role = ?
		WHERE users.id = ?
	`,
	[newRole,userID]);
	return updateRole;
}

async function deleteUser(userID) 
{
	const [userRow] = await db.execute(
	`
		DELETE FROM users				  
		WHERE users.id = ?
	`,
    [userID]);
	return userRow;
}

export {
  getAllUser,
  getUser,
  createUser,
  updateUserName,
  updateUserRole,
  deleteUser
};