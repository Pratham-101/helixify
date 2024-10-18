import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Labs from "./components/Labs";
import Blogs from "./components/Blogs";
import Cases from "./components/Cases";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router> {/* Wrap your components inside Router */}
      <div>
        <Navbar />

        <main>
          <div id="home">
            <Home />
          </div>

          <div id="about">
            <About />
          </div>

          <div id="services">
            <Services />
          </div>

          <div id="labs">
            <Labs />
          </div>

          <div id="blog">
            <Blogs />
          </div>

          <div id="cases">
            <Cases />
          </div>

          <div id="contacts">
            <Contacts />
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
