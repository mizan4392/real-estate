import logo from "./logo.svg";
import "./App.css";

//import components
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.page";
import PropertyDetails from "./pages/PropertyDetails.page";

//import pages

function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
