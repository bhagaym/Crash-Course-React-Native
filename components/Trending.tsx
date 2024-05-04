import { FlatList, TouchableOpacity, ImageBackground, Image, ViewToken } from 'react-native'
import React, { FC, useState } from 'react'
import { Video } from '../models/Video'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { ResizeMode, Video as VideoPlayer } from 'expo-av'

const zoomIn = {
  0: {
    opacity: 1,
    scale: 0.9,
  },
  1: {
    opacity: 1,
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 1,
    scale: 0.9,
  },
};

type TrendingItemProps = {
  activeItem: string,
  item: Video
}

const TrendingItem: FC<TrendingItemProps> = ({ activeItem, item}) => {
  const [play, setPlay] = useState(false)

  return (
    <Animatable.View className='mr-5' animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {play ? (
        <VideoPlayer source={{ uri: (item.video ?? '')}} className='w-52 h-72 rounded-[35px] mt-3 bg-white/10' resizeMode={ResizeMode.CONTAIN} useNativeControls shouldPlay onPlaybackStatusUpdate={(status) => {
            setPlay(false);
        }} />
      ) : (
        <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground source={{ uri: item.thumbnail }} className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40' resizeMode='cover' />
        
          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}


const Trending: FC<{ videos: Video[] }> = ({ videos }) => {
  const [activeItem, setActiveItem] = useState((videos.length > 0 ? videos[0].$id : ''))
  
  const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  }

  return (
    <FlatList 
        data={videos}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({item}) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{ x: 170, y: 170 }}
        horizontal
    />
  )
}

export default Trending