// import { MongoClient } from 'mongodb';

// export const dbClient = new MongoClient('mongodb://127.0.0.1');


// await dbClient.connect();   


import mysql from 'mysql2/promise';

export const db = await mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'Raju@123',
   database:'url_shortener_mysql' 
});