import React from 'react'
import {auth} from '../Config/Firebase-config'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo1 from '../img/logonobg.png'
import { signOut } from 'firebase/auth'

function Navbar() {
  let location = useLocation();
  var w = window.innerWidth;
  const navigate = useNavigate();
  console.log(auth?.currentUser?.email)
  const logout = async () => {
    try{
   await signOut(auth);
   localStorage.clear()
    navigate("/")
    }
    catch(err){
   window.alert(err)
    }
   }

  return (
   <>
   {w > 700 && 
     <>
     <nav className="navbar  fixed-top mt-3 pt-3 mb-3 px-5">
     <div className="container-fluid">
     <Link className="d-flex navbar-brand" to="/"> <img src={logo1} alt="logo part-1"  height="50"/>
     <span style={{fontSize:'35px', fontFamily: "Protest Revolution",fontWeight:'700',letterSpacing:'5px'}}>DiaryWise</span></Link>
       <div style={{display:'flex'}}><button className="navbar-toggler" style={{border:'none'}} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button ><span className='px-1' style={{letterSpacing:'3px',fontSize:'25px' ,fontWeight:"500"}}>MENU</span></div>
       <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
         <div className="offcanvas-header">
           <h5 className="offcanvas-title" id="offcanvasNavbarLabel"> <span style={{fontSize:'25px', fontFamily: "Protest Revolution",fontWeight:'700',letterSpacing:'5px'}}>DiaryWise</span></h5>
           <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
         </div>
         <div className="offcanvas-body">
           <ul className="navbar-nav justify-content-end flex-grow-1 pe-3" style={{fontSize:'20px'}}>
             <li className="nav-item">
               <Link className={`nav-link ${location.pathname==='/home'?'active':''}`}  aria-current="page" to="/home" style={{letterSpacing:'3px'}}><i className="fa-solid fa-book"></i> Diaries</Link>
             </li>
             <li className="nav-item">
               <Link className={`nav-link ${location.pathname==='/note'?'active':''}`}  to="/note" style={{letterSpacing:'3px'}}><i className="fa-solid fa-list-check"></i> To-Do-List </Link>
             </li>
             <li className="nav-item">
               <Link className={`nav-link ${location.pathname==='/textutility'?'active':''}`}  to="/textutility" style={{letterSpacing:'3px'}}> <i className="fa-solid fa-screwdriver-wrench"></i> Text Utility Tools</Link>
             </li>
             
           </ul>
           <div className='d-flex' style={{alignItems:'flex-end',height:'62vh'}}> <button className="nav-link" onClick={logout} style={{letterSpacing:'3px',fontSize:'20px'}}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>
           </div>
          
         </div>
       </div>
     </div>
   </nav>
   </>
   }
   {w<700 && 
     <>
     <nav className="navbar  fixed-top mt-2  pt-2 mb-3">
     <div className="container-fluid">
     <Link className="d-flex navbar-brand" to="/home"> <img src={logo1} alt="logo part-1"  height="35"/>
     <span style={{fontSize:'25px', fontFamily: "Protest Revolution",fontWeight:'500',letterSpacing:'3px'}}>DiaryWise</span></Link>
       <div style={{display:'flex'}}><button className="navbar-toggler" style={{border:'none'}} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
         <span style={{height:'1.1rem',width:'1.1rem'}} className="navbar-toggler-icon"></span>
       </button ></div>
       <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
         <div className="offcanvas-header">
           <h5 className="offcanvas-title" id="offcanvasNavbarLabel"> <span style={{fontSize:'25px', fontFamily: "Protest Revolution",fontWeight:'500',letterSpacing:'3px'}}>DiaryWise</span></h5>
           <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
         </div>
         <div className="offcanvas-body">
           <ul className="navbar-nav justify-content-end flex-grow-1 pe-3" style={{fontSize:'20px'}}>
             <li className="nav-item">
               <Link className={`nav-link ${location.pathname ==='/home'?'active':''}`}  aria-current="page" to="/home" style={{letterSpacing:'3px'}}><i className="fa-solid fa-book"></i> Diaries</Link>
             </li>
             <li className="nav-item">
               <Link className={`nav-link ${location.pathname==='/note'?'active':''}`}  to="/note" style={{letterSpacing:'3px'}}><i className="fa-solid fa-list-check"></i> To-Do-List </Link>
             </li>
             <li className="nav-item">
               <Link className={`nav-link ${location.pathname==='/textutility'?'active':''}`}  to="/textutility" style={{letterSpacing:'3px'}}><i className="fa-solid fa-screwdriver-wrench"></i> Text Utility Tools</Link>
             </li>
             
           </ul>
           <div className='d-flex' style={{alignItems:'flex-end',height:'62vh'}}> <button className="nav-link" onClick={logout} style={{letterSpacing:'3px',fontSize:'20px'}}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>
           </div>
          
         </div>
       </div>
     </div>
   </nav>
   </>}
   </>
    
  )
}

export default Navbar
