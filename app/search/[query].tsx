import { View, Text, SafeAreaView, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchInput } from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { getSearchPost } from '../../lib/appwrite'
import { Video } from '../../models/Video'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const [data, setData] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true);
    getSearchPost(query?.toString())
    .then((response: any) => {
        setData(response);
    })
    .catch((error: any) => {
        Alert.alert('Error', error.message);
    })
    .finally(() => {
        setIsLoading(false);
    });
  }

  useEffect(() => {
      fetchData();
  }, [query]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data= { data } 
        keyExtractor={(item) => item.$id?.toString()}
        renderItem={({item}) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>Serach Results</Text>
            <Text className='text-2xl font-psemibold text-white'>{query?.toString()}</Text>
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query?.toString()} />
            </View>
          </View>

        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
        )}
      />

    </SafeAreaView>
  )
}

export default Search