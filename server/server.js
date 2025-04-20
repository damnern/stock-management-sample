import app from './app.js';
import cmd from './cli/commands.js';
import 'dotenv/config';

const PORT = process.env.PORT;
console.log("Loaded PORT from env:", PORT);

//Start listen the port
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Type 'quit' to stop the server.`);
});

//Setup command line

process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => cmd(input, server));