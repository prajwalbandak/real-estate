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
import Home from './pages/Home';
import PrivateRoute from './components/privateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';

function App() {

  return (
 
  
   <Router>
    <Header />
   <Routes>  
                <Route exact path='/' element={< Home/>}></Route> 
                
                 <Route exact path= 'sign-up' element= { <Signup /> }></Route>

                 <Route exact path= 'sign-in' element= { <Signin /> }></Route>
                 <Route element={< PrivateRoute />} >
                 <Route exact path='/profile' element={< Profile/>}></Route>  
                 <Route exact path = '/create-listing' element= {<CreateListing />} ></Route>
                 <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
                 </Route>
          </Routes>  

   </Router>


  )
}

export default App
