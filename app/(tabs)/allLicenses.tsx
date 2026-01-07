import { initDatabase } from "@/util/database";
import { LicenseController } from "@/controllers/LicenseController";

import { AddLicenseModal } from "@/components/AddLicenseModal";
import { LicenseItem } from "@/components/items/LicenseItem";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState,useEffect } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";

export default function Licenses() {
  const [modalVisible, setModalVisible] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);

  const loadData=()=>{
    const data = LicenseController.getAll();
    setEntries(data);
  }

  useEffect(()=>{
    initDatabase();
    loadData();
  },[]);

  const handleAdd = (formData: any) => {
    console.log("New Entry:", formData);
    LicenseController.create(formData);
    loadData();
    setModalVisible(false);
  };
  const handleDelete = (id: number) => {
    const success = LicenseController.remove(id);
    if(success)loadData();
  };

  return (
    <View className="flex-1 relative m-3">
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <LicenseItem item={item} onDelete={() => handleDelete(item.id)} />
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <FontAwesome6 name="folder-open" size={50} color="#cbd5e1" />
            <Text className="text-slate-400 mt-4 text-lg font-medium">
              No Licenses added
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
        className="absolute bottom-2 right-2 flex-row items-center gap-2 bg-sky-500 p-4 rounded-xl shadow-lg elevation-5"
      >
        <FontAwesome6 name="add" size={24} color="white" />
        <Text className="text-xl font-semibold text-white">Add</Text>
      </TouchableOpacity>
      <AddLicenseModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </View>
  );
}
