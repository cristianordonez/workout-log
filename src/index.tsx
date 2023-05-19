import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import App from "./screens/App";

export default function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
