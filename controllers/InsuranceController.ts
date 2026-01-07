import { database } from "@/util/database";

export const InsuranceController = {
    getAll:()=>database.getAllSync('SELECT * FROM insurance ORDER BY expiryDate ASC'),

    create:(data:any)=>{
        return database.runSync(
            'INSERT INTO insurance (holderName,companyName,vehicleNo,expiryDate) VALUES(?,?,?,?)',
            [data.holderName,data.companyName,data.vehicleNo,data.expiryDate]
        );
    },
    remove:(id:number)=>database.runSync('DELETE FROM insurance WHERE id = ?',[id])
};