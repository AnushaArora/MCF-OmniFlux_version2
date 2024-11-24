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
        const pythonProcess = spawn('python', ['E:/amazon sambhav/mcf omniflux/inventory_defect/accessories_defect/predict.py', JSON.stringify(data)]);

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
            { "Availability": 22, "Number of products sold": 1, "Order quantities": 22, "Production volumes": 1, "Inspection results": 1 }
        ];

        // Ensure that input data is in a format that Python expects
        if (inputData.length === 0 || !inputData[0]) {
            console.error("No valid data to send to the model.");
            process.exit(1);
        }

        // Validation: Check if expected features are present and warn for extra features
        const expectedFeatures = ["Availability", "Number of products sold", "Order quantities", "Production volumes", "Inspection results"];
        const inputFeatures = Object.keys(inputData[0]);

        const missingFeatures = expectedFeatures.filter(feature => !inputFeatures.includes(feature));
        const extraFeatures = inputFeatures.filter(feature => !expectedFeatures.includes(feature));

        if (missingFeatures.length > 0) {
            console.error(`Missing features in input data: ${missingFeatures}`);
            process.exit(1);
        }

        if (extraFeatures.length > 0) {
            console.warn(`Extra features in input data: ${extraFeatures}`);
        }

        // Execute the Python script and capture predictions
        const predictions = await executePythonScript(inputData);

        // Ensure the result is valid JSON (handle cases where the result is not valid JSON)
        let parsedPredictions;
        try {
            parsedPredictions = JSON.parse(predictions);
        } catch (err) {
            console.error("Error parsing Python script output as JSON:", err);
            process.exit(1);
        }

        // Store predictions in Redis
        await storeResultsInRedis(parsedPredictions);

        console.log('Predictions stored successfully!');
    } catch (err) {
        console.error('Error in workflow:', err);
    }
}


main();