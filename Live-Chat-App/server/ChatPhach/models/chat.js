const query = `
    CREATE TABLE IF NOT EXISTS "chat" (
	    "id" SERIAL ,
        "room" varchar(100) ,
	    "author" VARCHAR(100) ,
	    "message" VARCHAR(100) ,
        "email" VARCHAR(100) ,    
        "time" VARCHAR(100) ,
        vendor boolean,
	    PRIMARY KEY ("id") 
    )`;

module.exports = query;
