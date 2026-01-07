import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AddInsuranceModal } from "@/components/AddInsuranceModal";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Insuarances() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = (data:any) => {
    console.log("New Entry:", data);
    setModalVisible(false);
  };

  return (
    <View className="flex-1 relative m-3">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
        className="absolute bottom-2 right-2 flex-row items-center gap-2 bg-sky-500 p-4 rounded-xl shadow-lg elevation-5"
      >
        <FontAwesome6 name="add" size={24} color="white" />
        <Text className="text-xl font-semibold text-white">Add</Text>
      </TouchableOpacity>
      <AddInsuranceModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </View>
  );
}
