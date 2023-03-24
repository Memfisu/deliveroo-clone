import React, {useEffect, useState} from 'react'
import {ScrollView} from 'react-native';
import {CategoryCard} from './CategoryCard';
import SanityClient from '../../sanity';

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    SanityClient.fetch(`
      *[_type == 'category']
    `).then(data => {
      setCategories(data)
    })
  }, [])

  return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
        >
          {categories?.map(item => (
            <CategoryCard
              key={item._id}
              imgUrl={item.image}
              title={item.name}
            />
          ))}
        </ScrollView>
    );
}