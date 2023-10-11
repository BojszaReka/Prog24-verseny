import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
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

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
    <ChakraProvider>
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
    </ChakraProvider>
);
