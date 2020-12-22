// Importar los módulos necesarios
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import {
  Input,
  Container,
  Item,
  H1,
  Button,
  Header,
  Footer,
  Icon,
  Spinner,
  Card,
  CardItem,
  H3,
  Body,
  Fab,
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format } from "date-fns";

const { apiKey, apiImageUrl, apiImageSize } = getEnvVars();

// Obtener los valores por destructuring
const { width, height } = Dimensions.get("window");

// Variable que contiene la pantalla (renderizar)
const MovieListScreen = ({ navigation }) => {
  // Maneja el estado de las películas
  const [movies, setMovies] = useState(null);
  const [geners, setGeners] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(false);

  // Promesas y asincronía
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/funcion_asincrona
  const getMovies = async () => {
    try {
      // Consultar la API de TheMovieDB
      const response = await backend.get(
        `movie/popular?api_key=${apiKey}&language=es-HN&page=1`
      );

      setMovies(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  };

  const getGeners = async () => {
    try {
      // Consultar la API de TheMovieDB
      const response = await backend.get(
        `genre/movie/list?api_key=${apiKey}&language=es-HN&page=1`
      );

      setGeners(response.data);
    } catch (error) {
      // Error al momento de ejecutar la petición a la API
      setError(true);
    }
  };

  // Verifica si el usuario ingresa información en el input de búsqueda
  const handlerSearch = () => {
    if (!search) setSearchError(true);
    else {
      navigation.navigate("movieSearch", { search });
      setSearch("");
      setSearchError(false);
    }
  };

  // Hook de efecto
  useEffect(() => {
    // Efecto secundario realizar la petición a la API
    getMovies();
  }, []);

    // Hook de efecto
    useEffect(() => {
      // Efecto secundario realizar la petición a la API
      getGeners();
    }, []);

  // Remueve el valor de error del input de búsqueda si el usuario ingresa información
  useEffect(() => {
    if (search) setSearchError(false);
  }, [search]);

  // Documentación de Nativebase
  // https://docs.nativebase.io/Components.html
  if (!movies) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner color="#7ae582" />
      </View>
    );
  }
  return (
    <Container>
      <Header searchBar style={styles.header} androidStatusBarColor="#004e64">
        <Item style={{ flex: 3 }}>
          <Input
            placeholder={
              searchError ? "Ingresa un valor de búsqueda" : "Buscar..."
            }
            placeholderTextColor={searchError ? "red" : "gray"}
            value={search}
            onChangeText={setSearch}
          />
           
        </Item>
        <Button onPress={handlerSearch} style={styles.searchButton}>
          <Icon name="search" />
        </Button>

        <Button 
            style={styles.tv}
            onPress={() => {navigation.navigate("tvgners"); }} 
            >
              <Icon name="tv" type="FontAwesome" />
         </Button>
       
      </Header>
      
      <Image
        source={require("../../assets/movieer_logo.png")}
        style={styles.logoApp}
      />
      
      <H1 style={styles.title}>Películas más populares</H1>
      <FlatList
        data={movies.results}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>¡No se han encontrado peliculas!</Text>}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("movieInfo", { id: item.id })
                }
              >
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={{
                        uri: `${apiImageUrl}${apiImageSize}${item.poster_path}`,
                      }}
                      style={styles.movieImage}
                    />
                  </CardItem>
                  <CardItem>
                    <Body style={{ flex: 1, flexDirection: "row" }}>
                      <View>
                        <H3>{item.title}</H3>
                        <Text>
                        {item.release_date}
                        </Text>
                      </View>
                      <View style={styles.voteAverage}>
                        <Icon name="star" style={styles.starIcon} />
                        <Text>{item.vote_average}</Text>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          );
        }}
      />
       
    <Footer style={styles.header}>
      <FlatList
          data={geners.genres}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>¡No se han encontrado geners!</Text>}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                onPress={() =>
                  navigation.navigate("movieGeners", { id: item.id })
                }>
                  <Card style={{backgroundColor:"#2271B3"}}>
                    <Text style={{fontSize:30}}>{item.name}</Text>
                  </Card>
                </TouchableOpacity>
              </View>
            );
          }}
        />
     </Footer>
   
    </Container>
  );
};

// Estilos de nuestra pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
  },
  movieImage: {
    width: width * 0.99,
    height: height * 0.5,
  },
  searchInput: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    marginRight: 15,
  },
  logoApp: {
    width: width,
    height: height * 0.15,
    resizeMode: "contain",
  },
  header: {
    alignContent:"center",
    justifyContent:"center",
    backgroundColor: "#00a5cf",
  },
  searchButton: {
    flex: 1,
    backgroundColor: "#7ae582",
    marginLeft: 10,
    height: 40,
  },
  tv: {
    flex: 1,
    backgroundColor: "#7ae582",
    marginLeft: 5,
    height: 40,
  },
  title: {
    color: "#00a5cf",
    textAlign: "center",
    marginBottom: 5,
  },
  voteAverage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  starIcon: {
    fontSize: 18,
    marginRight: 5,
    color: "#d4af37",
  },
});

export default MovieListScreen;
