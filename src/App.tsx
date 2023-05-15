import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require("../assets/database/workout_log.db")).uri,
    FileSystem.documentDirectory + "SQLite/workout_log.db"
  );
  return SQLite.openDatabase("workout_log.db", "1.0");
}

export default function App() {
  useEffect(() => {
    const get_data = async () => {
      const db = await openDatabase();
      db.transaction((tx) => {
        tx.executeSql("select * from exercises ", [], (tx, results) => {
          console.log("success");
          console.log("results: ", results);
          console.log("tx: ", tx);
        });
      });
    };
    try {
      get_data();
    } catch (err) {
      console.log("err: ", err);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
