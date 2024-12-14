import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db,auth } from "../Config/Firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  var w = window.innerWidth;
 var useruid =  JSON.parse(localStorage.getItem('uid'))
  const notesCollectionRef = collection(db, "notes");
  const [notes, setnotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [date, setdate] = useState("");
  const [tag, setTag] = useState("");
  const [note, setNote] = useState("");
  const [updatetitle, setupdateTitle] = useState("");
  const [updatecontent, setupdatecontent] = useState("");
  const [updatedate, setupdatedate] = useState("");
  const [updatetag, setupdateTag] = useState("");
  const[loading,setloading] = useState(false)
 const navigate = useNavigate();
  const getNotesList = async () => {
    props.setProgress(20)
    try {

      setloading(true)
      props.setProgress(40)
      const data = await getDocs(notesCollectionRef);
      const filterdata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      props.setProgress(60)
      const diary = []
      for(let i = 0; i<filterdata.length; i++){
        if(filterdata[i].uid === useruid){
          diary.push(filterdata[i])
        }
      }
      props.setProgress(80)
      setnotes(diary);
      setNote(diary)

      setloading(false)
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

  const submit = async (e) => {
    e.preventDefault();
   
    const dismiss = document.getElementById('adddismiss')
    try {
      await addDoc(notesCollectionRef, {
        title: title,
        content: content,
        tag: tag,
        date: date,
        uid: useruid
      });
      dismiss.click()
      setTitle("");
      setTag("");
      setdate("");
      setcontent("");
      getNotesList();
      props.Alert("Added Successfully",'success')
    } catch (err) {
      props.Alert(err,'danger')
    }
  };

  const deletenote = async (id) => {
  try{
    const note = doc(db, "notes", id);
    await deleteDoc(note);
    props.Alert("Deleted Successfully",'success')
  }
  catch(err){
    props.Alert(err,'danger')
  }
    getNotesList();
  };

  const updatenote = async (note) => {
   
    setupdateTitle(note.title)
    setupdateTag(note.tag)
    setupdatecontent(note.content)
    setupdatedate(note.date)
    const togg = document.getElementById("updateno");
    togg.click();
  };
  const update= async(id,e)=>{
   e.preventDefault()
    try{
      const note = doc(db,"notes",id)
      await updateDoc(note,{title:updatetitle,
        content:updatecontent,
        tag:updatetag,
        date:updatedate
      })
      getNotesList();
      props.Alert("Updated Successfully",'success')
    }
    catch(err){
      props.Alert(err,'danger')
    }
  }

  const handleclick = (note) => {
    Enote(note);
    const togg = document.getElementById("expand");
    togg.click();
  };
  const Enote = async (note) => {
    setNote(note);
  };

  return (
    <div className="container-fluid px-5">
      { w > 650 && 
      <>
    <Navbar />
   
    {loading && <Spinner/>}
    { !loading && <>
{/* -------------------------View Notes Section--------------------------------------- */}

    <div style={{ marginTop: "80px", padding: "10px 35px" }}>
      <p
        style={{
          fontSize: "40px",
          letterSpacing: "3px",
    fontFamily: "Playwrite HR Lijeva",
          fontWeight:'500',textAlign:'center',
          borderBottom:'1px solid grey',
          color:"darkgray"
        }}
      >
        Your Diaries
      </p>
    </div>
    <div
      className="row px-5"
      style={{ marginTop: "10px", overflowY: "scroll", height: "70vh " }}
    >
      { notes.length > 0 && notes.map((note, i) => {
        return (
          <div className="col-md-6 my-3 px-4 preview" key={i}>
            <div
              className="card shadow"
              style={{
                borderBottom: "4px solid darkgray",
                borderRight: "3px solid darkgray",
              }}
            >
              <button
                className="card-body"
                
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "20px 35px",
                }}
                onClick={(e) => {
                  handleclick(note);
                }}
              >
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "500",
                    letterSpacing: "2px",
                    textAlign: "center",
                    color:'darkorange'
                  }}
                  className="mb-4 card-title"
                >
                  {note.title}
                </p>
                <div
                  className="d-flex mb-3"
                  style={{ justifyContent: "space-between" }}
                >
                  <h6 style={{color:'#10b0f2'}}>
                Date:{" "}
                <span className="card-subtitle mb-2 text-body-secondary">
                  {note.date}
                </span>
              </h6>
              <h6 style={{color:'#10b0f2'}}>
                Tag:{" "}
                <span className="card-subtitle mb-2 text-body-secondary">
                  {" "}
                  {note.tag}
                </span>
              </h6>
                </div>

                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "justify",
                    fontFamily: "Handlee",
                    letterSpacing: "1px",
                  }}
                  className="card-text "
                >
                  {note.content.length > 90
                    ? note.content.slice(0, 90) + "...."
                    : note.content}
                </p>
              </button>
            </div>
          </div>
        );
      })}
      {notes.length < 1 && <p style={{fontSize:'30px',textAlign:'center',letterSpacing:'5px',color:'skyblue'}}> Add to preview</p> }
    </div>
{/*------------------------------ View Full Note Section----------------------------- */}

    <button
      id="expand"
      style={{ display: "none" }}
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    ></button>

    {
      <div
        className=" modal "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content p-3">
            <div className="modal-header">
              <p
                className="modal-title"
                id="staticBackdropLabel"
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  fontWeight: "500",
                  letterSpacing: "3px",
                    color:'darkorange'
                }}
              >
                {" "}
                {note.title}
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="d-flex mb-3 px-4 mt-3"
              style={{ justifyContent: "space-between" }}
            >
              <h6 style={{color:'#10b0f2'}}>
                Date:{" "}
                <span className="card-subtitle mb-2 text-body-secondary">
                  {note.date}
                </span>
              </h6>
              <h6 style={{color:'#10b0f2'}}>
                Tag:{" "}
                <span className="card-subtitle mb-2 text-body-secondary">
                  {" "}
                  {note.tag}
                </span>
              </h6>
            </div>
            <div className="modal-body">
              <p
                className="px-4"
                style={{
                  fontSize: "20px",
                  textAlign: "justify",
                  fontFamily: "Handlee",
                  letterSpacing: "1px",
                  lineHeight: "32px",
                }}
              >
                {" "}
                {note.content}
              </p>
            </div>
            <div
              className="modal-footer px-4"
              style={{ justifyContent: "space-between" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                 data-bs-dismiss="modal"
                onClick={() => {
                  updatenote(note);
                }}
              >
                <i className="fa-solid fa-pen-to-square fa-lg"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  deletenote(note.id);
                }}
              >
                <i className="fa-solid fa-trash-can fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    }

{/*-------------------------------------- Add Note Section----------------------------- */}
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
        className="p-4 px-4"
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
        <i className="fa-solid fa-plus fa-xl"></i> Add New
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
              Add New Diary
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
                  Title
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
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="content"
                  className="col-form-label"
                >
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => {
                    setcontent(e.target.value);
                  }}
                  style={{ height: "245px" }}
                  className="form-control textareas"
                  required
                  id="content"
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="tag"
                  className="col-form-label"
                >
                  Tag
                </label>
                <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  type="text"
                  className="form-control required"
                  id="tag"
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="date"
                  className="col-form-label"
                >
                  Date
                </label>
                <input
                  value={date}
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                  type="date"
                  className="form-control"
                  required
                  id="date"
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

{/*--------------------------- Update Note Section-------------------------------- */}
<button
        id="updateno" 
        data-bs-toggle="modal"
        data-bs-target="#update"
        data-bs-whatever="@fat"
        style={{
        display:'none'
        }}
      >
      </button>
    <div
      className="modal fade  p-3 px-4"
      id="update"
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
              Update Diary
            </p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body  p-3 px-4">
            <form onSubmit={(e)=>{update(note.id,e)}}>
              <div className="mb-3 ">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="title"
                  className="col-form-label"
                >
                  Update title
                </label>
                <input
                  value={updatetitle}
                  onChange={(e) => {
                    setupdateTitle(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  required
                  id="title"
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="content"
                  className="col-form-label"
                >
                  Update content
                </label>
                <textarea
                  value={updatecontent}
                  onChange={(e) => {
                    setupdatecontent(e.target.value);
                  }}
                  style={{ height: "245px" }}
                  className="form-control textareas"
                  required
                  id="content"
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="tag"
                  className="col-form-label"
                >
                 Update tag
                </label>
                <input
                  value={updatetag}
                  onChange={(e) => setupdateTag(e.target.value)}
                  type="text"
                  className="form-control required"
                  id="tag"
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="date"
                  className="col-form-label"
                >
                 Update date
                </label>
                <input
                  value={updatedate}
                  onChange={(e) => {
                    setupdatedate(e.target.value);
                  }}
                  type="date"
                  className="form-control"
                  required
                  id="date"
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
                  data-bs-dismiss="modal"
                 
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
}

</> 
}

{/*------------------------------- MOBILE DEVICES *------------------------------*/}



{w <=650 && <>
    <Navbar />
    {loading && <Spinner/>}
    { !loading && <>
{/* -------------------------View Notes Section--------------------------------------- */}

    <div style={{ marginTop: "90px" }}>
      <p
        style={{
          fontSize: "25px",
          letterSpacing: "3px",
          fontFamily: "Playwrite HR Lijeva",
          fontWeight:'500',textAlign:'center',
          borderBottom:'1px solid grey',
            color:"darkgray"
        }}
      >
        Your Diaries
      </p>
    </div>
    <div
      className="row"
      style={{ marginTop: "10px", overflowY: "scroll", height: "70vh " }}
    >
      { notes.length > 0 && notes.map((note, i) => {
        return (
          <div className="col-md-6 my-3 px-2 preview" key={i}>
            <div
              className="card shadow"
              style={{
                borderBottom: "4px solid darkgray",
                borderRight: "3px solid darkgray",
              }}
            >
              <button
                className="card-body"
                
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "10px 15px",
                }}
                onClick={(e) => {
                  handleclick(note);
                }}
              >
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "500",
                    letterSpacing: "2px",
                    textAlign: "center",
                    color:'darkorange'
                  }}
                  className="mb-4 card-title"
                >
                  {note.title}
                </p>
                <div
                  className="d-flex mb-3"
                  style={{ justifyContent: "space-between" }}
                >
                 <strong> <p  style={{color:'#10b0f2',fontSize:'15px'}}>
                Date:{" "}
                <span className="card-subtitle mb-2 text-body-secondary">
                  {note.date}
                </span>
              </p></strong>
            <strong>
            <p style={{color:'#10b0f2',fontSize:'15px'}}>
                Tag:{" "}
                <span className="card-subtitle mb-2 text-body-secondary">
                  {" "}
                  {note.tag}
                </span>
              </p>
            </strong>
                </div>

                <p
                  style={{
                    fontSize: "16px",
                    textAlign: "justify",
                    fontFamily: "Handlee",
                    letterSpacing: "1px",
                  }}
                  className="card-text "
                >
                  {note.content.length > 90
                    ? note.content.slice(0, 90) + "...."
                    : note.content}
                </p>
              </button>
            </div>
          </div>
        );
      })}
      {notes.length < 1 && <p style={{fontSize:'30px',textAlign:'center',letterSpacing:'5px',color:'skyblue'}}> Add to preview</p> }
    </div>
{/*------------------------------ View Full Note Section----------------------------- */}

    <button
      id="expand"
      style={{ display: "none" }}
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    ></button>

    {
      <div
        className=" modal p-0 "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content p-3">
            <div className="modal-header">
              <p
                className="modal-title"
                id="staticBackdropLabel"
                style={{
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: "500",
                  letterSpacing: "3px",
                    color:'darkorange'
                }}
              >
                {" "}
                {note.title}
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="d-flex mb-2 mt-3"
              style={{ justifyContent: "space-between" }}
            >
             <strong> <p  style={{color:'#10b0f2',fontSize:'15px'}}>
                Date:{" "}
                <span className="card-subtitle mb-2 text-body-secondary">
                  {note.date}
                </span>
              </p></strong>
            <strong>
            <p style={{color:'#10b0f2',fontSize:'15px'}}>
                Tag:{" "}
                <span className="card-subtitle mb-2 text-body-secondary">
                  {" "}
                  {note.tag}
                </span>
              </p>
            </strong>
            </div>
            <div className="modal-body">
              <p
                className="px-2"
                style={{
                  fontSize: "18px",
                  textAlign: "justify",
                  fontFamily: "Handlee",
                  letterSpacing: "1px",
                  lineHeight: "32px",
                }}
              >
                {" "}
                {note.content}
              </p>
            </div>
            <div
              className="modal-footer px-2"
              style={{ justifyContent: "space-between" }}
            >
              <button
                type="button"
                className="btn btn-primary"
                 data-bs-dismiss="modal"
                onClick={() => {
                  updatenote(note);
                }}
              >
                <i className="fa-solid fa-pen-to-square fa-lg"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  deletenote(note.id);
                }}
              >
                <i className="fa-solid fa-trash-can fa-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    }

{/*-------------------------------------- Add Note Section----------------------------- */}
<div
      className="addbtn position-fixed "
      style={{
        boxShadow: " 0.1rem -0.7rem 1.2rem rgba(0 0 0 / 0.15)",
        bottom: "55px",
        right: "30px",
        borderRadius: "14px",
      }}
    >
      <button
        className="p-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@fat"
        style={{
          backgroundColor: "transparent",
          border: "none",
          fontSize: "16px",
          letterSpacing: "2px",
        }}
      >
        <i className="fa-solid fa-plus fa-xl"></i>
      </button>
    </div>
    <div
      className="modal fade p-0 "
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
              Add New Diary
            </p>
            <button
            id="adddismiss"
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body  p-3 px-3">
            <form onSubmit={submit} >
              <div className="mb-3 ">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="title"
                  className="col-form-label"
                >
                  Title
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
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="content"
                  className="col-form-label"
                >
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => {
                    setcontent(e.target.value);
                  }}
                  style={{ height: "245px" }}
                  className="form-control textareas"
                  required
                  id="content"
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="tag"
                  className="col-form-label"
                >
                  Tag
                </label>
                <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  type="text"
                  className="form-control required"
                  id="tag"
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="date"
                  className="col-form-label"
                >
                  Date
                </label>
                <input
                  value={date}
                  onChange={(e) => {
                    setdate(e.target.value);
                  }}
                  type="date"
                  className="form-control"
                  required
                  id="date"
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

{/*--------------------------- Update Note Section-------------------------------- */}
<button
        id="updateno" 
        data-bs-toggle="modal"
        data-bs-target="#update"
        data-bs-whatever="@fat"
        style={{
        display:'none'
        }}
      >
      </button>
    <div
      className="modal fade  p-1"
      id="update"
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
                fontSize: "22px",
                letterSpacing: "2px",
                textAlign: "center",
              }}
            >
              Update Diary
            </p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body  p-3 px-4">
            <form onSubmit={(e)=>{update(note.id,e)}}>
              <div className="mb-3 ">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="title"
                  className="col-form-label"
                >
                  Update title
                </label>
                <input
                  value={updatetitle}
                  onChange={(e) => {
                    setupdateTitle(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  required
                  id="title"
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="content"
                  className="col-form-label"
                >
                  Update content
                </label>
                <textarea
                  value={updatecontent}
                  onChange={(e) => {
                    setupdatecontent(e.target.value);
                  }}
                  style={{ height: "245px" }}
                  className="form-control textareas"
                  required
                  id="content"
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="tag"
                  className="col-form-label"
                >
                 Update tag
                </label>
                <input
                  value={updatetag}
                  onChange={(e) => setupdateTag(e.target.value)}
                  type="text"
                  className="form-control required"
                  id="tag"
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ fontSize: "16px", letterSpacing: "2px" }}
                  htmlFor="date"
                  className="col-form-label"
                >
                 Update date
                </label>
                <input
                  value={updatedate}
                  onChange={(e) => {
                    setupdatedate(e.target.value);
                  }}
                  type="date"
                  className="form-control"
                  required
                  id="date"
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
                  data-bs-dismiss="modal"
                 
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
}

</> }
  </div>
  );
}

export default Notes;
