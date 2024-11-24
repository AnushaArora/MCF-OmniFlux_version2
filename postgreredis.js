const redis = require('redis');
const { Client } = require('pg');

// Redis Client
const redisClient = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  }
});


const pgClient = new Client({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'MCF Main_2', // Replace with your PostgreSQL database name
    password: 'vania2110', // Replace with your PostgreSQL password
    port: 5432, // Default port for PostgreSQL
});


async function fetchData() {
    await pgClient.connect();
    const res = await pgClient.query('SELECT * FROM inventory_data'); // Adjust table name
    await pgClient.end();
    return res.rows;
}

function preprocessData(data) {
    return data.map(item => ({
        id: item.id,
        name: item.name.trim(),
        quantity: Math.max(0, item.quantity), // Ensures no negative quantities
        price: parseFloat(item.price).toFixed(2),
    }));
}

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function storeInRedis(data) {
    await redisClient.connect();
    for (const item of data) {
        await redisClient.set(`inventory:${item.id}`, JSON.stringify(item));
    }
    await redisClient.quit();
}


async function main() {
    const rawData = await fetchData();
    const cleanedData = preprocessData(rawData);
    await storeInRedis(cleanedData);
    console.log('Data cleaned and stored in Redis successfully!');
}

main().catch(err => console.error(err));
// This script connects to the PostgreSQL database and fetches data from a table named inventory_data.