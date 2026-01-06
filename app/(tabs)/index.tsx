import { useState } from 'react';
import {View,ScrollView,Text,TouchableOpacity} from 'react-native';
import {FontAwesome6} from '@expo/vector-icons';
import { AddModal } from '@/components/AddModal';

export default function Home(){

  const [modalVisible, setModalVisible] = useState(false);

  return(
    <View className='flex-1 relative m-3'>
      <ScrollView className='flex-1'>
      </ScrollView>
      <TouchableOpacity 
        onPress={()=>setModalVisible(true)}
        activeOpacity={0.8}
        className='absolute bottom-2 right-2 flex-row items-center gap-2 bg-sky-500 p-4 rounded-xl shadow-lg elevation-5'
      >
        <FontAwesome6 name='add' size={24} color='white'/>
        <Text className='text-xl font-semibold text-white'>
          Add
        </Text>
      </TouchableOpacity>
      <AddModal
        isVisible={modalVisible}
        onClose={()=>setModalVisible(false)}
      />
    </View>
  )
}