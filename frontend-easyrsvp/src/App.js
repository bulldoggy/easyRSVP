import './App.css';
import Guest from './components/Guest';
import Home from './components/Home';
import Host from './components/Host';
import Response from './components/Response';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

//beautify words and colours () change bg color of app to pale green/yellow
//timed delete for invites

function App() {
  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/rsvp/host" element={<Host />} />
            <Route exact path="/rsvp/response" element={<Response />} />
            <Route exact path="/rsvp/guest" element={<Guest />} />
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
}

export default App;
