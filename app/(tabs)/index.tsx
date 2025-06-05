import images from '@/constants/exportImages';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Index() {


  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoFadeAnim = useRef(new Animated.Value(0)).current;

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
  }, []);


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
          className="w-[90%] h-[45px]"
          resizeMode="contain"
        />
      </Animated.View>

      {/* Main Content */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <Image
          source={images.bike}
          className="w-[200px] h-[200px]"
          resizeMode="contain"
        />
        <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-2xl text-center text-gray-800">
          The campus food delivery app
        </Text>
      </Animated.View>

      {/* Buttons */}
      <View className="flex-1 justify-end pb-12 px-6 gap-4">
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-[#5e17eb] py-4 rounded-2xl shadow-md shadow-purple-500/30"
        >
          <Text style={{ fontFamily: 'Poppins_600SemiBold' }} className="text-white text-lg text-center font-bold">
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          className="py-3 rounded-xl border border-[#5e17eb]"
        >
          <Text style={{ fontFamily: 'Poppins_400Regular' }} className="text-[#5e17eb] text-base text-center font-bold">
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
