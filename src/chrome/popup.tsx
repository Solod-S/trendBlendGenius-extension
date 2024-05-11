import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { LoginUserResponseType } from "../redux/auth/authTypes";
import { SettingsPage } from "../pages/SettingsPage/SettingsPage";
import { AuthPage } from "../pages/AuthPage/AuthPage";

const App: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<LoginUserResponseType | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setUserData(user);
  }, [user]);
  return user ? <SettingsPage userData={user} /> : <AuthPage />;
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
