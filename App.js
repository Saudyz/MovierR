import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import MovieSearchResultsScreen from "./src/screens/MovieSearchResultsScreen";
import MovieInfoScreen from "./src/screens/MovieInfoScreen";
import MovieGenersScreen from "./src/screens/MovieGenersScreen"
import tvListScreen from "./src/screens/tvListScreen";
import tvInfoScreen from "./src/screens/tvInfoScreen";

// Crear nuestra navegación basada en stack (pilas)
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="movieList">
        <Stack.Screen
          name="movieList"
          component={MovieListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movieSearch"
          component={MovieSearchResultsScreen}
          options={{
            title: "Búsqueda",
            headerStyle: {
              backgroundColor: "#00a5cf",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="movieInfo"
          component={MovieInfoScreen}
          options={{
            title: "Información",
            headerStyle: {
              backgroundColor: "#00a5cf",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="movieGeners"
          component={MovieGenersScreen}
          options={{
            title: "Genero",
            headerStyle: {
              backgroundColor: "#00a5cf",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="tvgners"
          component={tvListScreen}
          options={{
            title: "Programas de televisión",
            headerStyle: {
              backgroundColor: "#00a5cf",
            },
            headerTintColor: "#fff",
          }}
        />
         <Stack.Screen
          name="infotv"
          component={tvInfoScreen}
          options={{
            title: "Información",
            headerStyle: {
              backgroundColor: "#00a5cf",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
