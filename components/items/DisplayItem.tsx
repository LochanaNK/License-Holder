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
    <View className="bg-white p-5 mb-4 rounded-3xl shadow-sm border border-slate-200 flex-row items-center justify-between">
      <View className="flex-1">
        {/* primary name  */}
        <Text className="text-xl font-bold text-sky-600 uppercase tracking-widest mb-1">
          {type === "License" && item.holderName}
          {type === "Insurance" && item.companyName}
          {type === "Emission" && item.companyName}
        </Text>

        {/* secondary name (for insurance only) */}
        {type === "Insurance" && (
          <Text className="text-lg font-bold text-slate-800 mb-1">
            Holder: {item.holderName}
          </Text>
        )}

        {/* 3. shared fields: Vehicle No & Class */}
        <Text className="text-lg font-bold text-slate-800">
          Vehicle No: {item.vehicleNo}
        </Text>

        {item.vehicleClass && (
          <Text className="text-slate-800 font-bold text-lg">
            Vehicle Class: {item.vehicleClass}
          </Text>
        )}

        {/* 4. expiration date */}
        <View className="flex-row items-center mt-3">
          <View className="bg-red-50 px-3 py-1 rounded-xl flex-row items-center border border-red-100">
            <FontAwesome6 name="calendar-xmark" size={12} color="#ef4444" />
            <Text className="text-red-600 text-md font-bold ml-2">
              Exp: {item.expiryDate}
            </Text>
          </View>
        </View>
      </View>

      {/* action buttons */}
      <View className="flex-col gap-y-3 ml-4">
        <TouchableOpacity
          onPress={() => onEdit(item)}
          className="bg-sky-50 p-3 rounded-2xl border border-sky-100"
        >
          <FontAwesome6 name="pencil" size={18} color="#0284c7" />
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
