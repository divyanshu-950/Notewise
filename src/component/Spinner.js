import React from 'react'
import loading from '../img/loading.gif'
function Spinner() {
  return (
    <div className='d-flex' style={{marginTop:'150px',justifyContent:'center'}}>
      <img src={loading} alt="" />
    </div>
  )
}

export default Spinner
