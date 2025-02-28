import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/main.scss";

import Home from "./pages/Home";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
