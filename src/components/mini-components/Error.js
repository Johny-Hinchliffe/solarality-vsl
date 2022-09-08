import React from 'react'
import {createPortal} from 'react-dom'

const Error = (header, errors) => {
   
    const errorList = errors.map(error => {
        return <li>error</li>
    })

  return createPortal  (
    <div style={{zIndex: 100}} className="ui error message">
  <i className="close icon"></i>
  <div className="header">
    {header}
  </div>
  <ul className="list">
    {errorList}
  </ul>
</div>, document.querySelector('#modal')
  )
}

export default Error