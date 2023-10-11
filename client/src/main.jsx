import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Menu from "./misc/menu";
import Simple from "./components/navBar";
import FoodUpload from "./components/foodUpload";
import FoodUploaded from "./components/foodUploaded";
import FoodSearch from "./components/foodSearch";
import NeedsSpec from "./components/needsSpec";
import Settings from "./components/settings";
import JoinUs from "./components/join";
import AboutUs from "./components/about";
import FoodSavers from "./components/foodSavers";
<<<<<<< Updated upstream
import Map from "./components/map";
=======
import { AuthContextProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Role } from "./misc/Role.enum";
>>>>>>> Stashed changes

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
    <ChakraProvider>
<<<<<<< Updated upstream
      <Router>
        <Routes>
          <Route path="/" element={<FoodSavers />}></Route>
          <Route path="/foodsavers" element={<FoodSavers />}></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
          <Route path="/join" element={<JoinUs />}></Route>
          <Route path="/loggedin" element={<Simple />}></Route>
          <Route path="/loggedin/upload" element={<FoodUpload />}></Route>
          <Route path="/loggedin/uploaded" element={<FoodUploaded />}></Route>
          <Route path="/loggedin/search" element={<FoodSearch />}></Route>
          <Route path="/loggedin/spec" element={<NeedsSpec />}></Route>
          <Route path="/loggedin/settings" element={<Settings />}></Route>
          <Route path="/loggedin/map" element={<Map />}></Route>
        </Routes>
      </Router>
=======
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>

            <Route path="/" element={<FoodSavers />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
            <Route path="/foodsavers" element={<FoodSavers />}></Route>
            <Route path="/join" element={<JoinUs />}></Route>

            <Route path="/loggedin" element={
              <ProtectedRoute accessBy="authenticated">
                <Simple />
              </ProtectedRoute>
            } />

            <Route path="/loggedin/upload" element={
              <ProtectedRoute accessBy="authenticated" roles={[Role.FOOD_OFFERER]}>
                <FoodUpload />
              </ProtectedRoute>}
            />

            <Route path="/loggedin/uploaded" element={
              <ProtectedRoute accessBy="authenticated">
                <FoodUploaded />
              </ProtectedRoute>}
            />
            <Route path="/loggedin/search" element={
              <ProtectedRoute accessBy="authenticated">
                <FoodSearch />
              </ProtectedRoute>
            } />
            <Route path="/loggedin/spec" element={
              <ProtectedRoute accessBy="authenticated">
                <NeedsSpec />
              </ProtectedRoute>
            } />
            <Route path="/loggedin/settings" element={
              <ProtectedRoute accessBy="authenticated">
                <Settings />
              </ProtectedRoute>
            } />

          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
>>>>>>> Stashed changes
    </ChakraProvider>
);
