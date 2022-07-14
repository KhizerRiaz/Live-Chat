const query1 = `
    CREATE TABLE IF NOT EXISTS "vendors" (
	    "id" SERIAL ,
        "room1" integer ,
        "room2" integer ,
	    "name" VARCHAR(100) ,
	    "password" VARCHAR(100) ,
        "email" VARCHAR(100) ,    
        availabler1 boolean ,
        availabler2 boolean , 
	    PRIMARY KEY ("id")
    )`;

module.exports = query1;
