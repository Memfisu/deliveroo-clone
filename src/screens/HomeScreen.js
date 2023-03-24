import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Platform, SafeAreaView, Text, StatusBar, View, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AdjustmentsVerticalIcon, ChevronDownIcon, MagnifyingGlassIcon, UserIcon} from 'react-native-heroicons/outline';
import {Categories} from '../components/Categories';
import {FeaturedRow} from '../components/FeaturedRow';
import SanityClient from '../../sanity';

export const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        SanityClient.fetch(`
            *[_type == 'featured'] {
              ...,
              restaurants[]->{
                ...,
                dishes[]->
              }
            }
        `).then(data => {
            setFeaturedCategories(data)
        });
    }, []);

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className='bg-white pt-5 flex-col'>
            {/* Header */}
            <View className='flex-row pb-3 items-center mx-4 space-x-2'>
                <Image
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                />

                <View className='flex-1'>
                    <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                    <Text className='font-bold text-xl'>
                        Current location
                        <ChevronDownIcon size={20} color='#00CCBB' />
                    </Text>
                </View>

                <UserIcon size={35} color='#00CCBB' />
            </View>

            {/* Search */}
            <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
                    <MagnifyingGlassIcon size={20} color='gray' />
                    <TextInput
                        placeholder='Restaurants and cuisines'
                        keyboardType='default'
                    />
                </View>
                <AdjustmentsVerticalIcon color='#00CCBB' />
            </View>

            {/* Body */}
            <ScrollView
                className='bg-gray-100'
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {/* Categories */}
                <Categories />

                {/* Featured rows */}
                {
                    featuredCategories?.map(item => {
                        return (
                            <FeaturedRow
                                key={item._id}
                                id={item._id}
                                title={item.name}
                                description={item.short_description}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const SafeViewAndroid = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+15 : 5,
    }
});