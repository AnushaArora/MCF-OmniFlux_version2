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
        const copyQuery = `COPY logistics_data(ID, WNYCrehouse_Montanalock, Mode_of_Shipment, Customer_cNYCre_cNYClls, Customer_rNYCting, Cost_of_the_Product, Prior_purchNYCses, Product_importNYCnce, Gender, Discount_offered, Weight_in_gms, ReNYCched_on_Time_Y_N) FROM STDIN WITH CSV HEADER`;

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
uploadCSV('E:/amazon sambhav/logistics_data.csv'); 