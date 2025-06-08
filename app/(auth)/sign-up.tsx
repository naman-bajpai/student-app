import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignupScreen = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    university: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignup = async () => {
    const { firstName, lastName, university, email, password, confirmPassword } = form;

    if (!firstName || !lastName || !university || !email || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            university,
          },
        },
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      alert('Account created! Please verify your email before logging in.');
      router.push('/log-in');
    } catch (err) {
      console.error('Signup error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/log-in');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#E5E7EB" />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={24} color="#1F2937" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={require('@/assets/images/studeliver-cropped.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Inputs except university */}
          {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map((field, index) => (
            <TextInput
              key={index}
              style={[
                styles.input,
                styles.fontRegular,
                focusedInput === field && styles.inputFocused
              ]}
              placeholder={field.replace(/([A-Z])/g, ' $1').toLowerCase()}
              placeholderTextColor="#9CA3AF"
              secureTextEntry={field.toLowerCase().includes('password')}
              autoCapitalize="none"
              autoCorrect={false}
              value={form[field as keyof typeof form]}
              onChangeText={(text) => handleInputChange(field, text)}
              onFocus={() => setFocusedInput(field)}
              onBlur={() => setFocusedInput(null)}
            />
          ))}

          {/* University dropdown */}
          <View
            style={[
              styles.input,
              focusedInput === 'university' && styles.inputFocused,
              { paddingHorizontal: 0, paddingVertical: 0 }
            ]}
          >
            <Picker
              selectedValue={form.university}
              onValueChange={(itemValue) => handleInputChange('university', itemValue)}
              onFocus={() => setFocusedInput('university')}
              onBlur={() => setFocusedInput(null)}
              dropdownIconColor="#9CA3AF"
              style={{
                color: form.university ? '#1F2937' : '#9CA3AF',
                width: '100%',
                height: 48,
                paddingHorizontal: 20,
                margin: 0,
                ...Platform.select({
                  ios: {
                    marginTop: -8,
                  },
                  android: {
                    marginTop: -8,
                  }
                })
              }}
              prompt="Select your university"
            >
              <Picker.Item label="Select your university" value="" color="#9CA3AF" />
              <Picker.Item label="Florida State University" value="Florida State University" color="#1F2937" />
              <Picker.Item label="University of Florida" value="University of Florida" color="#1F2937" />
            </Picker>
          </View>

          {/* Signup Button */}
          <TouchableOpacity
            style={[styles.signupButton, loading && styles.signupButtonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={[styles.signupButtonText, styles.fontSemiBold]}>
              {loading ? 'Creating Account...' : 'create account'}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.loginRedirect}>
            <Text style={[styles.loginText, styles.fontRegular]}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLoginRedirect}>
              <Text style={[styles.loginLink, styles.fontSemiBold]}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Changed from #E5E7EB to match login
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 120,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20, // Changed from 16 to match login
    paddingVertical: 16, // Changed from 14 to match login
    fontSize: 16,
    color: '#1F2937', // Changed from #111827 to match login
    marginBottom: 16, // Changed from 12 to match login
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#5E17EA',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    color: '#5E17EA',
    fontWeight: '600',
    marginLeft: 4,
  },
  fontRegular: {
    fontFamily: 'Montserrat_400Regular',
  },
  fontSemiBold: {
    fontFamily: 'Montserrat_600SemiBold',
  },
  inputFocused: {
    backgroundColor: '#F3E8FF',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  signupButtonDisabled: {
    opacity: 0.7,
  },
});

export default SignupScreen;
