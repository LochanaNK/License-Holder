import { useState, useEffect } from "react";
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

import * as Notifications from 'expo-notifications';
import { NotificationService } from "@/services/NotificationService";

type EntryType = "License" | "Insurance" | "Emission";

interface EntryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (formData: any) => void;
  type: EntryType;
  initialData?: any;
}

export const EntryModal = ({
  isVisible,
  onClose,
  onSave,
  initialData,
  type,
}: EntryModalProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [formData, setFormData] = useState({
    holderName: "",
    companyName: "",
    vehicleNo: "",
    vehicleClass: "",
    expiryDate: "",
  });
  //load initial data for updates

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        holderName: "",
        companyName: "",
        vehicleNo: "",
        vehicleClass: "",
        expiryDate: "",
      });
    }
  }, [initialData, isVisible]);

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

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    const isCommonValid = !!formData.vehicleNo && !!formData.expiryDate;

    if (!isCommonValid) {
      Alert.alert("Form Error", "Please fill in all fields.", [{ text: "OK" }]);
      return;
    }
    const savedId = await onSave(formData);

    const targetId = initialData?.id || savedId;

    //trigger notifications with the specified type
    if (targetId) {
      const displayName =
        type === "Emission" || type === "Insurance"
          ? formData.companyName
          : formData.holderName;

      await NotificationService.scheduleExpiryNotification(
        targetId,
        displayName,
        formData.expiryDate,
        type
      );
    }

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
        <View className="bg-white p-6 rounded-t-3xl max-h-[60%]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-slate-800">
              {initialData ? "Update" : "New"} {type}
            </Text>
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
              {/* Common field */}

              <TextInput
                className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                placeholder="Vehicle No"
                placeholderTextColor={"#64748b"}
                value={formData.vehicleNo}
                onChangeText={(val) => handleChange("vehicleNo", val)}
              />

              {/*Conditional*/}

              {(type === "License" || type === "Insurance") && (
                <TextInput
                  className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                  placeholder={`${type} Holder's Name`}
                  placeholderTextColor={"#64748b"}
                  value={formData.holderName}
                  onChangeText={(val) => handleChange("holderName", val)}
                />
              )}

              {(type === "Insurance" || type === "Emission") && (
                <TextInput
                  className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                  placeholder={
                    type === "Insurance"
                      ? "Insurance Company Name"
                      : "Testing Center Name"
                  }
                  placeholderTextColor={"#64748b"}
                  value={formData.companyName}
                  onChangeText={(val) => handleChange("companyName", val)}
                />
              )}

              {(type === "Emission" || type === "License") && (
                <TextInput
                  className="bg-slate-100 p-4 rounded-2xl text-lg border border-slate-200 mb-3"
                  placeholder="Vehicle Class"
                  placeholderTextColor={"#64748b"}
                  value={formData.vehicleClass}
                  onChangeText={(val) => handleChange("vehicleClass", val)}
                />
              )}

              {/* Common Date Picker */}

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
              <Text className="text-white text-lg font-bold">
                {initialData ? "Save Changes" : "Add Entry"}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};
