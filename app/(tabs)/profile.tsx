import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BottomNav from '../../components/ui/bottomNav';

export default function Profile() {
  const [session, setSession] = useState<Session | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        // Fetch user details from profiles table
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching user details:', error);
            } else {
              setUserDetails(data);
            }
          });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const profileOptions = [
    { title: 'Manage Account', icon: 'person-circle-outline' },
    { title: 'Address', icon: 'location-outline' },
    { title: 'Payment', icon: 'card-outline' },
    { title: 'Privacy', icon: 'shield-checkmark-outline' },
    { title: 'MyFitnessPal Sync', icon: 'sync-outline' },
    { title: 'Check Balance', icon: 'wallet-outline' },
  ];

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <ScrollView className="mb-16">
          {/* Profile Header */}
          <View className="bg-white px-6 pt-8 pb-6 border-b border-gray-200 items-center">
            <Text className="text-xl font-bold text-black">
              {userDetails?.full_name || session?.user?.email?.split('@')[0] || 'User'}
            </Text>
            <Text className="text-sm text-purple-600">
              {userDetails?.university || 'University not set'}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {session?.user?.email}
            </Text>
          </View>

          {/* Options List */}
          <View className="bg-white mt-4">
            {profileOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200"
              >
                <View className="flex-row items-center">
                  <Ionicons name={option.icon as any} size={22} color="#333" />
                  <Text className="ml-3 text-base text-gray-800">{option.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}

            {/* Sign Out Button */}
            <TouchableOpacity
              onPress={handleSignOut}
              className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200"
            >
              <View className="flex-row items-center">
                <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                <Text className="ml-3 text-base text-red-500">Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}
