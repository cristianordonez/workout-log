import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createInitialData } from "./redux/database/database";
import { store } from "./redux/store/store";

export default function App() {
  useEffect(() => {
    try {
      createInitialData();
    } catch (err) {
      console.log("err: ", err);
    }
  }, []);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
