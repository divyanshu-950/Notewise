import React, {useEffect,useState} from "react";
import Navbar from "./Navbar";
import { db,auth } from "../Config/Firebase-config";
import Spinner from "./Spinner";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Note(props) {
  const navigate = useNavigate();
  var useruid =  JSON.parse(localStorage.getItem('uid'))
  const notesCollectionRef = collection(db, "to-do-list");
  const [item, setitem] = useState([]);
  const [title, setTitle] = useState("");
  const getNotesList = async () => {
    props.setProgress(20)
    try {
      
      const data = await getDocs(notesCollectionRef);
      const filterdata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      props.setProgress(40)
      const diary = []
      for(let i = 0; i<filterdata.length; i++){
        if(filterdata[i].uid === useruid){
          diary.push(filterdata[i])
        }
      }
      props.setProgress(60)
      setitem(diary);
      props.setProgress(100)

    } catch (err) {
      props.setProgress(100)
     props.Alert(err,'danger')
    }
  };
  useEffect(() => {
  
    if(!useruid){
      navigate('/login')
    }
    getNotesList();
   
  }, []);

  const update= async(id,e)=>{
    e.preventDefault()
     try{
       const note = doc(db,"to-do-list",id)
       await updateDoc(note,{status:'completed'
       })
       getNotesList();
       props.Alert("Task Completed ",'success')
     }
     catch(err){
       props.Alert(err,'danger')
     }
   }

  const deletenote = async (id) => {
    try{
      const note = doc(db, "to-do-list", id);
      await deleteDoc(note);
      props.Alert("Deleted Successfully",'success')
    }
    catch(err){
      props.Alert(err,'danger')
    }
      getNotesList();
    };

  const submit = async (e) => {
    e.preventDefault();
   
    const dismiss = document.getElementById('adddismiss')
    try {
      await addDoc(notesCollectionRef, {
        item: title,
        status: "in progress",
        uid: useruid
      });
      dismiss.click()
      setTitle("");
      getNotesList();
      props.Alert("Task Added Successfully",'success')
    } catch (err) {
      props.Alert(err,'danger')
    }
  };
  var w = window.innerWidth;
  return (
   <div className="container-fluid">
    {w > 700 &&
   <>
   <Navbar/>
      
    <div className="to-do" style={{padding:'30px 100px',marginTop:'100px'}}>
    <p className='row shadow p-3  'style={{fontSize:'28px',fontWeight:'700',letterSpacing:'6px',borderRadius:'10px',color:'white',backgroundColor:"black"}}>
      <span className="col-1 p-1 px-3" >No.</span>
      <span className="col-6 p-1 px-3" >To-Do-Task</span>
      <span className="col-2 p-1 px-3" >Status</span>
      <span className="col-3 p-1 px-4" >Action</span>
     </p>
    <div style={{height:'60vh',overflowY:'scroll'}}>
     
    {
      item.length > 0 && item.map((item,i) =>{
      return(
        <p key ={i} className='row mx-1 my-4 p-1 py-3 shadow-sm'style={{fontSize:'20px',padding:"0.8rem 1rem",fontWeight:'500',letterSpacing:'2px',borderBottom:'3px solid darkgrey',borderRight:'2px solid darkgrey',borderTop:'1px solid darkgrey',borderLeft:'1px solid darkgrey',borderRadius:'10px'}}>
        <span className="col-1 p-1 px-3" >{i+1}</span>
        {item.status === 'completed' && <span className="col-6 p-1 px-3" style={{color:'darkgrey'}}> <strike>{item.item}</strike> </span>}
        {item.status !== 'completed' && <span className="col-6 p-1 px-3" style={{color:'black'}}>{item.item}</span>}
        <span className="col-2 p-1 px-3" style={{color:item.status === 'completed'?'#dc3545':'#198754'}}>{item.status}</span>
        <span className="col-3 p-1 px-4" ><button className="mx-1 shadow btn btn-success" style={{padding:'4px 8px',borderRadius:'14px',fontSize:'18px',letterSpacing:'1px'}}  onClick={(e)=>{update(item.id,e)}}>Finished</button><button className="mx-2 shadow btn  btn-danger" style={{padding:'4px 8px',borderRadius:'14px',fontSize:'18px'}} onClick={()=>{deletenote(item.id)}}>Delete</button></span>
       </p>
      );
      
      })
    }
    
      </div>
    </div>
  
  {/*  ---------------------Add Section------------------- */}
  <div
      className="addbtn position-fixed "
      style={{
        boxShadow: " 0.1rem -0.7rem 1.2rem rgba(0 0 0 / 0.15)",
        bottom: "55px",
        right: "80px",
        borderRadius: "14px",
      
      }}
    >
      <button
        className="p-4"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@fat"
        style={{
          backgroundColor: "transparent",
          border: "none",
          fontSize: "20px",
          letterSpacing: "2px",
        }}
      >
        <i className="fa-solid fa-plus fa-xl"></i> Add Task
      </button>
    </div>

    <div
      className="modal fade  p-3 px-4"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <p
              className="modal-title fs-5"
              id="exampleModalLabel"
              style={{
                fontSize: "25px",
                letterSpacing: "2px",
                textAlign: "center",
              }}
            >
              Add to-do-task
            </p>
            <button
            id="adddismiss"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body  p-3 px-4">
            <form onSubmit={submit} >
              <div className="mb-3 ">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="title"
                  className="col-form-label"
                >
                  To-do-task
                </label>
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  required
                  id="title"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   </>

    }
     {w <= 700 &&
   <>
   <Navbar/>
      
    <div className="to-do" style={{padding:' 5px 10px ',marginTop:'100px'}}>
    <p className='row shadow-lg py-2 d-flex 'style={{justifyContent:'space-evenly',fontSize:'16px',fontWeight:'500',letterSpacing:'2px',borderRadius:'5px',color:'white',backgroundColor:"black"}}>
      <span className="col-1 p-0 " >No.</span>
      <span className="col-4 p-0" >To-Do-Task</span>
      <span className="col-2 p-0  " >Status</span>
      <span className="col-2 p-0 " >Action</span>
     </p>
     </div>
    <div style={{height:'60vh',overflowY:'scroll'}}>
     
    {
      item.length > 0 && item.map((item,i) =>{
      return(
        <p key ={i} className='row mx-1 d-flex my-2 py-2 shadow-sm'style={{alignItems:'center',justifyContent:'space-evenly',fontSize:'14px',padding:"0.8rem 0.2rem",fontWeight:'500',letterSpacing:'2px',borderBottom:'3px solid darkgrey',borderRight:'2px solid darkgrey',borderTop:'1px solid darkgrey',borderLeft:'1px solid darkgrey',borderRadius:'10px'}}>
        <span className="col-2 p-9" >{i+1}</span>
        {item.status === 'completed' && <span className="col-5 p-0" style={{color:'darkgrey'}}> <strike>{item.item}</strike> </span>}
        {item.status !== 'completed' && <span className="col-5 p-0" style={{color:'black'}}>{item.item}</span>}
        <span className="col-2 p-0 px-2 " style={{color:item.status === 'completed'?'#dc3545':'#198754'}}>{item.status !== 'completed'?<i class="fa-solid fa-bars-progress fa-lg"></i>:<i class="fa-regular fa-square-check fa-lg" ></i>}</span>
        <span className="col-3 p-0 px-3 d-flex  " style={{alignItems:'center',justifyContent:'space-evenly'}} ><button className=" shadow btn btn-success" style={{padding:'0px 6px',borderRadius:'14px',fontSize:'18px',letterSpacing:'1px'}}  onClick={(e)=>{update(item.id,e)}}><i class="fa-solid fa-check fa-xs"></i></button><button className="mx-1 shadow btn  btn-danger" style={{padding:'0px 6px',borderRadius:'14px',fontSize:'18px'}} onClick={()=>{deletenote(item.id)}}><i class="fa-solid fa-trash fa-xs"></i></button></span>
       </p>
      );
      
      })
    }
    
      </div>
    
  
  {/*  ---------------------Add Section------------------- */}
  <div
      className="addbtn position-fixed "
      style={{
        boxShadow: " 0.1rem -0.7rem 1.2rem rgba(0 0 0 / 0.15)",
        bottom: "45px",
        right: "40px",
        borderRadius: "14px",
      
      }}
    >
      <button
        className="p-3 px-4"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@fat"
        style={{
          backgroundColor: "transparent",
          border: "none",
         
        }}
      >
        <i className="fa-solid fa-plus fa-sm"></i> 
      </button>
    </div>

    <div
      className="modal fade  p-2 px-3"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <p
              className="modal-title"
              id="exampleModalLabel"
              style={{
                fontSize: "20px",
                letterSpacing: "2px",
              }}
            >
              Add to-do-task
            </p>
            <button
            id="adddismiss"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body  p-2 px-3">
            <form onSubmit={submit} >
              <div className="mb-3 ">
                <label
                  style={{ fontSize: "18px", letterSpacing: "2px" }}
                  htmlFor="title"
                  className="col-form-label"
                >
                  To-do-task
                </label>
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  required
                  id="title"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   </>

    }
   </div>
  );
}

export default Note;
