import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Prestador {
  nome: string;
  categoria: string;
  preco: string;
  descricao: string;
  cidade: string;
  cep: string;
}

const GOOGLE_API_KEY = 'AIzaSyAD9Ew8sTNokjUQg2oX0v0IKHHySAZS_dw';

export default function PrestadorDetalhesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { prestador } = route.params as { prestador: Prestador };

  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const buscarCoordenadasPorCEP = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(prestador.cep)}&key=${GOOGLE_API_KEY}`
        );

        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCoordenadas({ lat: location.lat, lng: location.lng });
        }
      } catch (error) {
        console.error('Erro ao buscar coordenadas:', error);
      }
    };

    if (prestador.cep) {
      buscarCoordenadasPorCEP();
    }
  }, [prestador]);

  if (!prestador) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>Prestador não encontrado</Text>
      </View>
    );
  }

  const handleContato = () => {
    const numeroWhatsApp = '5511999999999'; // número de exemplo
    const mensagem = `Olá, vi seu anúncio no ConectaServ e gostaria de saber mais sobre o serviço de ${prestador.categoria}.`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      // para mobile (futuramente com expo-linking)
      console.log('Abrir WhatsApp no mobile');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>← Voltar para a Home</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>{prestador.nome}</Text>

      <Text style={styles.label}>Categoria:</Text>
      <Text style={styles.valor}>{prestador.categoria}</Text>

      <Text style={styles.label}>Cidade:</Text>
      <Text style={styles.valor}>{prestador.cidade}</Text>

      <Text style={styles.label}>Preço:</Text>
      <Text style={styles.valor}>{prestador.preco}</Text>

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.valor}>{prestador.descricao}</Text>

      <Text style={styles.label}>Localização aproximada:</Text>

      {Platform.OS === 'web' && coordenadas ? (
        <View style={styles.mapaContainer}>
          <iframe
            src={`https://www.google.com/maps?q=${coordenadas.lat},${coordenadas.lng}&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Mapa Prestador"
          />
        </View>
      ) : (
        <Text style={styles.valor}>Carregando mapa ou indisponível neste dispositivo</Text>
      )}

      <TouchableOpacity style={styles.botaoContato} onPress={handleContato}>
        <Text style={styles.textoBotaoContato}>Entrar em Contato</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001F3F',
    flex: 1,
    padding: 20,
  },
  voltar: {
    color: '#00FF88',
    fontSize: 16,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    color: '#C6FF00',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#C6FF00',
    fontWeight: 'bold',
    marginTop: 10,
  },
  valor: {
    color: '#fff',
    fontSize: 16,
  },
  erro: {
    color: '#fff',
    fontSize: 18,
    padding: 20,
    textAlign: 'center',
  },
  mapaContainer: {
    height: 200,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#C6FF00',
    borderWidth: 1,
  },
  botaoContato: {
    backgroundColor: '#C6FF00',
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoContato: {
    color: '#001F3F',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

