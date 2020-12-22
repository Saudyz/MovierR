import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import {
  Content,
  Text,
  H1,
  Spinner,
  Card,
  H2,
  View,
  Badge,
  Container,
  H3,
} from "native-base";
import { Rating } from "react-native-ratings";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";


const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const tvInfoScreen = ({ route, navigation }) => {
  // Obtener el id de la película
  const { id } = route.params;
  const [tv, settv] = useState(null);
  const [error, setError] = useState(false);

  // Obtener la información de la película
  const gettvInfo = async () => {
    try {
      const response = await backend.get(
        `${apiUrl}tv/${id}?api_key=${apiKey}&language=es-MX`
      );

      settv(response.data);
    } catch (error) {
      setError(true);
    }
  };

  // Efecto secundario que ejecuta la consulta a la API
  useEffect(() => {
    gettvInfo();
  }, []);

  if (!tv) {
    return (
      <Content>
        <Spinner />
      </Content>
    );
  }

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <Image
          source={{ uri: `${apiImageUrl}${apiImageSize}/${tv.backdrop_path}` }}
          style={styles.tvPoster}
        />

        <Card cardBody style={styles.card}>
          <H1 style={styles.title}>{tv.name}</H1>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tvdetailsValues}>
                {tv.vote_average}
              </Text>
              <Rating
                showRating={false}
                ratingCount={10}
                startingValue={tv.vote_average}
                readonly={true}
                imageSize={11}
                style={{ marginTop: 3 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tvdetailsValues}>{tv.origin_country}</Text>
              <Text style={styles.tvdetails}>Origen</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.tvDetailsValues}>
                {tv.first_air_date}
              </Text>
              <Text style={styles.tvDetails}>Lanzamiento</Text>
            </View>
          </View>
          <H2 style={styles.h2}>Géneros</H2>
          <View style={styles.genresView}>
            {tv.genres.map((genre) => (
              <Badge key={genre.id} style={styles.genres}>
                <Text>{genre.name}</Text>
              </Badge>
            ))}
          </View>
          <H2 style={styles.h2}>Trama</H2>
          <Text>{tv.overview ? tv.overview : "No disponible"}</Text>
          <H3  style={styles.h3}>Lenguaje</H3>
          <Text>{tv.original_language}</Text>
          
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  tvPoster: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    marginTop: 5,
  },
  content: {
    // backgroundColor: "#ffffff",
  },
  overview: {
    color: "#00a5cf",
  },
  card: {
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    borderRadius: 10,
    marginTop: -height * 0.2,
  },
  tvdetails: {
    textAlign: "center",
    fontSize: 12,
  },
  tvdetailsValues: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  genres: {
    backgroundColor: "#7ae582",
    marginRight: 5,
    marginBottom: 5,
  },
  genresView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  h2: {
    marginTop: 10,
    marginBottom: 10,
  },
  h3: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default tvInfoScreen;
