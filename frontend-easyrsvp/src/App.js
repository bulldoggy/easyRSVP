import './App.css';
import Appbar from './components/Appbar';
import Guest from './components/Guest';
import Home from './components/Home';
import Host from './components/Host';
import Response from './components/Response';
import Student from './components/Student';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//Add footer for users to add comments
//add page for host/response/guest code that dont exist
//beautify words and colours
//LocalTime not saved for guest

function App() {
  return (
    <div className="App">
      <Appbar/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/rsvp/host" element={<Host />} />
          <Route exact path="/rsvp/response" element={<Response />} />
          <Route exact path="/rsvp/guest" element={<Guest />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
