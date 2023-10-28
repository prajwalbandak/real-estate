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
import Signup from './pages/Signup';
import Signin from './pages/Signin';

function App() {

  return (
 
  
   <Router>
    <Header />
   <Routes>  
                 <Route exact path='/profile' element={< Profile/>}></Route>  
                 <Route exact path= 'sign-up' element= { <Signup /> }></Route>
                 <Route exact path= 'sign-in' element= { <Signin /> }></Route>
          </Routes>  

   </Router>


  )
}

export default App
