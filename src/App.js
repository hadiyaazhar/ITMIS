import './App.css';
// import Sidebar from './Components/Sidebar/Sidebar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard';
import Complex from './Locations/Complex/Complex';
import Login from './Login/Login';
import Floors from './Locations/Floors/Floors';
import Rooms from './Locations/Rooms/Rooms';
import Building from './Locations/Buildings/Building';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
// import Test from './Tests/Test'
// import DataTableExportDemo from './abc/abc'
function App() {
  return (
    <div className="App">
      {/* <Sidebar> */}
 
      <BrowserRouter>
      <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/building' element={<Building/>}/>
         <Route path='/complex' element={<Complex/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/rooms' element={<Rooms/>}/>
         <Route path='/floors' element={<Floors/>}/>
      </Routes>
      </BrowserRouter> 

      {/* <Test/> */}
      

    </div>
  );
}

export default App;
