import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PrestadorLocal {
  nome: string;
  categoria: string;
  preco: string;
  cidade: string;
  descricao: string;
  cep: string;
  imagemUrl?: string;
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [prestadoresLocais, setPrestadoresLocais] = useState<PrestadorLocal[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [planoUsuario, setPlanoUsuario] = useState<string | null>(null);

  const loadPrestadoresLocais = async () => {
    try {
      const dados = await AsyncStorage.getItem('prestadoresLocais');
      if (dados) {
        const lista: PrestadorLocal[] = JSON.parse(dados);
        setPrestadoresLocais(lista);
      }
    } catch (error) {
      console.error('Erro ao carregar prestadores locais:', error);
    }
  };

  const carregarPlanoUsuario = async () => {
    try {
      const usuarioId = await AsyncStorage.getItem('usuarioId');
      if (usuarioId) {
        const plano = await AsyncStorage.getItem(`assinatura_${usuarioId}`);
        setPlanoUsuario(plano);
      }
    } catch (error) {
      console.error('Erro ao carregar plano do usuário:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPrestadoresLocais();
    });
    return unsubscribe;
  }, [navigation]);

  const toggleFavorito = (item: PrestadorLocal) => {
    const id = `${item.nome}-${item.categoria}`;
    const jaFavorito = favoritos.includes(id);

    const novaLista = [...prestadoresLocais];
    const index = novaLista.findIndex(p =>
      p.nome === item.nome && p.categoria === item.categoria
    );

    if (index === -1) return;

    novaLista.splice(index, 1);

    if (jaFavorito) {
      setFavoritos(favoritos.filter(f => f !== id));
      novaLista.push(item);
    } else {
      setFavoritos([...favoritos, id]);
      novaLista.unshift(item);
    }

    setPrestadoresLocais(novaLista);
  };

  const isFavorito = (item: PrestadorLocal) =>
    favoritos.includes(`${item.nome}-${item.categoria}`);

  const excluirPrestador = async (index: number) => {
    const novaLista = [...prestadoresLocais];
    novaLista.splice(index, 1);
    setPrestadoresLocais(novaLista);

    try {
      await AsyncStorage.setItem('prestadoresLocais', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao excluir prestador:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Prestadores</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CadastroPrestadorLocalScreen')}
          style={styles.botaoCadastrar}
        >
          <Text style={styles.textoBotaoCadastrar}>Tornar-se Prestador</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={async () => {
            await carregarPlanoUsuario();
            setMenuVisible(true);
          }}
        >
          <Ionicons name="person-circle-outline" size={34} color="#00FF88" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardGrid}>
        {prestadoresLocais.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              onPress={() => toggleFavorito(item)}
              style={styles.favoritoIcon}
            >
              <Ionicons
                name={isFavorito(item) ? 'heart' : 'heart-outline'}
                size={22}
                color="#C6FF00"
              />
            </TouchableOpacity>

            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.categoria}>{item.categoria}</Text>
            <Text style={styles.preco}>{item.preco}</Text>

            <TouchableOpacity
              style={styles.botaoDetalhes}
              onPress={() => navigation.navigate('PrestadorDetalhesScreen', { prestador: item })}
            >
              <Text style={styles.textoBotaoDetalhes}>Ver Detalhes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirPrestador(index)}
            >
              <Text style={styles.textoBotaoExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Modal lateral direito */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.overlayRight}>
          <View style={styles.menuRight}>
            <Text style={styles.menuTitle}>Configurações</Text>
            {planoUsuario ? (
              <Text style={styles.menuPlano}>Plano Assinado: {planoUsuario}</Text>
            ) : (
              <Text style={styles.menuPlano}>Nenhum plano encontrado.</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.touchCloseArea}
            onPress={() => setMenuVisible(false)}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001F3F',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
    position: 'relative',
  },
  titulo: {
    color: '#00FF88',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  botaoCadastrar: {
    backgroundColor: '#C6FF00',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  textoBotaoCadastrar: {
    color: '#001F3F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
  },
  card: {
    backgroundColor: '#0A0A23',
    width: '48%',
    borderRadius: 10,
    padding: 12,
    position: 'relative',
  },
  favoritoIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoria: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 2,
  },
  preco: {
    color: '#C6FF00',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botaoDetalhes: {
    backgroundColor: '#C6FF00',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  textoBotaoDetalhes: {
    color: '#001F3F',
    fontWeight: 'bold',
  },
  botaoExcluir: {
    backgroundColor: '#ff4d4d',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotaoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Modal lateral
  overlayRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  menuRight: {
    backgroundColor: '#fff',
    width: '70%',
    height: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 8,
  },
  touchCloseArea: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#001F3F',
  },
  menuPlano: {
    fontSize: 14,
    color: '#001F3F',
    fontStyle: 'italic',
  },
});

