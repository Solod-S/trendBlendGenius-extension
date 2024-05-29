import * as React from "react";

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  HashRouter,
} from "react-router-dom";

import SharedLayout from "./SharedLayout";

const Router = () => {
  return (
    <HashRouter>
      {/* <ul>
        <li>
          <a href="#/home">Home</a>
        </li>
        <li>
          <a href="#/about">About</a>
        </li>
      </ul> */}
      <React.Suspense fallback={<>Loading</>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<>Home</>} />
            <Route path="/settings" element={<>Settings</>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </React.Suspense>
    </HashRouter>
  );
};

export default Router;
