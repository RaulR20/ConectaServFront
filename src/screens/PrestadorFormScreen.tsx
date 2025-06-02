// web/src/screens/PrestadorFormScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import api from '../services/axiosInstance';

export default function PrestadorFormScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cidade, setCidade] = useState('');
  const [preco, setPreco] = useState('');
  const [usuarioId, setUsuarioId] = useState(''); // Preparado para integração futura

  const handleCadastro = async () => {
    try {
      const payload = {
        usuarioId: parseInt(usuarioId),
        cpf,
        categoria,
        descricao,
        cidade,
        preco: preco.toLowerCase().includes('sob') ? null : preco,
        precoSobConsulta: preco.toLowerCase().includes('sob')
      };

      const response = await api.post('/Prestador/cadastrar', payload);

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Prestador cadastrado com sucesso!');
        navigation.navigate('EnderecoForm'); // redireciona para tela de endereço
      }
    } catch (error: any) {
      console.error('Erro ao cadastrar prestador:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o prestador.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastro de Prestador</Text>

      <TextInput
        style={styles.input}
        placeholder="ID do Usuário"
        value={usuarioId}
        onChangeText={setUsuarioId}
        placeholderTextColor={theme.colors.placeholder}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        placeholderTextColor={theme.colors.placeholder}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria de serviço"
        value={categoria}
        onChangeText={setCategoria}
        placeholderTextColor={theme.colors.placeholder}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição dos serviços"
        value={descricao}
        onChangeText={setDescricao}
        placeholderTextColor={theme.colors.placeholder}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
        placeholderTextColor={theme.colors.placeholder}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço (ou escreva 'sob consulta')"
        value={preco}
        onChangeText={setPreco}
        placeholderTextColor={theme.colors.placeholder}
      />

      <Pressable style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    flex: 1
  },
  title: {
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md
  },
  input: {
    height: 44,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: theme.spacing.sm
  },
  buttonText: {
    color: theme.colors.background,
    fontWeight: 'bold'
  },
  cancelButton: {
    marginTop: theme.spacing.sm,
    alignItems: 'center'
  },
  cancelText: {
    color: theme.colors.primary
  }
});

