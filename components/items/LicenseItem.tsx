import {View,Text,TouchableOpacity} from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';

interface LicenseItemProps{
    item:{
        holderName:string,
        vehicleNo:string,
        issuedDate:string,
        expiryDate:string
    };
    onDelete: ()=>void;
}

export const LicenseItem = ({item,onDelete}:LicenseItemProps)=>{
    return(
        <View className='bg-white p-5 mt-15 mb-4 rounded-3xl shadow-sm border border-slate-100 flex-row items-center justify-between'>
            <View className='flex-1'>
                <Text className='text-xl font-bold text-sky-600 uppercase tracking-widest mb-1'>
                    {item.holderName}
                </Text>
                <Text className='text-lg font-bold text-slate-800 mb-1'>
                    {item.vehicleNo}
                </Text>
                <View className='flex-row items-center mt-3'>
                    <View className='bg-red-50 px-2 py-1 rounded-md flex-row items-center'>
                        <FontAwesome6 name="calendar-xmark" size={12} color="#ef4444"/>
                        <Text className='text-red-600 text-md font-bold ml-2'>
                            Exp:{item.expiryDate}
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={onDelete}
                className='bg-slate-50 p-3 rounded-2xl'
            >
                <FontAwesome6 name='trash-can' size={20} color="#ef4444"/>
            </TouchableOpacity>
        </View>
    )
}