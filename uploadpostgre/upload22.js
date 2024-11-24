const { Client } = require('pg');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;

const client = new Client({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'MCF Main_2', // Replace with your PostgreSQL database name
    password: 'vania2110', // Replace with your PostgreSQL password
    port: 5432, // Default port for PostgreSQL
});

// Function to upload CSV to PostgreSQL
const uploadCSV = async (filePath) => {
    try {
        await client.connect(); // Connect to PostgreSQL
        console.log('Connected to PostgreSQL.');

        // Define the COPY query for your table
        const copyQuery = `COPY route_optimization_data2(SNO, vehicle_gps_latitude, vehicle_gps_longitude, fuel_consumption_rate, eta_variation_hours, traffic_congestion_level, 
                             warehouse_inventory_level, loading_unloading_time, handling_equipment_availability, order_fulfillment_status, 
                             weather_condition_severity, shipping_costs, supplier_reliability_score, lead_time_days, historical_demand, 
                             iot_temperature, cargo_condition_status, route_risk_level, customs_clearance_time, driver_behavior_score, 
                             fatigue_monitoring_score, disruption_likelihood_score, delay_probability, risk_classification, delivery_time_deviation)  FROM STDIN WITH CSV HEADER`;

        // Create a read stream for the CSV file
        const fileStream = fs.createReadStream(filePath);

        // Create a stream to execute the COPY command
        const pgStream = client.query(copyFrom(copyQuery));

        // Pipe the file stream into the PostgreSQL COPY stream
        fileStream.pipe(pgStream);

        pgStream.on('finish', () => {
            console.log('CSV uploaded successfully!');
            client.end(); // Close the connection
        });

        pgStream.on('error', (err) => {
            console.error('Error during upload:', err);
            client.end(); // Close the connection in case of an error
        });
    } catch (err) {
        console.error('Error:', err.stack);
        client.end(); // Close the connection on error
    }
};

// Call the function with the path to your CSV file
uploadCSV('E:/amazon sambhav/route_optimization.csv'); 