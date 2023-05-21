interface Colors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  border: string;
  notification: string;
  text: string;
  error: string;
  success: string;
  button: string;
}
type HomeStackParamList = {
  HomeScreen: {};
  AddProgramScreen: {};
};
type HistoryStackParamList = {
  HistoryScreen: {};
};

type ProgressStackParamList = {
  ProgressScreen: {};
};

type SettingsStackParamList = {
  SettingsScreen: {};
};

type TabParamList = {
  Home: {};
  History: {};
  Progress: {};
  Settings: {};
};

export {
  Colors,
  HomeStackParamList,
  HistoryStackParamList,
  ProgressStackParamList,
  SettingsStackParamList,
  TabParamList,
};
