import * as React from "react";

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";

import SharedLayout from "./SharedLayout";
import { Main } from "./Main/Main";

const Router = () => {
  return (
    <HashRouter>
      <React.Suspense fallback={<>Loading</>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Main />} />
            {/* <Route path="/settings" element={<Main />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </React.Suspense>
    </HashRouter>
  );
};

export default Router;
