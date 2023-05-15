import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

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
    Asset.fromModule(require("../../../assets/database/workout_log.db")).uri,
    FileSystem.documentDirectory + "SQLite/workout_log.db"
  );
  return SQLite.openDatabase("workout_log.db", "1.0");
}

const createInitialData = async (): Promise<void> => {
  const db = await openDatabase();
  db.readTransaction((tx) => {
    tx.executeSql("select * from exercises", [], (tx, response) => {
      console.log("response: ", response);
    });
  });
};

export { createInitialData };
