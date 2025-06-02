import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EscolherPlanoScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleSelecionarPlano = async (plano: string) => {
    try {
      const usuarioId = await AsyncStorage.getItem('usuarioId');
      if (!usuarioId) {
        alert('Você precisa estar logado para escolher um plano.');
        navigation.navigate('Login');
        return;
      }

      await AsyncStorage.setItem(`assinatura_${usuarioId}`, plano);

      alert(`Plano "${plano}" armazenado com sucesso!`);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      alert('Erro ao salvar o plano. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Escolha um Plano de Assinatura</Text>

      <TouchableOpacity
        style={[styles.planoCard, { backgroundColor: '#C6FF00' }]}
        onPress={() => handleSelecionarPlano('Mensal – R$ 14,90')}
      >
        <Text style={styles.nomePlano}>Mensal</Text>
        <Text style={styles.valorPlano}>R$ 14,90</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.planoCard, { backgroundColor: '#FFDD00' }]}
        onPress={() => handleSelecionarPlano('Trimestral – R$ 39,90')}
      >
        <Text style={styles.nomePlano}>Trimestral</Text>
        <Text style={styles.valorPlano}>R$ 39,90</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.planoCard, { backgroundColor: '#0099FF' }]}
        onPress={() => handleSelecionarPlano('Anual – R$ 99,90')}
      >
        <Text style={styles.nomePlano}>Anual</Text>
        <Text style={styles.valorPlano}>R$ 99,90</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001F3F',
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    color: '#C6FF00',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  planoCard: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  nomePlano: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001F3F',
    marginBottom: 8,
  },
  valorPlano: {
    fontSize: 16,
    color: '#001F3F',
  },
});

