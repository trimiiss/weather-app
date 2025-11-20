import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null;

  // Filter to get one forecast point per day (e.g., around noon)
  const dailyForecast = forecast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Mon", "Tue"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>5-Day Forecast</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dailyForecast}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
          return (
            <View style={styles.forecastItem}>
              <Text style={styles.dayText}>{getDayName(item.dt_txt)}</Text>
              <Image source={{ uri: iconUrl }} style={styles.icon} />
              <Text style={styles.tempText}>{Math.round(item.main.temp)}°</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: "100%",
  },
  headerText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: 15,
      marginLeft: 5
  },
  forecastItem: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "rgba(0,0,0,0.2)", // Consistent dark tint
    borderRadius: 18,
    paddingVertical: 15,
    marginRight: 12,
    width: 70, // Fixed width for uniformity
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255,255,255,0.8)",
    marginBottom: 5
  },
  icon: { 
    width: 40, 
    height: 40,
  },
  tempText: { 
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5
  },
});

export default ForecastCard;