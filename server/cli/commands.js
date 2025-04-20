//Universal CLI Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION]', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
  process.exit(1);
});


//Command line custom
import db from '../dbconnect.js';
async function executeCommand(input,server) 
{
	const command = input.trim().toLowerCase();
	if (command === 'quit' || command === 'exit') 
	{
		CloseServer(server);
	}
	else 
	{
		console.log(`Unknown command: ${command}`);
	}
}

async function CloseServer(server)
{
	console.log('Server is shutting down...');
	// Close MySQL pool
	try 
	{
		await db.end?.();
		await db.release?.();
		console.log('MySQL connection closed.');
	} 
	catch (err) 
	{
		console.warn('Error closing DB connection:', err.message);
	}

	//Close API server
	server.close(() => 
	{
	  console.log('HTTP server closed.');
	  process.exit(0);
	});
}

export default executeCommand;