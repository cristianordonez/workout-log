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
  days: { name: "" }[];
  sets: {
    isAmrap: boolean;
    noReps: number;
    type: "absolute" | "percentage";
    percentageMultiplier: number;
    weight: number;
  }[];
}

interface SelectExerciseSearch {
  exerciseName: string;
}

// SETS
interface SetType {
  rankOrder: number;
  isAmrap: boolean;
  noReps: number;
  type: "percentage" | "absolute";
  percentageMultiplier: number;
  weight: number;
  setId: number;
  exerciseId: number;
  dayId: number;
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
  rankOrder: number;
  dayId: number;
}
type AddExerciseType = NewExercise & ExerciseType;

// DAYS
interface UpdateNewDay {
  dayId: number;
  exercise: ExerciseType;
}
interface Day {
  dayId: number;
  rankOrder: number;
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
