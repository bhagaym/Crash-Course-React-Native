import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../constants'
import { SearchInput } from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestVideo } from '../../lib/appwrite'
import { Video } from '../../models/Video'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const [data, setData] = useState<Video[]>([])
  const [latestVideo, setLatestVideo] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    setIsLoading(true);
    getAllPosts()
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

  
  const fetchLatestVideo = async () => {
    getLatestVideo()
    .then((response: any) => {
        setLatestVideo(response);
    })
    .catch((error: any) => {
        Alert.alert('Error', error.message);
    });
  }

  useEffect(() => {
      fetchData();
      fetchLatestVideo();
  }, []);


  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data= { data } 
        keyExtractor={(item) => item.$id?.toString()}
        renderItem={({item}) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
                <Text className='text-2xl font-psemibold text-white'>{user?.username}</Text>
              </View>

              <View className='mt-1.5'>
                <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>
            
              <Trending videos={latestVideo ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

    </SafeAreaView>
  )
}

export default Home