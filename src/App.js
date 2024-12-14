import './App.css';
import Intro from './component/Intro';
import Login from './component/Login'
import Alert from './component/Alert'
import LoadingBar from 'react-top-loading-bar'
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Signup from './component/Signup';
import Notes from './component/Notes';
import Note from './component/Note';
import { useState } from 'react';
import Textform from './component/Textform';

function App() {
  const[progress,setProgress] =useState(0);
  const[alert,setalert] = useState(null);
  const showalert= (msg,type) =>{
    setalert({
      msg: msg,
      type: type
    })
    setTimeout(()=>{
      setalert(null);
    },1000);
  }
  return (
    <Router basename='/'>
       <LoadingBar
     color='#f11946'
     progress={progress}
   />
      <Alert alert = {alert}/>
      <Routes>
      <Route exact path='/' element={< Intro/>}/>
      <Route exact path='/login' element={< Login setProgress = {setProgress} Alert = {showalert}  />}/>
      <Route exact path='/signup' element={<Signup setProgress = {setProgress} Alert = {showalert} />}/>
      <Route exact path='/home'  element={<Notes setProgress = {setProgress} Alert = {showalert} />}/>
      <Route exact path='/note' element={<Note setProgress = {setProgress} Alert = {showalert} />}/>
      <Route exact path='/textutility' element={<Textform Alert = {showalert} />}/>
      </Routes>
      </Router>
  );
}

export default App;
