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

const getData = async (sql: string): Promise<any> => {
  const db = await openDatabase();
  let promise = new Promise<any>((resolve, reject) => {
    db.readTransaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (_, response) => {
          resolve(response.rows._array);
          db.closeAsync();
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

export { getData };
