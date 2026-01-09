import { initDatabase } from "@/util/database";
import { EmissionTestController } from "@/controllers/EmissionTestController";

import { EntryModal } from "@/components/EntryModal";
import { DisplayItem } from "@/components/items/DisplayItem";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { NotificationService } from "@/services/NotificationService";

export default function Licenses() {
  const [modalVisible, setModalVisible] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedEmissionTest, setSelectedEmissionTest] = useState<any | null>(
    null
  );

  const loadData = () => {
    const data = EmissionTestController.getAll();
    setEntries(data);
  };

  useEffect(() => {
    initDatabase();
    loadData();
    NotificationService.setup();
  }, []);

  const handleSave = async (formData: any) => {
    const isUpdate = !!formData.id;
    let id = formData.id;

    if (isUpdate) {
      console.log("LOG: Updating existing ID:", id, formData);

      await NotificationService.cancelNotificationsForId(id, "Emission");

      await EmissionTestController.update(id, formData);
    } else {
      console.log("LOG: Creating brand new entry", formData);
      id = await EmissionTestController.create(formData);
    }
    loadData();
    setModalVisible(false);
    setSelectedEmissionTest(null);
    return id;
  };
  const handleDelete = (id: number) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          EmissionTestController.remove(id);

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
              setSelectedEmissionTest(item);
              setModalVisible(true);
            }}
            onDelete={() => handleDelete(item.id)}
            type="Emission"
          />
        )}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <FontAwesome6 name="folder-open" size={50} color="#cbd5e1" />
            <Text className="text-slate-400 mt-4 text-lg font-medium">
              No Test Results added
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
      <EntryModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        type="Emission"
        initialData={selectedEmissionTest}
      />
    </View>
  );
}
