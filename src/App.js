import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <>

      <Router>
      <AppRouter />
      </Router>
    
    </>
  );
}

export default App;
