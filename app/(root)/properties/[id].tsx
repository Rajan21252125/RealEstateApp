import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const PropertyDetail = () => {
 const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>PropertyDetail {id}</Text>
    </View>
  )
}

export default PropertyDetail