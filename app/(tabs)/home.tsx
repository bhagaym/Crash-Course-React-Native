import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import { SearchInput } from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { Video } from "../../models/Video";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useGlobalContext();
  const [data, setData] = useState<Video[]>([]);
  const [latestVideo, setLatestVideo] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    // setIsLoading(true);
    // getAllPosts()
    // .then((response: any) => {
    //     setData(response);
    // })
    // .catch((error: any) => {
    //     Alert.alert('Error', error.message);
    // })
    // .finally(() => {
    //     setIsLoading(false);
    // });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-white h-full pb-10">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id?.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-800">
                  Welcome Back
                </Text>
                <Text className="text-xl font-psemibold">
                  {user?.nama_lengkap}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-psemibold mb-3">Latest Videos</Text>

              <Trending videos={latestVideo ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
