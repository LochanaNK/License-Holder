import { View,Text,TextInput,KeyboardAvoidingView,Modal,TouchableOpacity } from "react-native";
import { Fontisto } from '@expo/vector-icons';

interface AddModalProps{
    isVisible:boolean;
    onClose: ()=>void;
}

export const AddModal=({isVisible,onClose}:AddModalProps)=>{
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
                            <Fontisto name="close" size={24} color="#dc2626"/>
                        </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView>
                        <TextInput
                            className="flex-1 bg-slate-100 p-4 mr-2 rounded-2xl text-lg"
                            placeholder="License Holder's name"
                        />
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    )
}