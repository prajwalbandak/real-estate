import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom'; 
import Profile from './pages/Profile';

import './index.css'
import Header from './components/Header';

function App() {

  return (
 
  
   <Router>
    <Header />
   <Routes>  
                 <Route exact path='/profile' element={< Profile/>}></Route>  
                 
          </Routes>  

   </Router>


  )
}

export default App
