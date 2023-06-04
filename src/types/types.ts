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
  black: string;
}

type TabParamList = {
  Home: {};
  History: {};
  Progress: {};
  Settings: {};
};

type RootStackParamList = {
  TabStack: TabParamList;
  AddProgram: {};
  SelectExercise: { eventId: string };
};

type TextContentType =
  | "none"
  | "URL"
  | "addressCity"
  | "addressCityAndState"
  | "addressState"
  | "countryName"
  | "creditCardNumber"
  | "emailAddress"
  | "familyName"
  | "fullStreetAddress"
  | "givenName"
  | "jobTitle"
  | "location"
  | "middleName"
  | "name"
  | "namePrefix"
  | "nameSuffix"
  | "nickname"
  | "organizationName"
  | "postalCode"
  | "streetAddressLine1"
  | "streetAddressLine2"
  | "sublocality"
  | "telephoneNumber"
  | "username"
  | "password"
  | "newPassword"
  | "oneTimeCode";

interface ProgramForm {
  programName: string;
}

interface SelectExerciseSearch {
  exerciseName: string;
}

// todo change this type of any to explicit type
type FormControlType = any;

// SETS
interface SetType {
  setRankOrder: number;
  isAmrap: boolean;
  noReps: number;
  type: "percentage" | "absolute";
  percentageMultiplier: number | null;
  weight: number;
  setId: number | null;
  exerciseId: number | null;
  dayId: number | null;
}
// EXERCISE
interface ExerciseType {
  id: number;
  name: string;
  equipment: string;
  gif: string;
  body_part: string;
}
interface NewExercise {
  exerciseRankOrder: number;
  dayId: number | null;
}
type AddExerciseType = NewExercise & ExerciseType;

// DAYS
interface UpdateNewDay {
  dayId: number;
  exercise: ExerciseType;
}
interface Day {
  dayId: number;
  dayRankOrder: number;
  name: string;
}

interface Program {
  programName: string;
  programId: number;
}

export {
  Colors,
  RootStackParamList,
  TabParamList,
  TextContentType,
  ExerciseType,
  ProgramForm,
  SelectExerciseSearch,
  FormControlType,
  Day,
  Program,
  AddExerciseType,
  SetType,
  UpdateNewDay,
  NewExercise,
};
