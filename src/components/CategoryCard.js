import React from 'react'
import {TouchableOpacity, Text, Image} from 'react-native';
import {urlFor} from '../../sanity'

export const CategoryCard = ({ imgUrl, title }) => {
    return (
        <TouchableOpacity className='mr-2 relative'>
            <Image
                source={{
                    uri: urlFor(imgUrl).width(200).url()
                }}
                className='h-20 w-20 rounded'
            />
            <Text className='absolute bottom-1 left-1 text-black font-bold bg-white p-1 rounded'>{title}</Text>
        </TouchableOpacity>
    )
}