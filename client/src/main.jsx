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
import Map from "./components/map";
import { AuthContextProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Role } from "./misc/Role.enum";


const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/" element={<FoodSavers />}></Route>
        <Route path="/foodsavers" element={<FoodSavers />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/join" element={<JoinUs />}></Route>
      </Routes>
    </Router>
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

          <Route path="/loggedin/map" element={
            <ProtectedRoute accessBy="authenticated">
              <Map />
            </ProtectedRoute>
          } />

        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </ChakraProvider>
);
