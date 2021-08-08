import './App.css';
import Navi from './layouts/Navi';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import Dashboard from './layouts/Dashboard';
import Sidebar from './layouts/SideBar';


function App() {
  return (
    <div className="App">
      
      <Navi/>
      <Sidebar/>
      
      <Container className = "main">
      <Dashboard/>
      </Container>
    </div>
  );
}

export default App;
