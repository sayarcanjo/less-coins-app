import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { supabase } from '../Services/supabaseClient'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Erro no Login', error.message);
    } else {
      navigation.replace('Main');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/minha-logo.png')}
      />
      <Text h2 style={styles.title}>Less Coins</Text>
      <Text style={styles.subtitle}>Controle seus gastos diários</Text>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="envelope" size={20} color="gray" />}
        value={email}
        onChangeText={setEmail}
        containerStyle={{ marginBottom: 15 }}
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        leftIcon={<Icon name="lock" size={24} color="gray" />}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={{ marginBottom: 15 }}
      />
      <Button
        title={loading ? 'Entrando...' : 'Entrar'}
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        radius={"lg"}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, },
  logo: { width: 150, height: 150, alignSelf: 'center', marginBottom: 20, },
  title: { textAlign: 'center', color: '#4CAF50', marginBottom: 10, fontSize: 40, fontWeight: 'bold' },
  subtitle: { textAlign: 'center', marginBottom: 30, fontSize: 16, color: '#666', },
  button: { marginTop: 10, paddingVertical: 12, backgroundColor: '#4CAF50', },
  buttonTitle: { fontSize: 18, },
});


export default LoginScreen;