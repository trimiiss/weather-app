import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  // Requesting larger icon @4x for better quality
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <View style={styles.container}>
      {/* Location & Date */}
      <View style={styles.headerContainer}>
        <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
      </View>

      {/* Main Temp & Icon Centerpiece */}
      <View style={styles.centerPiece}>
         <Image source={{ uri: iconUrl }} style={styles.mainIcon} />
         <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
         <Text style={styles.description}>
            {weather.weather[0].description.charAt(0).toUpperCase() + 
             weather.weather[0].description.slice(1)}
         </Text>
      </View>

      {/* Details Row */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="thermometer-outline" size={24} color="#fff" />
          <Text style={styles.detailValue}>{Math.round(weather.main.feels_like)}°</Text>
          <Text style={styles.detailLabel}>Feels like</Text>
        </View>
        
        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="water-percent" size={24} color="#fff" />
          <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="weather-windy" size={24} color="#fff" />
          <Text style={styles.detailValue}>{Math.round(weather.wind.speed)} m/s</Text>
          <Text style={styles.detailLabel}>Wind</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  headerContainer: {
      alignItems: 'center',
      marginBottom: 10
  },
  city: { 
    fontSize: 28, 
    fontWeight: "600", 
    color: "#fff",
    letterSpacing: 0.5
  },
  centerPiece: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
  },
  mainIcon: { 
    width: 160, 
    height: 160, 
    marginBottom: -20 // Pull temp closer to icon
  },
  temp: { 
    fontSize: 100, 
    fontWeight: "200", // Thin modern font weight
    color: "#fff",
  },
  description: {
      fontSize: 20,
      color: "rgba(255,255,255,0.9)",
      fontWeight: '500'
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.2)", // Subtle dark container
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: "100%",
  },
  detailItem: {
    alignItems: "center",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2
  },
  divider: {
      width: 1,
      height: '80%',
      backgroundColor: 'rgba(255,255,255,0.1)',
      alignSelf: 'center'
  }
});

export default WeatherCard;