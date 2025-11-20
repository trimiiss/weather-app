import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { getCurrentWeather, getForecast } from "./services/weatherAPI";

// Define static color gradients for different weather states
const weatherGradients = {
  Clear: ["#56CCF2", "#2F80ED"], // Bright Blue
  Clouds: ["#A7BFE8", "#6190E8"], // Muted Blue/Grey
  Rain: ["#4b6cb7", "#182848"], // Deep Blue/Dark
  Snow: ["#E6DADA", "#274046"], // Cold Grey/Blue
  Thunderstorm: ["#373B44", "#4286f4"], // Dark Grey/Blue
  Drizzle: ["#89F7FE", "#66A6FF"], // Light Blue
  Mist: ["#D7DDE8", "#757F9A"], // Foggy Grey
  Default: ["#6DD5FA", "#2980B9"], // Default nice blue
};

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!city.trim()) {
      Alert.alert("Error", "Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      Alert.alert("Error", "Could not fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [city]);

  // Determine background based on weather state
  const weatherMain = weather?.weather[0]?.main;
  const backgroundColors =
    weatherGradients[weatherMain] || weatherGradients["Default"];

  return (
    <LinearGradient colors={backgroundColors} style={styles.gradientContainer}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <SearchBar
            value={city}
            onChangeText={setCity}
            onSubmit={handleSearch}
          />

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <>
              <WeatherCard weather={weather} />
              <ForecastCard forecast={forecast} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});