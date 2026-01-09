import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

type EntryType = "License" | "Insurance" | "Emission";

interface DisplayItemProps {
  item: {
    id:number;
    holderName: string;
    companyName: string;
    vehicleNo: string;
    vehicleClass: string;
    expiryDate: string;
  };
  type: EntryType;
  onEdit: (item: any) => void;
  onDelete: () => void;
}

export const DisplayItem = ({
  item,
  type,
  onEdit,
  onDelete,
}: DisplayItemProps) => {
  return (
    <View className="bg-white p-5 mb-4 rounded-3xl shadow-sm border border-slate-100 flex-row items-center justify-between">
      <View className="flex-1">
        {/* 1. PRIMARY NAME LOGIC */}
        <Text className="text-xl font-bold text-sky-600 uppercase tracking-widest mb-1">
          {type === "License" && item.holderName}
          {type === "Insurance" && item.companyName}
          {type === "Emission" && item.companyName}
        </Text>

        {/* 2. SECONDARY NAME (For Insurance only) */}
        {type === "Insurance" && (
          <Text className="text-md font-medium text-slate-500 mb-1">
            Holder: {item.holderName}
          </Text>
        )}

        {/* 3. SHARED FIELDS: Vehicle No & Class */}
        <Text className="text-lg font-bold text-slate-800">
          {item.vehicleNo}
        </Text>

        {item.vehicleClass && (
          <Text className="text-slate-600 font-medium">
            Class: {item.vehicleClass}
          </Text>
        )}

        {/* 4. EXPIRATION DATE */}
        <View className="flex-row items-center mt-3">
          <View className="bg-red-50 px-3 py-1 rounded-xl flex-row items-center border border-red-100">
            <FontAwesome6 name="calendar-xmark" size={12} color="#ef4444" />
            <Text className="text-red-600 text-sm font-bold ml-2">
              Exp: {item.expiryDate}
            </Text>
          </View>
        </View>
      </View>

      {/* ACTION BUTTONS */}
      <View className="flex-col gap-y-3 ml-4">
        <TouchableOpacity
          onPress={() => onEdit(item)}
          className="bg-slate-50 p-3 rounded-2xl border border-slate-100"
        >
          <FontAwesome6 name="pencil" size={18} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          className="bg-red-50 p-3 rounded-2xl border border-red-100"
        >
          <FontAwesome6 name="trash-can" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
