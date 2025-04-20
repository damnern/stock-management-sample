import 'dotenv/config';
const isLogResult = process.env.LOG_DB_RESULT;

function dbHandler(handler)
{
	return async function(req,res,next)
	{
		if(isLogResult)
		{
			const originalRes = res.json;
			res.json = function(data)
			{
				console.log(req.method + " | " + req.originalUrl);
				console.log("Result: "+JSON.stringify(data, null, 2));
				return originalRes.call(this,data);
			}
		}
		
		try
		{
			await handler(req,res,next);
		}
		catch(err)
		{
			const isDbError = err?.sqlMessage || err?.code?.startsWith("ER_");
			res.status(500).json({ 
							error: isDbError ? "Database error" : "Server error", 
							details: err.message });
		}
	}
}

export default dbHandler;