const redis = require('redis');
const { spawn } = require('child_process');

// Redis Client
const redisClient = redis.createClient({
    socket: { host: '127.0.0.1', port: 6379 }
});
redisClient.connect()
    .then(() => console.log('Connected to Redis successfully'))
    .catch((err) => console.error('Redis connection error:', err));

// Python Script Execution
function executePythonScript(data) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [
            'E:/amazon sambhav/mcf omniflux/backend_vania/inventory_defect/electronics_defect/predict.py'
        ]);

        let result = '';
        let errorOutput = '';

        // Send JSON data to Python script via stdin
        pythonProcess.stdin.write(JSON.stringify(data));
        pythonProcess.stdin.end();

        // Capture stdout from Python
        pythonProcess.stdout.on('data', (chunk) => {
            result += chunk.toString();
        });

        // Capture stderr from Python
        pythonProcess.stderr.on('data', (chunk) => {
            errorOutput += chunk.toString();
        });

        // Handle process close
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    resolve(JSON.parse(result));
                } catch (err) {
                    reject(new Error(`Invalid JSON from Python script: ${result}`));
                }
            } else {
                reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
            }
        });
    });
}

// Store Results in Redis
async function storeResultsInRedis(predictions) {
    for (let i = 0; i < predictions.length; i++) {
        const key = `prediction:${Date.now()}:${i}`;
        const value = JSON.stringify(predictions[i]);
        await redisClient.set(key, value);
    }
}

// Main Workflow
async function main() {
    try {
        const inputData = [
            { "Availability": 22, "Number of products sold": 1, "Order quantities": 22, "Production volumes": 1, "Inspection results": 1 }
        ];

        // Input Validation
        const expectedFeatures = ["Availability", "Number of products sold", "Order quantities", "Production volumes", "Inspection results"];
        inputData.forEach((item, index) => {
            for (const feature of expectedFeatures) {
                if (item[feature] == null || item[feature] === '') {
                    throw new Error(`Invalid value for '${feature}' in record ${index}`);
                }
            }
        });

        // Execute Python Script
        const predictions = await executePythonScript(inputData);

        // Store in Redis
        await storeResultsInRedis(predictions);
        console.log('Predictions stored successfully!');
    } catch (err) {
        console.error('Error in workflow:', err.message);
    } finally {
        await redisClient.disconnect(); // Clean up Redis connection
    }
}

main();
