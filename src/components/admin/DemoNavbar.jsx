import React from 'react'

export const DemoNavbar = () => {
  return (
    <nav className="app-header navbar navbar-expand" style={{padding:"0px",margin:"0px"}}>
      <div className="container-fluid" style={{ backgroundColor: "#282828",padding:"8.65px"}}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-lte-toggle="sidebar"
              href="#"
              role="button"
            >
              <i className="bi bi-list" />
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link" style={{color:"rgb(255,119,0)"}}>
              Home
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="#" className="nav-link" style={{color:"rgb(255,119,0)"}}>
              Contact
            </a>
          </li>
        </ul>
        
        
      </div>
    </nav>
  )
}
