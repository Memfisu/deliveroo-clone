import React, {useEffect, useState} from 'react'
import {ScrollView, Text, View} from 'react-native';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import {RestaurantCard} from '../components/RestaurantCard';
import SanityClient from '../../sanity';

export const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    SanityClient.fetch(`
      *[_type == 'featured' && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type -> {
            name
           }
        }
      }[0]
    `, { id }).then(data => setRestaurants(data?.restaurants))
  }, [])

    return (
        <View>
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <ArrowRightIcon color='#00CCBB' />
            </View>

            <Text className='text-xs text-gray-500 px-4'>{description}</Text>

            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
              {restaurants?.map(item => (
                <RestaurantCard
                  key={item._id}
                  id={item._id}
                  imgUrl={item.image}
                  title={item.name}
                  rating={item.rating}
                  genre={item.type?.name}
                  address={item.address}
                  short_description={item.short_description}
                  dishes={item.dishes}
                  long={item.long}
                  lat={item.lat}
                />
              ))}
            </ScrollView>
        </View>
    )
}