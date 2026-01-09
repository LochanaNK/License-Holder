import { initDatabase } from "@/util/database";
import { InsuranceController } from "@/controllers/InsuranceController";
import { NotificationService } from "@/services/NotificationService";

import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { EntryModal } from "@/components/EntryModal";
import { DisplayItem } from "@/components/items/DisplayItem";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Insuarances() {
  const [modalVisible, setModalVisible] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<any | null>(null);

  const loadData = () => {
    const data = InsuranceController.getAll();
    setEntries(data);
  };

  useEffect(() => {
    initDatabase();
    loadData();
  }, []);

  const handleSave = async (formData: any) => {
    const isUpdate = !!formData.id;
    let id = formData.id;

    if (isUpdate) {
      console.log("LOG: Updating existing ID:", id, formData);

      await NotificationService.cancelNotificationsForId(id, "Insurance");

      await InsuranceController.update(id, formData);
    } else {
      console.log("LOG: Creating brand new entry", formData);
      id = await InsuranceController.create(formData);
    }
    loadData();
    setSelectedInsurance(null);
    setModalVisible(false);
    return id;
  };

  const handleDelete = (id: number) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          InsuranceController.remove(id);

          // CLEANUP: Cancel scheduled notifications for this ID
          await NotificationService.cancelNotificationsForId(id, "Insurance");

          loadData();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 relative m-3">
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <DisplayItem
            item={item}
            onEdit={(item) => {
              setSelectedInsurance(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDelete(item.id)}
            type="Insurance"
          />
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <FontAwesome6 name="folder-open" size={50} color="#cbd5e1" />
            <Text className="text-slate-400 mt-4 text-lg font-medium">
              No Insurances added
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          setSelectedInsurance(null);
          setModalVisible(true);
        }}
        activeOpacity={0.8}
        className="absolute bottom-2 right-2 flex-row items-center gap-2 bg-sky-500 p-4 rounded-xl shadow-lg elevation-5"
      >
        <FontAwesome6 name="add" size={24} color="white" />
        <Text className="text-xl font-semibold text-white">Add</Text>
      </TouchableOpacity>
      <EntryModal
        isVisible={modalVisible}
        onClose={() => {
          setSelectedInsurance(null);
          setModalVisible(false);
        }}
        onSave={handleSave}
        type="Insurance"
        initialData={selectedInsurance}
      />
    </View>
  );
}
