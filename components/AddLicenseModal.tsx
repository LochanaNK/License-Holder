import { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Modal,
    TouchableOpacity,
    Platform,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

interface AddLicenseModalProps {
    isVisible: boolean;
    onClose: () => void;
    onAdd: (formData: any) => void;
}

export const AddLicenseModal = ({ isVisible, onClose, onAdd }: AddLicenseModalProps) => {
    const [formData, setFormData] = useState({
        holderName:'',
        vehicleNo:'',
        vehicleClass:'',
        expiryDate:''
    });

    const handleChange = (name:string,value:string)=>{
        setFormData(prev=>({
            ...prev,
            [name]:value
        }));
    };

    const handleAdd = () => {
        if(!formData.holderName || !formData.vehicleNo){
            return;
        }
        onAdd(formData);

        setFormData({
            holderName:'',
            vehicleNo:'',
            vehicleClass:'',
            expiryDate:'',
        });
        onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/50">
                <View className="bg-white p-6 rounded-t-3xl h-1/2">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-2xl font-bold text-slate-800">New Entry</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Fontisto name="close" size={24} color="#dc2626" />
                        </TouchableOpacity>
                    </View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
                        className="flex-1"
                    >
                        <View className="flex-1 justify-between">
                            <ScrollView>
                                <TextInput
                                    className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                                    placeholder="License Holder's name"
                                    value={formData.holderName}
                                    onChangeText={(val)=>handleChange('holderName',val)}
                                    onSubmitEditing={handleAdd}
                                />
                                <TextInput
                                    className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                                    placeholder="Vehicle No"
                                    value={formData.vehicleNo}
                                    onChangeText={(val)=>handleChange('vehicleNo',val)}
                                    onSubmitEditing={handleAdd}
                                />
                                <TextInput
                                    className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                                    placeholder="Vehicle Class"
                                    value={formData.vehicleClass}
                                    onChangeText={(val)=>handleChange('vehicleClass',val)}
                                    onSubmitEditing={handleAdd}
                                />
                                <TextInput
                                    className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                                    placeholder="Expiration Date"
                                    value={formData.expiryDate}
                                    onChangeText={(val)=>handleChange('expiryDate',val)}
                                    onSubmitEditing={handleAdd}
                                />
                            </ScrollView>
                        
                            <TouchableOpacity
                                onPress={handleAdd}
                                className="bg-sky-500 p-4 rounded-2xl items-center mb-4"
                            >
                                <Text className="text-white text-lg font-bold">Add Entry</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    );
};
