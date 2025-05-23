import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import { GlobalProvider } from "./context/GlobalContext"; // IMPORTA GlobalProvider!
import { BrowserRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserPersonal from "./pages/UserPersonal";
function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserPersonal />} />
            {/* Add other routes here */}
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;