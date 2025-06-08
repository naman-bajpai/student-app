import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';

type Tab = {
  name: string;
  icon: 'home' | 'pricetag' | 'receipt' | 'search' | 'person';
  route: string;
};

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: Tab[] = [
    { name: 'Home', icon: 'home', route: '/(tabs)/home' },
    { name: 'Offers', icon: 'pricetag', route: '/(tabs)/offers' },
    { name: 'Orders', icon: 'receipt', route: '/(tabs)/orders' },
    { name: 'Browse', icon: 'search', route: '/(tabs)/browse' },
    { name: 'Profile', icon: 'person', route: '/(tabs)/profile' },
  ];

  return (
    <View className="flex-row h-16 bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0 z-50">
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;

        const iconName = isActive
          ? tab.icon
          : (tab.icon + '-outline') as keyof typeof Ionicons.glyphMap;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.route as any)}
            className="flex-1 justify-center items-center"
          >
            <View
              className={`w-12 h-12 rounded-2xl justify-center items-center ${
                isActive
                  ? 'bg-purple-100 shadow-md shadow-purple-300'
                  : 'bg-neutral-100'
              }`}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isActive ? '#6B4EFF' : '#1e1e1e'}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
