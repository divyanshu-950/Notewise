import React, {useEffect,useState} from "react";
import Navbar from "./Navbar";
import {auth } from "../Config/Firebase-config";
import { useNavigate } from 'react-router-dom';

export default function Textform(props) {
  
  var w = window.innerWidth;
  var useruid =  JSON.parse(localStorage.getItem('uid'))
    //Uppercase Function
    const upcilick = ()=>{
        setText(text.toUpperCase());
        props.Alert("Converted to Uppercase","success");
    }
    //Clear function
    const clear = ()=>{
        setText("");
        props.Alert("Text Cleared","success");
    } 
    // speak function
    const speak = ()=>{
    
      const utterance = new SpeechSynthesisUtterance(text);

          //-- Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[2]; //-- Choose a specific voice

          //-- Speak the text
    speechSynthesis.speak(utterance);
    props.Alert("Text to Speech Enabled","success");
    
    }
    // Speak Stop Function
    const stop = () =>{
      window.speechSynthesis.cancel()
      props.Alert("Text to Speech Stopped","success");
    } 
    //Lowercase function
    const downcilick = ()=>{
        setText(text.toLowerCase());
        props.Alert("Converted to Lowercase","success");
    }
    // onchange function
    const change = (event)=>{
        setText(event.target.value);
    }
    //Remove Extra Space
    const space =()=>{
      let t = text.split(/[ ]+/);
      setText(t.join(" "));
      props.Alert("Extra Spaces Removed","success");
    }
     const wordCount =(text)=>{
      let count = 0;
      if(text.length === 0){
        return "0";
      }
      else{
        for(let i = 0 ; i < text.length; i++){
           if((text.charAt(i) === ' ' || text.charAt(i) === '\n' ) && text.length > 1){
            if(text.charAt(i-1) !== ' '){
              count++;
            }
           }
        }
        
        if(count === 0)
          return "1";
      }
      if(text.charAt(text.length -1) !== ' ' && (text.charAt(text.length -1) !== '\n' ))
        count= count+1;
      console.log(count);
      return count.toString();
     }
     const copytext=()=>{
      navigator.clipboard.writeText(text);
      props.Alert("Text Copied","success");
     }
     const navigate = useNavigate();
      useEffect(() => {
        console.log(auth.currentUser)
         if(!useruid){
           navigate('/login')
         }
      
        
       }, []);
    const[text,setText] = useState("");
  return (
    <> 
      <Navbar/>
    {w> 700 &&
    <div className="container-fluid px-5" style={{overflowY:'scroll',height:'100vh'}}>
    <div className="mb-3 px-5 " style={{marginTop:'120px'}} >
    <label htmlFor="exampleFormControlTextarea1" className='form-label' style={{color:'darkorange',fontSize:'40px',fontWeight:'700',letterSpacing:'5px'}}><b>Enter Your Text Here</b></label>
    <textarea  className="form-control textareas" id="exampleFormControlTextarea1" value= {text} onChange={change} rows="8" style={{border:'2px solid darkgrey',borderRadius:'14px'}} ></textarea>
    </div>
   <div className='px-5' >
    <button style={{fontSize:'18px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary my-1 mx-1" onClick={upcilick}>UpperCase</button>
    <button style={{fontSize:'18px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={downcilick}>LowerCase</button>
    <button style={{fontSize:'18px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={clear}>ClearText</button>
    <button style={{fontSize:'18px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={speak}>Speak</button>
    <button style={{fontSize:'18px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={stop}>Stop</button>
    <button style={{fontSize:'18px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={copytext}>Copy Text</button>
    <button style={{fontSize:'18px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={space}>Remove Extra Space</button>
    
   </div>
   
    <div className="conatiner my-4 px-5" style = {{color:'black'}}>
    <p style={{fontSize:'30px',fontWeight:'500',letterSpacing:'3px'}}> Your Text Summary</p>
    <p className='px-2' style={{fontSize:'20px',letterSpacing:'2px'}}>{wordCount(text)} Words & {text.length} Characters</p>
    <p className='px-2' style={{fontSize:'20px',letterSpacing:'2px'}}>{0.008 * wordCount(text)} Minutes Read</p>
    <p style={{fontSize:'30px',fontWeight:'500',letterSpacing:'3px'}}>Preview</p>
    {text.length === 0 && <p className='px-2' style={{textAlign:'justify',fontSize:'20px',color:'darkgray'}}> Enter Text Above To Preview it</p>}
    {text.length !== 0 && <p className='px-2' style={{textAlign:'justify',fontSize:'20px'}}>{text}</p>}
  </div>
</div>
    }

    {/*---------------------------- Mobile Devices--------------------- */}
    {w <= 700 &&
    <div className="container-fluid px-3" style={{overflowY:'scroll',height:'100vh'}}>
    <div className="mb-3 px-1 " style={{marginTop:'100px',textAlign:'center'}} >
    <label htmlFor="exampleFormControlTextarea1 px-2" className='form-label' style={{color:'darkorange',fontSize:'25px',fontWeight:'700',letterSpacing:'3px'}}><strong>Enter Your Text Here</strong></label>
    <textarea  className="form-control textareas" id="exampleFormControlTextarea1" value= {text} onChange={change} rows="8" style={{border:'2px solid darkgrey',borderRadius:'14px'}} ></textarea>
    </div>
   <div className='px-1' >
    <button style={{fontSize:'16px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary my-1 mx-1" onClick={upcilick}>UpperCase</button>
    <button style={{fontSize:'16px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={downcilick}>LowerCase</button>
    <button style={{fontSize:'16px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={clear}>ClearText</button>
    <button style={{fontSize:'16px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={speak}>Speak</button>
    <button style={{fontSize:'16px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={stop}>Stop</button>
    <button style={{fontSize:'16px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={copytext}>Copy Text</button>
    <button style={{fontSize:'16px',letterSpacing:'2px'}} type="button" disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={space}>Remove Extra Space</button>
    
   </div>
   
    <div className="conatiner my-4 px-1" style = {{color:'black'}}>
    <p style={{fontSize:'22px',fontWeight:'500',letterSpacing:'3px',textAlign:'center'}}> Your Text Summary</p>
    <hr/>
    <p className='px-2' style={{fontSize:'18px',letterSpacing:'2px'}}>{wordCount(text)} Words & {text.length} Characters</p>
    <p className='px-2' style={{fontSize:'18px',letterSpacing:'2px'}}>{0.008 * wordCount(text)} Minutes Read</p>
    <p className="pt-2" style={{fontSize:'22px',fontWeight:'500',letterSpacing:'3px',textAlign:'center'}}>Preview</p>
    <hr />
    {text.length === 0 && <p className='px-2' style={{textAlign:'justify',fontSize:'18px',color:'darkgray'}}> Enter Text Above To Preview it</p>}
    {text.length !== 0 && <p className='px-2' style={{textAlign:'justify',fontSize:'18px'}}>{text}</p>}
  </div>
</div>}
    
  </>

  );
}
