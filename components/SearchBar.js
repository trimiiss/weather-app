import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ value, onChangeText, onSubmit }) => (
  <View style={styles.container}>
    <Ionicons name="search-outline" size={20} color="rgba(255,255,255,0.7)" style={styles.icon} />
    <TextInput
      placeholder="Search for a city..."
      placeholderTextColor="rgba(255,255,255,0.7)"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit} // Trigger search on Enter key
      style={styles.input}
      returnKeyType="search"
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => onChangeText("")}>
         <Ionicons name="close-circle" size={20} color="rgba(255,255,255,0.7)" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)", // Subtle dark tint
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  icon: { marginRight: 10 },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SearchBar;