import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { theme } from '../styles/theme';
import api from '../services/axiosInstance';

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      return Alert.alert('Erro', 'As senhas não coincidem.');
    }

    try {
      const response = await api.post('/Auth/registrar', {
        nome,
        email,
        senha,
        cpf,
        celular,
        telefone
      });

      if (response.status !== 200) {
        const mensagem = response.data?.mensagem || 'Erro desconhecido.';
        return Alert.alert('Erro no cadastro', mensagem);
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error: any) {
      Alert.alert('Erro no cadastro', error.response?.data || 'Não foi possível registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Criar conta</Text>

      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor={theme.colors.placeholder} value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor={theme.colors.placeholder} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="CPF" placeholderTextColor={theme.colors.placeholder} value={cpf} onChangeText={setCpf} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Celular" placeholderTextColor={theme.colors.placeholder} value={celular} onChangeText={setCelular} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor={theme.colors.placeholder} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor={theme.colors.placeholder} secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor={theme.colors.placeholder} secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Já tem uma conta? Entrar</Text>
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
    width: 120,
    height: 120,
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
  loginLink: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: theme.fontSizes.small
  }
});

