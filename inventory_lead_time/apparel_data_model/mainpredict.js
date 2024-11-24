const redis = require('redis');

// Redis Client
const redisClient = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  }
});
redisClient.connect()
    .then(() => console.log('Connected to Redis successfully'))
    .catch((err) => console.error('Redis connection error:', err));

async function fetchDataFromRedis() {
    const redisClient = redis.createClient();
    await redisClient.connect();

    const keys = await redisClient.keys('inventory:*');
    const data = [];

    for (const key of keys) {
        const value = await redisClient.get(key);
        data.push(JSON.parse(value));
    }

    await redisClient.quit();
    return data;
}
const { spawn } = require('child_process');

function executePythonScript(data) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['E:/amazon sambhav/mcf omniflux/backend_vania/inventory_lead_time/apparel_data_model/predict.py', JSON.stringify(data)]);

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (error) => {
            console.error('Error from Python:', error.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(JSON.parse(result));
            } else {
                reject(new Error(`Python script exited with code ${code}`));
            }
        });
    });
}
async function storeResultsInRedis(predictions) {
    const redisClient = redis.createClient();
    await redisClient.connect();

    for (let i = 0; i < predictions.length; i++) {
        await redisClient.set(`prediction:${i}`, JSON.stringify(predictions[i]));
    }

    await redisClient.quit();
}


async function main() {
    try {
        const inputData = [
            { "Lead time": 12, "Manufacturing lead time": 27 } // Ensure only expected features are included
        ];

        if (inputData.length === 0 || !inputData[0]) {
            console.error("No valid data to send to the model.");
            process.exit(1);
        }


        const predictions = await executePythonScript(inputData);


        await storeResultsInRedis(predictions);


        console.log('Predictions stored successfully!');
    } catch (err) {
        console.error('Error in workflow:', err);
    }
}


main();

          
async function displayResults() {
    const redisClient = redis.createClient();
    await redisClient.connect();


    const keys = await redisClient.keys('prediction:*');
    for (const key of keys) {
        const value = await redisClient.get(key);
        console.log(`Prediction for ${key}:`, JSON.parse(value));
    }


    await redisClient.quit();
}


displayResults();
     