import express from 'express';
import usersRouter from './routes/users.js';
import stockRouter from './routes/stockLoader.js';

const app = express();
app.use(express.json());

// Routes
app.get('/greet', getGreeting);
app.use('/users', usersRouter);
app.use('/stock', stockRouter);

// Error Handling
app.use((req, res) => {
	res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) 
	{
		console.error('Invalid JSON recieved:', err.message);
		return res.status(400).json({ error: 'Invalid JSON format' });
	}

	console.error('Unhandled Error:', err.stack);
	res.status(500).json({ error: 'Internal Server Error' });
});

//API Functions
function getGreeting(req, res) 
{
  const greeting = 'Hello, world!';
  res.send(greeting);
}

export default app;