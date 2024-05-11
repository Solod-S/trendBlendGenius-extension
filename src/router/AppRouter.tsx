// import React from "react";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import PublicRoute from "./PublicRoute";
// import PrivateRoute from "./PrivateRoute";
// import { AuthPage } from "../pages/AuthPage/AuthPage";
// import { SettingsPage } from "../pages/SettingsPage/SettingsPage";

// export const AppRouter: React.FC = () => {
//   const currentPath = window.location.pathname;
//   console.log("Current path:", currentPath);
//   return (
//     <Router>
//       <Routes>
//         <Route element={<PublicRoute />}>
//           <Route index path="/login" element={<AuthPage />} />
//           <Route path="*" element={<Navigate to="/popup" />} />
//         </Route>
//         <Route element={<PrivateRoute />}>
//           <Route index element={<SettingsPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// };
