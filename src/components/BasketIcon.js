import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useSelector} from 'react-redux'
import {selectBasketItems, selectBasketTotal} from '../features/basketSlice'
import {useNavigation} from '@react-navigation/native'
import Currency from 'react-currency-formatter'

export const BasketIcon = () => {
  const items = useSelector(selectBasketItems)
  const total = useSelector(selectBasketTotal)
  const navigation = useNavigation()

  if (!items.length) {
    return null
  }

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        className='mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1'
        onPress={() => navigation.navigate('Basket')}
      >
        <Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>
          {items.length}
        </Text>
        <Text className='text-white font-extrabold flex-1 text-lg text-center'>
          View Basket
        </Text>
        <Text className='text-lg text-white font-extrabold'>
          <Currency quantity={total} currency='GBP' />
        </Text>
      </TouchableOpacity>
    </View>
  )
}