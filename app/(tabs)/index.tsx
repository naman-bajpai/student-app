import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  Animated,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import images from '@/constants/exportImages';

const { width, height } = Dimensions.get('window');

interface Card {
  id: string;
  text: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoFadeAnim = useRef(new Animated.Value(0)).current;

  const cards: Card[] = [
    {
      id: '1',
      text: 'Boost Sales',
      description: 'Increase your sales by offering exclusive deals to students.',
      icon: 'cash-outline',
    },
    {
      id: '2',
      text: 'Reach Students',
      description: 'Connect with thousands of students daily by joining our vendor network.',
      icon: 'megaphone-outline',
    },
    {
      id: '3',
      text: 'Flexible Partnerships',
      description: 'Partner with us and enjoy customizable plans tailored to your needs.',
      icon: 'restaurant-outline',
    },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoFadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % cards.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleLogin = () => {
    router.push('/log-in');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Logo Section */}
      <Animated.View
        style={{
          opacity: logoFadeAnim,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: Platform.OS === 'ios' ? 20 : 40,
          paddingBottom: 20,
          height: height * 0.15,
        }}
      >
        <Image
          source={images.logo_transparent_cropped}
          className="w-[75%] h-[30px]"
          resizeMode="contain"
        />
      </Animated.View>

      {/* Buttons */}
      <View className="flex-1 justify-end pb-12 px-6 gap-4">
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-[#5e17eb] py-4 rounded-2xl shadow-md shadow-purple-500/30"
        >
          <Text className="text-white text-lg font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          className="py-3 rounded-xl border border-[#5e17eb]"
        >
          <Text className="text-[#5e17eb] text-base text-center font-medium">Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
