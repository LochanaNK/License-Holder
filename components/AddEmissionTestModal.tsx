import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  Alert,
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

import { NotificationService } from "@/services/NotificationService";

interface AddEmissionTestModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (formData: any) => void;
}

export const AddEmissionTestModal = ({
  isVisible,
  onClose,
  onAdd,
}: AddEmissionTestModalProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      handleChange("expiryDate", formattedDate);
    }
  };

  const [formData, setFormData] = useState({
    testerName: "",
    vehicleNo: "",
    vehicleClass: "",
    expiryDate: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    if (!formData.testerName || !formData.vehicleNo || !formData.expiryDate) {
      Alert.alert(
        "Form Error",
        "Please fill in all fields.",
        [{text:"OK"}]
      );
      return;
    }
    onAdd(formData);

    setFormData({
      testerName: "",
      vehicleNo: "",
      vehicleClass: "",
      expiryDate: "",
    });
    await NotificationService.scheduleExpiryNotification(
      formData.testerName,
      formData.expiryDate,
      "Emission"
    );
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white p-6 rounded-t-3xl max-h-[55%]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-slate-800">New Entry</Text>
            <TouchableOpacity onPress={onClose}>
              <Fontisto name="close" size={24} color="#dc2626" />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
            className="shrink"
          >
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: Platform.OS === "android" ? 150 : 40,
              }}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                placeholder="Testing Company Name"
                placeholderTextColor={"#1e293b"}
                value={formData.testerName}
                onChangeText={(val) => handleChange("testerName", val)}
                onSubmitEditing={handleAdd}
              />
              <TextInput
                className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                placeholder="Vehicle No"
                placeholderTextColor={"#1e293b"}
                value={formData.vehicleNo}
                onChangeText={(val) => handleChange("vehicleNo", val)}
                onSubmitEditing={handleAdd}
              />
              <TextInput
                className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                placeholder="Vehicle Class"
                placeholderTextColor={"#1e293b"}
                value={formData.vehicleClass}
                onChangeText={(val) => handleChange("vehicleClass", val)}
                onSubmitEditing={handleAdd}
              />

              <Text className="text-slate-500 mb-1 ml-1">Expiration Date</Text>
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                className="bg-slate-100 p-4 rounded-2xl border border-slate-200 mb-3 flex-row justify-between items-center"
              >
                <Text className="text-lg text-slate-800">
                  {formData.expiryDate || "Select Date"}
                </Text>
                <FontAwesome6 name="calendar-days" size={20} color="#64748b" />
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </ScrollView>
            <TouchableOpacity
              onPress={handleAdd}
              className="bg-sky-500 p-4 rounded-2xl items-center mb-4"
            >
              <Text className="text-white text-lg font-bold">Add Entry</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};
