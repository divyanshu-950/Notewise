import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/header.png'
import logo1 from '../img/logonobg.png'
import img1 from '../img/notes.png'
import img2 from '../img/secure.png'
import img3 from '../img/calendar.gif'
import img4 from '../img/calendar.png'
import img5 from '../img/todo.gif'
var w = window.innerWidth;
function Intro() {
  return (
   <>
   {/* Deskto Devices */}
   {w > 780 &&
    <div className='container-fluid'>
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
            <Link className="nav-link active" aria-current="page" to="/"><span  style={{padding:'10px 5px 5px 5px',borderBottom:'2px solid'}}>Overview</span></Link>
          </li>
          <li className="nav-item" style={{padding:'10px'}}>
            <Link to="/login" className='log' style={{padding:'8px',color:"black",textDecoration:'none'}}><i className="fa-solid fa-user px-2"></i>Login</Link> 
            <span style={{borderLeft:"3px solid",padding:'2px '}}></span>
            <Link to='/signup' className='log' style={{color:"black",textDecoration:'none',padding:'8px'}}><i className="fa-regular fa-user px-2" ></i>Sign up</Link>
          </li>
        
        </ul>
      </div>
    </div>
  </nav>
  {/* Header */}
  <div className="container-fluid px-5  mt-2">
    
   <div className='row' style={{justifyContent:'space-between'}}>
    <div className="col-md-7">
      <p className='typewriter'style={{fontSize:'60px',fontWeight:'500',letterSpacing:'2px',textAlign:"justify"}}>Welcome to <span className='Note'>Diarywise</span> Your All-in-One Smart Organizer!</p>
      <p className="my-3"style={{fontSize:'20px',fontWeight:'400',textAlign:'justify'}}>Diarywise is more than just a secure diary-taking app—it's your ultimate productivity companion. Designed to help you organize your life effortlessly, Diarywise combines powerful features like secure notes, a dynamic to-do list, and an intuitive calendar in one sleek platform.</p>
     <div className='d-flex my-5' style={{justifyContent:"center"}}> <Link to="/signup"><button className=' bton btn btn-primary'style={{padding:'20px 85px',borderRadius:'25px',fontSize:'20px'}}> Get Started</button></Link>
     </div>
     </div>
    <div className="col-md-4 d-flex" style={{alignItems:'center',justifyContent:'center'}}><img src={logo} alt="logo"  style={{objectFit:'scale-down',maxHeight:'35vw'}}/></div>
   </div>
   </div>
  
  {/* Features */}
  
  <div className="container mt-5">
    <p className='mb-5' style={{fontSize:'45px',fontWeight:'400',textAlign:'center',letterSpacing:'3px'}}>Everything You Need Is Here</p>
    <div className="row mt-5" style={{padding:'40px',alignItems:'flex-end',justifyContent:'space-between'}}>
    <div className="col-md-4 px-2">
    <div><i className="fa-solid fa-book-open fa-2xl mx-3"></i></div>
    <p className='mt-3' style={{fontSize:'20px',fontWeight:'500'}}>Take Notes Smarter</p>
    <p style={{fontSize:'16px',fontWeight:'400',textAlign:'justify'}}>Effortlessly capture your ideas, thoughts, and important details, and organize them in a way that suits you best. Whether it’s a quick jot or a detailed diary, Diarywise ensures everything is stored just the way you need.</p>
    </div>
    <div className="col-md-5">
        <img src={img1} alt="notes" height="200" />
    </div>
    </div>
  
    <div className="row mt-2" style={{padding:'40px',alignItems:'flex-end',justifyContent:'space-between'}}>
    <div className="col-md-4 px-2">
    <div><i className="fa-solid fa-clipboard-list fa-2xl"></i></div>
    <p className='mt-3' style={{fontSize:'20px',fontWeight:'500'}}>Stay on Track</p>
    <p style={{fontSize:'16px',fontWeight:'400',textAlign:'justify'}}>Keep your tasks and goals in check with the built-in to-do list. Plan your day, prioritize your responsibilities, and mark off completed items to stay productive and focused.</p>
    </div>
    <div className="col-md-5">
        <img src={img5} alt="notes" height="200" />
    </div>
    </div>
  
  
    <div className="row mt-2" style={{padding:'40px',alignItems:'flex-end',justifyContent:'space-between'}}>
    <div className="col-md-4 px-2">
    <div><i className="fa-solid fa-calendar-days fa-2xl"></i></div>
    <p className='mt-3' style={{fontSize:'20px',fontWeight:'500'}}>Schedule Your Life</p>
    <p style={{fontSize:'16px',fontWeight:'400',textAlign:'justify'}}> Manage your appointments, deadlines, and events seamlessly with our integrated calendar. From personal plans to professional commitments, stay ahead with timely reminders and a clear schedule.</p>
    </div>
    <div className="col-md-5">
        <img src={img3} alt="notes" height="200" />
    </div>
    </div>
  
    <div className="row mt-2" style={{padding:'40px',alignItems:'flex-end',justifyContent:'space-between'}}>
    <div className="col-md-4 px-2">
    <div><i className="fa-solid fa-mobile-screen fa-2xl"></i></div>
    <p className='mt-3' style={{fontSize:'20px',fontWeight:'500'}}>Access Anywhere</p>
    <p style={{fontSize:'16px',fontWeight:'400',textAlign:'justify'}}>Your data is always within reach. With secure syncing across devices, Diarywise ensures that your notes, tasks, and schedules are available whenever and wherever you need them.</p>
    </div>
    <div className="col-md-5">
        <img src={img4} alt="notes" height="200" />
    </div>
    </div>
  
    
   
  
  </div>
  
  <div className="container-fluid mt-5" style={{padding:'80px 55px 50px 55px',backgroundColor:'#ececec',borderRadius:'45px'}}>
     <div className='d-flex' style={{justifyContent:'center'}}><i className="fa-solid fa-user-lock fa-2xl"></i></div>
    <p className='mt-3' style={{fontSize:'45px',letterSpacing:'3px',fontWeight:'600',textAlign:'center'}}>We value your privacy and do not use your personal data for any purpose </p>
    <p style={{letterSpacing:'2px',fontSize:'20px',fontWeight:'400',textAlign:'center'}}>With advanced encryption, your data is safe from unauthorized access. Diarywise is built with your privacy in mind, providing a secure space for all your information.</p>
    <div className='d-flex' style={{justifyContent:'center'}}>  <img src={img2} alt="notes" height="200" /></div>
  
  </div>
  <div className="container-fluid my-4 mt-5 px-4">
  <div>
  <span style={{fontSize:'20px',fontWeight:'500',letterSpacing:'2px'}}>&copy; 2024</span>
  <span  style={{fontSize:'25px', fontFamily: "Protest Revolution",fontWeight:'700',paddingLeft:'10px',letterSpacing:'2px'}}>Diarywise </span>
  <span style={{fontSize:'20px',fontWeight:'500',letterSpacing:'2px'}}>. All Rights Reserved</span>
  </div>
  
  </div>
      </div>
   }
   {/* Mobile & Tablet Devices */}
   {w <= 780 &&
    <div className='container-fluid'>
    <nav className="navbar navbar-expand-lg my-3">
    <div className="container-fluid">
      <Link className="d-flex navbar-brand" to="/"> <img src={logo1} alt="logo part-1"  height="35"/>
     <span style={{fontSize:'25px', fontFamily: "Protest Revolution",fontWeight:'500',letterSpacing:'3px'}}>Diarywise</span></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{justifyContent:'flex-end'}}>
      <ul className="navbar-nav"style={{fontSize:'18px',gap:'10px'}}>
        <li className="nav-item">
          <Link className="nav-link active px-2" aria-current="page" to="/"><span  style={{padding:'10px 5px 5px 5px',borderBottom:'2px solid darkgrey',width:'max-content'}}>Overview</span></Link>
        </li>
        <li className="nav-item" >
          <Link to="/login" className='log active' style={{padding:'5px',color:"black",textDecoration:'none'}}><i className="fa-solid fa-user px-2"></i>Login</Link> <span style={{borderLeft:"3px solid",padding:'2px '}}></span><Link to='/signup' className='log active' style={{color:"black",textDecoration:'none',padding:'5px'}}><i className="fa-regular fa-user px-2" ></i>Sign up</Link>
        </li>
      
      </ul>
      </div>
    </div>
  </nav>
  {/* Header */}
  <div className="container-fluid  mt-2">
    
   <div className='row' style={{justifyContent:'space-between'}}>
    <div className="">
     
      <p style={{fontSize:'40px',fontWeight:'500',letterSpacing:'1px',textAlign:"center"}}>Welcome to <span className='Note'>Diarywise</span> Your All-in-One Smart Organizer!</p>
      <div className=" d-flex" style={{alignItems:'center',justifyContent:'center'}}><img src={logo} alt="logo"  style={{objectFit:'scale-down',maxHeight:'47vw'}}/></div>

      <p className="my-3"style={{fontSize:'18px',fontWeight:'400',textAlign:'justify'}}>Diarywise is more than just a secure diary-taking app—it's your ultimate productivity companion. Designed to help you organize your life effortlessly, Diarywise combines powerful features like secure notes, a dynamic to-do list, and an intuitive calendar in one sleek platform.</p>
     <div className='d-flex my-5' style={{justifyContent:"center"}}> <Link to="/signup"><button className=' bton btn btn-primary'style={{padding:'20px 65px',borderRadius:'25px',fontSize:'20px'}}> Get Started</button></Link>
     </div>
     </div>
   </div>
   </div>
  
  {/* Features */}
  
  <div className="container mt-5">
    <p className='mb-5' style={{fontSize:'30px',fontWeight:'400',textAlign:'center',letterSpacing:'2px'}}>Everything You Need Is Here</p>
    <div className="row mt-4" style={{padding:'10px',alignItems:'flex-end',justifyContent:'space-between',textAlign:'center'}}>
    <div className="col-md-4 px-2">
    <div><i className="fa-solid fa-book-open fa-2xl mx-3"></i></div>
    <p className='mt-3' style={{fontSize:'18px',fontWeight:'500'}}>Take Notes Smarter</p>
    <p style={{fontSize:'16px',fontWeight:'400',textAlign:'justify'}}>Effortlessly capture your ideas, thoughts, and important details, and organize them in a way that suits you best. Whether it’s a quick jot or a detailed diary, Diarywise ensures everything is stored just the way you need.</p>
    </div>
    <div className="col-md-5">
        <img src={img1} alt="notes" height="200" />
    </div>
    </div>
  
    <div className="row mt-4" style={{padding:'10px',alignItems:'flex-end',justifyContent:'space-between',textAlign:'center'}}>
    <div className="col-md-4 px-2">
    <div><i className="fa-solid fa-clipboard-list fa-2xl"></i></div>
    <p className='mt-3' style={{fontSize:'18px',fontWeight:'500'}}>Stay on Track</p>
    <p style={{fontSize:'16px',fontWeight:'400',textAlign:'justify'}}>Keep your tasks and goals in check with the built-in to-do list. Plan your day, prioritize your responsibilities, and mark off completed items to stay productive and focused.</p>
    </div>
    <div className="col-md-5">
        <img src={img5} alt="notes" height="200" />
    </div>
    </div>
  
  
    <div className="row mt-4" style={{padding:'10px',alignItems:'flex-end',justifyContent:'space-between',textAlign:'center'}}>
    <div className="col-md-4 px-2">
    <div><i className="fa-solid fa-calendar-days fa-2xl"></i></div>
    <p className='mt-3' style={{fontSize:'18px',fontWeight:'500'}}>Schedule Your Life</p>
    <p style={{fontSize:'16px',fontWeight:'400',textAlign:'justify'}}> Manage your appointments, deadlines, and events seamlessly with our integrated calendar. From personal plans to professional commitments, stay ahead with timely reminders and a clear schedule.</p>
    </div>
    <div className="col-md-5">
        <img src={img3} alt="notes" height="200" />
    </div>
    </div>
  
    <div className="row mt-4" style={{padding:'10px',alignItems:'flex-end',justifyContent:'space-between',textAlign:'center'}}>
    <div className="col-md-4 px-2">
    <div><i className="fa-solid fa-mobile-screen fa-2xl"></i></div>
    <p className='mt-3' style={{fontSize:'18px',fontWeight:'500'}}>Access Anywhere</p>
    <p style={{fontSize:'16px',fontWeight:'400',textAlign:'justify'}}>Your data is always within reach. With secure syncing across devices, Diarywise ensures that your notes, tasks, and schedules are available whenever and wherever you need them.</p>
    </div>
    <div className="col-md-5">
        <img src={img4} alt="notes" height="200" />
    </div>
    </div>
  
    
   
  
  </div>
  
  <div className="container-fluid mt-5" style={{padding:'50px 20px',backgroundColor:'#ececec',borderRadius:'45px'}}>
     <div className='d-flex' style={{justifyContent:'center'}}><i className="fa-solid fa-user-lock fa-2xl"></i></div>
    <p className='mt-3' style={{fontSize:'25px',letterSpacing:'3px',fontWeight:'600',textAlign:'center'}}>We value your privacy and do not use your personal data for any purpose </p>
    <p style={{letterSpacing:'2px',fontSize:'16px',fontWeight:'400',textAlign:'center'}}>With advanced encryption, your data is safe from unauthorized access. Diarywise is built with your privacy in mind, providing a secure space for all your information.</p>
    <div className='d-flex' style={{justifyContent:'center'}}>  <img src={img2} alt="notes" height="200" /></div>
  
  </div>
  <div className="container-fluid my-4 mt-5 px-4">
  <div>
  <span style={{fontSize:'18px',fontWeight:'500',letterSpacing:'2px'}}>&copy; 2024</span>
  <span  style={{fontSize:'20px', fontFamily: "Protest Revolution",fontWeight:'700',paddingLeft:'10px'}}>Diarywise </span>
  <span style={{fontSize:'18px',fontWeight:'500',letterSpacing:'2px'}}>. All Rights Reserved</span>
  </div>
  </div>
      </div>
   }
   </>
  )
}

export default Intro
