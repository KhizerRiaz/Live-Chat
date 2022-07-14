const query1 = `
    CREATE TABLE IF NOT EXISTS "vendors" (
	    "id" SERIAL ,
        "room1" VARCHAR(100) ,
        "room2" VARCHAR(100) ,
	    "name" VARCHAR(100) ,
	    "password" VARCHAR(100) ,
        "email" VARCHAR(100) ,    
        availabler1 boolean ,
        availabler2 boolean , 
	    PRIMARY KEY ("id")
    )`;

module.exports = query1;
