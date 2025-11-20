import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

// Keep your existing imports for JSONs
const weatherAnimations = {
  Clear: require("../assets/animations/sun.json"),
  Clouds: require("../assets/animations/clouds.json"),
  Rain: require("../assets/animations/rain.json"),
  Snow: require("../assets/animations/snow.json"),
};

// Tweaked colors for a more vibrant look
const backgroundColors = {
  Clear: ["#2980B9", "#6DD5FA"], // Blue sky
  Clouds: ["#373B44", "#4286f4"], // Greyish Blue
  Rain: ["#000046", "#1CB5E0"], // Deep Blue
  Snow: ["#83a4d4", "#b6fbff"], // Ice Blue
};

const AnimatedBackground = ({ weatherMain, children }) => {
  const animation = weatherAnimations[weatherMain] || weatherAnimations["Clear"];
  const colors = backgroundColors[weatherMain] || backgroundColors["Clear"];

  return (
    <LinearGradient colors={colors} style={styles.container}>
      <LottieView 
        source={animation} 
        autoPlay 
        loop 
        resizeMode="cover"
        style={styles.lottie} 
      />
      {/* Safe Area wrapper to prevent content hitting the notch */}
      <View style={styles.content}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  lottie: { 
    position: "absolute", 
    width: "100%", 
    height: "100%", 
    opacity: 0.6 // Slight transparency so it doesn't overpower the text
  },
  content: {
    flex: 1,
    paddingTop: 50, // Replaces the SafeAreaView for now
  }
});

export default AnimatedBackground;