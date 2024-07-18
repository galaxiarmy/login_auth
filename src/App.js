import React, { Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { coreService, logout } from "./utils/general";

function IsUnAuthorized({ children }) {
  const isLoggedIn = coreService.getItem("isLoggedIn");

  let location = useLocation();

  if (isLoggedIn) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return children;
}

function RequireAuth({ children }) {

  const isLoggedIn = coreService.getItem("isLoggedIn");


  let location = useLocation();

  if (!isLoggedIn) {
    logout();
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Routes>
            <Route
              exact={false}
              path="/auth/*"
              element={
                <Routes>
                  <Route
                    path="/login"
                    element={
                      <IsUnAuthorized>
                        <Login />
                      </IsUnAuthorized>
                    }
                  />
                  <Route
                    exact
                    path="/"
                    element={<Navigate to="/auth/login" />}
                  />
                </Routes>
              }
            />

            <Route
              exact={false}
              path="/*"
              element={
                <Routes>
                  <Route
                    path="/home"
                    element={
                      <RequireAuth>
                        <Home />
                      </RequireAuth>
                    }
                  />
                </Routes>
              }
            />
            <Route exact path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
