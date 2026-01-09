import * as SQLite from 'expo-sqlite';

export const database = SQLite.openDatabaseSync('holder.db');

export const initDatabase = ()=>{
    database.execSync(`
            CREATE TABLE IF NOT EXISTS licenses(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                holderName TEXT NOT NULL,
                vehicleNo TEXT,
                vehicleClass TEXT,
                expiryDate TEXT
            );

            CREATE TABLE IF NOT EXISTS insurance(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                holderName TEXT NOT NULL,
                companyName TEXT,
                vehicleNo TEXT,
                expiryDate TEXT
            );

            CREATE TABLE IF NOT EXISTS emissionTest(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                companyName TEXT NOT NULL,
                vehicleNo TEXT,
                vehicleClass TEXT,
                expiryDate TEXT
            )
        `);
};

