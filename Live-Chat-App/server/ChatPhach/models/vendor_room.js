const query = `
    CREATE TABLE IF NOT EXISTS "vendor_room" (
	    "vendor_id" integer ,
        "room" varchar(100) ,
        "available" boolean ,    
	    PRIMARY KEY ("room")  
    )`;

module.exports = query;