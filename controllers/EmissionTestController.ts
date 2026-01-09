import {database} from '../util/database';

export const EmissionTestController ={
    getAll:()=>{
        try{
            return database.getAllSync('SELECT * FROM emissionTest ORDER BY id DESC');
        }catch(error){
            console.error("Failed to fetch licenses",error);
            return[];
        }
    },

    create:(data:any):number | null=>{
        try{
            const result = database.runSync(
                'INSERT INTO emissionTest (testerName,vehicleNo,vehicleClass,expiryDate) VALUES(?,?,?,?)',
                [data.testerName,data.vehicleNo,data.vehicleClass,data.expiryDate]
            );
        }catch(error){
            console.error('Failed to create license:',error);
        }
        return null;
    },
    remove:(id:number)=>{
        try{
            database.runSync('DELETE FROM emissionTest WHERE id = ?',[id]);
            return true;
        }catch(error){
            console.error('Failed to delete license:',error);
            return false;
        }
    }
}