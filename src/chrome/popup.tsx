import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { User } from "../redux/user/userTypes";
import { SettingsPage } from "../pages/SettingsPage/SettingsPage";
import { AuthPage } from "../pages/AuthPage/AuthPage";

const App: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    setUserData(user);
  }, [user]);
  return userData ? <SettingsPage userData={userData} /> : <AuthPage />;
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
