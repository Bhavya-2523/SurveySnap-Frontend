import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { DemoNavbar } from './DemoNavbar'

export const DemoSidebar = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
    <DemoNavbar></DemoNavbar>

      
        <aside
        className="app-sidebar"       
         style={{backgroundColor:"#282828",height:"56px",width:"246px"}}

      >
        <div className="sidebar-brand"style={{backgroundColor:"#282828",margin:"2px",padding:"2px 2px"}}
        >
        <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          backgroundColor: "#282828",
          cursor: "pointer",
          color:"rgb(255,119,0)",
          textDecoration:"none",
          border:"0",
          marginLeft:"-35px",
          marginRight:"10px"
        }}
      >
        ☰
      </button>
          <a href="./index.html" className="" style={{alignItems:"center",display:"flex",justifyContent:"center",textDecoration:"none"}}>
            
            <img
              src="../../dist/assets/img/AdminLTELogo.png"
              alt="Logo"
              style={{color:"white"}}
              className="brand-image opacity-75 shadow"
            />
            
            <span className="brand-text fw-light"
            style={{color:"rgb(255,119, 0)"}}>AdminLTE 4</span>
            
          </a>
          
      </div>
    </aside>
    
{/* divide from here */}

{isCollapsed?<>
  <aside
        
        className="app-sidebar"       
         style={{backgroundColor:"#282828",marginTop:"58px"}}

      >
        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link to="/Demouser/profile" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p style={{color:"rgb(255,119, 0)"}}>
                    Dashboard
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item" >
                    <Link to="/Demouser/survey" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p style={{color:"rgb(255,119, 0)"}}>Create survey</p>
                    </Link>
                  </li>
                  <li className="nav-item" >
                    <a href="./index2.html" className="nav-link"  >
                      <i className="nav-icon bi bi-circle"  />
                      <p style={{color:"rgb(255,119, 0)"}}>Dashboard v2</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index3.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p style={{color:"rgb(255,119, 0)"}}>Dashboard v3</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="./generate/theme.html" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p style={{color:"rgb(255,119, 0)"}}>Theme Generate</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p style={{color:"rgb(255,119, 0)"}}>
                    Widgets
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./widgets/small-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Small Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/info-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>info Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/cards.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Cards</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            
          </nav>
        </div>
    </aside>

      </>
:""}
  
        <main class="app-main">
            <Outlet></Outlet>
        </main>

    </>
  )
}
