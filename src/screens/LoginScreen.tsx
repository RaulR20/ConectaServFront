import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, Image
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/axiosInstance';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';

const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória')
});

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/Auth/login', data);
      const token = response.data.token;

      const usuarioId = response.data.id || response.data.usuario?.id;
      if (!usuarioId) {
        throw new Error('ID do usuário não encontrado no response');
      }

      await AsyncStorage.setItem('usuarioId', usuarioId.toString());
      login(token);

      Alert.alert('Login realizado com sucesso!');
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Erro no login', error.response?.data || 'Não foi possível autenticar');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>ConectaServ</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={theme.colors.placeholder}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={theme.colors.placeholder}
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: theme.spacing.lg
  },
  title: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    color: theme.colors.text
  },
  input: {
    height: 48,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSizes.normal,
    backgroundColor: theme.colors.surface
  },
  error: {
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.xs,
    fontSize: theme.fontSizes.small
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: 8,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg
  },
  buttonText: {
    color: theme.colors.background,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: theme.fontSizes.normal
  },
  registerLink: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: theme.fontSizes.small
  }
});

