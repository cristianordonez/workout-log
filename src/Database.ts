import * as SQLite from "expo-sqlite";

const openDatabase = (): SQLite.WebSQLDatabase => {
  const db = SQLite.openDatabase("workouts.db");
  return db;
};

const createInitialData = (db: SQLite.WebSQLDatabase): void => {
  db.transaction((tx) => {
    tx.executeSql(``);
  });
};
