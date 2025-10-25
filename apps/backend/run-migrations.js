"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/database/data-source");
async function runMigrations() {
    try {
        console.log('Initializing database connection...');
        await data_source_1.AppDataSource.initialize();
        console.log('Running migrations...');
        await data_source_1.AppDataSource.runMigrations();
        console.log('Migrations completed successfully!');
        await data_source_1.AppDataSource.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error('Error running migrations:', error);
        process.exit(1);
    }
}
runMigrations();
//# sourceMappingURL=run-migrations.js.map