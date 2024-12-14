import React, { useState } from 'react'
import {auth,googleProvider,githubProvider} from '../Config/Firebase-config'
import {signInWithEmailAndPassword,signInWithPopup,signInWithRedirect } from "firebase/auth";
import logo1 from '../img/logonobg.png'
import logo from '../img/login2.png'
import icon from '../img/google.png'
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
function Login(props) {
  var w = window.innerWidth;
  const navigate = useNavigate();
  console.log(auth?.currentUser?.email)
  const[email,setemail] = useState("");
 const[password,setpassword] = useState("");

 const login = async (e) =>{
   e.preventDefault();
   props.setProgress(20)
   try{
     await signInWithEmailAndPassword(auth, email, password)
     props.setProgress(40)
     localStorage.setItem('uid', JSON.stringify(auth.currentUser.uid));
     props.setProgress(60)
     navigate('/home')
     props.setProgress(100)
    }
  catch(err){
    props.setProgress(100)
    props.Alert(err,'danger')
  };
 }

 const logingoogle = async () => {
  props.setProgress(20)
  try{
    if(w>750){
      await signInWithPopup(auth, googleProvider);
      props.setProgress(50)
      localStorage.setItem('uid', JSON.stringify(auth.currentUser.uid));
      props.setProgress(70)
         }
         else{
           await signInWithRedirect(auth, googleProvider)
           props.setProgress(50)
      localStorage.setItem('uid', JSON.stringify(auth.currentUser.uid));
      props.setProgress(70)
         }
         props.setProgress(100)
 navigate('/home')
  }
  catch(err){
    props.setProgress(100)
    props.Alert(err,'danger')
  }
 }

 const logingithub = async () => {
  props.setProgress(20)
  try{
    if(w > 750)
{
  
  await signInWithPopup(auth, githubProvider);
  props.setProgress(50)
}
     else 
     {
      await signInWithRedirect(auth, githubProvider);
      props.setProgress(50)
     }
 localStorage.setItem('uid', JSON.stringify(auth.currentUser.uid));
 props.setProgress(100)
 navigate('/home')
  }
  catch(err){
    props.setProgress(100)
    props.Alert(err,'danger')
  }
 }

   return(
    <div className="Form container-fluid" style={{height:'100%'}}>
     {w>780 && <>
      <nav className="navbar navbar-expand-lg  pt-3 mb-3 px-4">
      <div className="container-fluid">
      <Link className="d-flex navbar-brand" to="/"> <img src={logo1} alt="logo part-1"  height="50"/>
    <span style={{fontSize:'35px', fontFamily: "Protest Revolution",fontWeight:'700',letterSpacing:'5px'}}>DiaryWise</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{justifyContent:'flex-end'}}>
          <ul className="navbar-nav"style={{fontSize:'20px',gap:'40px'}}>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/"><span  style={{padding:'10px 5px 5px 5px'}}>Overview</span></Link>
            </li>
            <li className="nav-item" style={{padding:'10px'}}>
              <Link to="/login" className='log ' style={{padding:'8px',color:"black",textDecoration:'none',backgroundColor:'#d2c08a'}}><i className="fa-solid fa-user px-2"></i>Login</Link> <span style={{borderLeft:"3px solid",padding:'2px '}}></span><Link to='/signup' className='log' style={{color:"black",textDecoration:'none',padding:'8px'}}><i className="fa-regular fa-user px-2" ></i>Sign up</Link>
            </li>
          
          </ul>
        </div>
      </div>
    </nav>
  
    
  <div className='d-flex mt-5'style={{alignContent:'center',justifyContent:'center'}}>
  <div style={{position:'absolute'}}> 
      <div className="d-flex" style={{justifyContent:'center'}}> <img src={logo} alt="" height='500'style={{zIndex:'0'}} /></div></div>
  <div className="mb-5  shadow-lg wrapper animate__animated animate__rollIn animate__slow" style={{color:'black',padding:'40px 35px'}}>
    <form action="#" style={{fontSize:'20px'}}>
        <h1>Login</h1>
       
          <div className="input-field">
          <input type="text" onChange={(e)=>{setemail(e.target.value)}} required/>
          <label>Enter your email</label>
        </div>
        <div className="input-field">
          <input type="password" onChange={(e)=>{setpassword(e.target.value)}} required/>
          <label>Enter your password</label>
        </div>
        <div>
        
        </div>
        <button className="but" type="submit" onClick={login}>Log In</button>
      </form>
      
        <p className='pt-5' style={{textAlign:'justify'}}>Sign in using:
        <button style={{border:'none',backgroundColor:'transparent'}} className='px-3'  > <img src={icon} alt="Google"  onClick={logingoogle}/> </button>
        <button style={{border:'none',backgroundColor:'transparent'}} ><i className="mx-2 fa-brands fa-github fa-2xl" style={{color: "#000000"}} onClick={logingithub}></i></button>
        </p>
        <div className="register">
          <p>Don't have an account? <Link to="/signup">Register</Link></p>
        </div>
    </div>
  </div>
  </>
}
  {w<780 &&
   <>
   <nav className="navbar navbar-expand-lg  pt-3 mb-3 " >
  <div className="container-fluid">
  <Link className="d-flex navbar-brand" to="/"> <img src={logo1} alt="logo part-1"  height="35"/>
  <span style={{fontSize:'25px', fontFamily: "Protest Revolution",fontWeight:'500',letterSpacing:'3px'}}>DiaryWise</span></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{justifyContent:'flex-end'}}>
      <ul className="navbar-nav"style={{fontSize:'18px',gap:'10px'}}>
        <li className="nav-item">
          <Link className="nav-link active px-2" aria-current="page" to="/"><span  style={{padding:'5px'}}>Overview</span></Link>
        </li>
        <li className="nav-item" >
          <Link to="/login" className='log active' style={{padding:'5px',color:"black",textDecoration:'none',backgroundColor:'#d2c08a'}}><i className="fa-solid fa-user px-2"></i>Login</Link> <span style={{borderLeft:"3px solid",padding:'2px '}}></span><Link to='/signup' className='log active' style={{color:"black",textDecoration:'none',padding:'5px'}}><i className="fa-regular fa-user px-2" ></i>Sign up</Link>
        </li>
      
      </ul>
    </div>
  </div>
</nav>

 
<div className='d-flex mt-5'style={{alignContent:'center',justifyContent:'center'}}>
<div style={{position:'absolute'}}> 
   <div className="d-flex" style={{justifyContent:'center'}}> <img src={logo} alt="" height='300'style={{zIndex:'0'}} /></div></div>
<div className="mb-5  shadow-lg wrapper animate__animated animate__rollIn animate__slow" style={{color:'black',padding:'20px 15px'}}>
 <form action="#" style={{fontSize:'18px'}}>
     <h2>Login</h2>
    
       <div className="input-field">
       <input type="text" onChange={(e)=>{setemail(e.target.value)}} required/>
       <label>Enter your email</label>
     </div>
     <div className="input-field">
       <input type="password" onChange={(e)=>{setpassword(e.target.value)}} required/>
       <label>Enter your password</label>
     </div>
     <div>
     
     </div>
     <button className="but" type="submit" onClick={login}>Log In</button>
     <p className='pt-5' style={{textAlign:'justify'}}>Sign in using:
     <button style={{border:'none',backgroundColor:'transparent'}} className='px-3'  > <img src={icon} alt="Google"  onClick={logingoogle}/> </button>
     <button style={{border:'none',backgroundColor:'transparent'}} ><i className="mx-2 fa-brands fa-github fa-2xl" style={{color: "#000000"}} onClick={logingithub}></i></button>
     </p>
     <div className="register">
       <p>Don't have an account? <Link to="/signup">Register</Link></p>
     </div>
   </form>
 </div>
</div>
</>
  }
    </div>
   );
}

export default Login
