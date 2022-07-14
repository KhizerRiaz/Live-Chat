const query = `
    CREATE TABLE IF NOT EXISTS "clients" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) NOT NULL,    
        waiting boolean ,
	    PRIMARY KEY ("id")
    )`;

module.exports = query;
