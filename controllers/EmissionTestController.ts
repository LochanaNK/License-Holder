import { database } from '../util/database';

export const EmissionTestController = {
    getAll: () => {
        try {
            return database.getAllSync('SELECT * FROM emissionTest ORDER BY id DESC');
        } catch (error) {
            console.error("Failed to fetch licenses", error);
            return [];
        }
    },

    create: (data: any): number | null => {
        try {
            const result = database.runSync(
                'INSERT INTO emissionTest (companyName,vehicleNo,vehicleClass,expiryDate) VALUES(?,?,?,?)',
                [data.companyName, data.vehicleNo, data.vehicleClass, data.expiryDate]
            );
            return result.lastInsertRowId;
        } catch (error) {
            console.error('Failed to create license:', error);
            return null;
        }
    },

    update: (id: number, data: any) => {
        return database.runSync(
            'UPDATE emissionTest SET companyName = ?,vehicleNo = ?,vehicleClass = ?,expiryDate = ? WHERE id = ?',
            [data.companyName, data.vehicleNo, data.vehicleClass, data.expiryDate, id]
        );

    },
    remove: (id: number) => {
        try {
            database.runSync('DELETE FROM emissionTest WHERE id = ?', [id]);
            return true;
        } catch (error) {
            console.error('Failed to delete license:', error);
            return false;
        }
    }
}