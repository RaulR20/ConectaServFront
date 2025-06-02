import React from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';

export default function EnderecoFormScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastro de Endereço</Text>

      <TextInput style={styles.input} placeholder="Estado" placeholderTextColor={theme.colors.placeholder} />
      <TextInput style={styles.input} placeholder="Cidade" placeholderTextColor={theme.colors.placeholder} />
      <TextInput style={styles.input} placeholder="Bairro" placeholderTextColor={theme.colors.placeholder} />
      <TextInput style={styles.input} placeholder="Rua" placeholderTextColor={theme.colors.placeholder} />
      <TextInput style={styles.input} placeholder="Número" placeholderTextColor={theme.colors.placeholder} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="CEP" placeholderTextColor={theme.colors.placeholder} />
      <TextInput style={styles.input} placeholder="Latitude (automático no futuro)" placeholderTextColor={theme.colors.placeholder} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Longitude (automático no futuro)" placeholderTextColor={theme.colors.placeholder} keyboardType="numeric" />

      <Pressable style={styles.button} onPress={() => alert('Endereço salvo!')}>
        <Text style={styles.buttonText}>SALVAR ENDEREÇO</Text>
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

