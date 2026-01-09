import { database } from '../util/database';

export const LicenseController = {
    getAll: () => {
        try {
            return database.getAllSync('SELECT * FROM licenses ORDER BY id DESC');
        } catch (error) {
            console.error("Failed to fetch licenses", error);
            return [];
        }
    },

    create: (data: any): number | null => {
        try {
            const result = database.runSync(
                'INSERT INTO licenses (holderName,vehicleNo,vehicleClass,expiryDate) VALUES(?,?,?,?)',
                [data.holderName, data.vehicleNo, data.vehicleClass, data.expiryDate]
            );
            console.log("Database Insert Success, ID:", result.lastInsertRowId);
            return result.lastInsertRowId;
        } catch (error) {
            console.error('Failed to create license:', error);
            return null;
        }
    },

    update: (id: number, data: any) => {
        return database.runSync(
            'UPDATE licenses SET holderName = ?,vehicleNo = ?,vehicleClass = ?,expiryDate = ? WHERE id = ?',
            [data.holderName, data.vehicleNo, data.vehicleClass, data.expiryDate, id]
        );

    },
    remove: (id: number) => {
        try {
            database.runSync('DELETE FROM licenses WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error('Failed to delete license:', error);
            return false;
        }
    }
}