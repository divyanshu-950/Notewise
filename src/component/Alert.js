import React from 'react'

function Alert(props) {
    const cap = (msg)=>{
        let t =msg.charAt(0).toUpperCase()+msg.slice(1);
        return t;
    }
  return (
    <>
    { props.alert && <div style ={{height: '60px'}}>
<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
   <strong>{cap(props.alert.type)}</strong> {props.alert.msg}
    </div>
    </div>
  }
  </>
  )
}

export default Alert
