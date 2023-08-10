import React from 'react'
import {Text, ScrollView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { ScreenParamTypes } from '../App'

const RawJson = () => {
  const { params: { data } } = useRoute<RouteProp<ScreenParamTypes, 'RawJsonScreen'>>()
  return (
    <ScrollView>
      <Text>{JSON.stringify(data,null,2)}</Text>
    </ScrollView>
  )
}

export default RawJson