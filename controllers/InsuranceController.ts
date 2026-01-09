import { database } from "@/util/database";

export const InsuranceController = {
    getAll: () => database.getAllSync('SELECT * FROM insurance ORDER BY expiryDate ASC'),

    create: (data: any) => {
        try {
            const result = database.runSync(
                'INSERT INTO insurance (holderName,companyName,vehicleNo,expiryDate) VALUES(?,?,?,?)',
                [data.holderName, data.companyName, data.vehicleNo, data.expiryDate]
            );
            return result.lastInsertRowId;
        } catch (error) {
            console.error('Failed to create license:', error);
            return null;
        }
    },

    update: (id: number, data: any) => {
        return database.runSync(
            'UPDATE insurance SET holderName = ?,CompanyName = ?,vehicleNo = ?,expiryDate = ? WHERE id = ?',
            [data.holderName, data.companyName, data.vehicleNo, data.expiryDate, id]
        );

    },
    remove: (id: number) => database.runSync('DELETE FROM insurance WHERE id = ?', [id])
};