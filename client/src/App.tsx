import logo from "./logo.svg";
import "./App.css";

//import components
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.page";
import PropertyDetails from "./pages/PropertyDetails.page";
import { Login } from "./pages/Login.page";
import { Signup } from "./pages/Signup.page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/gql.client";
import ConfirmSignup from "./pages/ConfirmSignup.page";

//import pages

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="max-w-[1440px] mx-auto bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirm" element={<ConfirmSignup />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;
