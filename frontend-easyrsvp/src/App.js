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
import { useEffect } from 'react';

//cronjob timed delete for invites after 30 days after invite date
//ads at bottom of page

function App() {

  useEffect(() => {
    function keepAliveBackend() {
      fetch("https://easyrsvp-web.onrender.com/rsvp/getCount?counterId=2")
    }
    const interval = setInterval(() => keepAliveBackend(), 870000)
  }, [])

  return (
    < div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: "#232946", minWidth: "906px" }
    }>
      <Header />

      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/host" element={<Host />} />
            <Route exact path="/response" element={<Response />} />
            <Route exact path="/guest" element={<Guest />} />
          </Routes>
        </Router>
      </div>

      <Footer />
    </div >
  );
}

export default App;
