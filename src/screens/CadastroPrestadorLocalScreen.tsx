import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  ScrollView, Alert, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CadastroPrestadorLocalScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    nome: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    cep: '',
    nomeEmpresa: '',
    razaoSocial: '',
    cnpj: '',
    nomeServico: '',
    descricaoServico: '',
    preco: '',
    precoSobConsulta: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSalvar = async () => {
    if (!formData.nome || !formData.nomeServico || !formData.cep) {
      Alert.alert('Campos obrigatórios', 'Nome, serviço e CEP são obrigatórios.');
      return;
    }

    const novoPrestador = {
      nome: formData.nomeEmpresa || formData.nome,
      categoria: formData.nomeServico,
      preco: formData.precoSobConsulta ? 'Sob consulta' : `R$ ${formData.preco}`,
      cidade: formData.cidade,
      descricao: formData.descricaoServico,
      cep: formData.cep,
      imagemUrl: '',
      // Dados da empresa armazenados, mas não usados na exibição
      nomeEmpresa: formData.nomeEmpresa,
      razaoSocial: formData.razaoSocial,
      cnpj: formData.cnpj,
    };

    try {
      const dadosExistentes = await AsyncStorage.getItem('prestadoresLocais');
      const lista = dadosExistentes ? JSON.parse(dadosExistentes) : [];
      lista.push(novoPrestador);
      await AsyncStorage.setItem('prestadoresLocais', JSON.stringify(lista));
      Alert.alert('Sucesso', 'Prestador cadastrado localmente!');
      navigation.navigate('EscolherPlanoScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>← Voltar para a Home</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Cadastro de Prestador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Prestador"
        placeholderTextColor="#999"
        onChangeText={value => handleChange('nome', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (ex: Eletricista)"
        placeholderTextColor="#999"
        onChangeText={value => handleChange('nomeServico', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP (ex: 01234-567)"
        placeholderTextColor="#999"
        onChangeText={value => handleChange('cep', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        placeholderTextColor="#999"
        onChangeText={value => handleChange('cidade', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome da Empresa (opcional)"
        placeholderTextColor="#999"
        onChangeText={value => handleChange('nomeEmpresa', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Razão Social (opcional)"
        placeholderTextColor="#999"
        onChangeText={value => handleChange('razaoSocial', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="CNPJ (opcional)"
        placeholderTextColor="#999"
        onChangeText={value => handleChange('cnpj', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descrição do serviço"
        placeholderTextColor="#999"
        multiline
        onChangeText={value => handleChange('descricaoServico', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço médio (ex: 150)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        onChangeText={value => handleChange('preco', value)}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
        <Text style={styles.textoBotaoSalvar}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001F3F',
    padding: 20,
    flex: 1,
  },
  voltar: {
    color: '#00FF88',
    fontSize: 16,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
    color: '#C6FF00',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#0A0A23',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#C6FF00',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  botaoSalvar: {
    backgroundColor: '#C6FF00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoSalvar: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

