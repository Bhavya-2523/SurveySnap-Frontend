import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UserSidebar } from './components/layouts/UserSidebar'
// import './App.css'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import { Route, Routes } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import { Signup2 } from './components/common/signup2'
import axios from 'axios'
import { Login2 } from './components/common/Login2'
import PrivateRoutes from "./hooks/PrivateRoutes";
import LandingPage from "./components/common/LandingPage";
import {SurveySidebar} from "./components/layouts/SurveySidebar"
import {CreateSurvey} from "./components/survey/CreateSurvey";
import { CreateSurvey2 } from './components/survey/CreateSurvey2'
import { ViewMySurveys } from './components/survey/ViewMySurveys'
import { UpdateSurvey } from './components/survey/UpdateSurvey'
import { ResetPassword } from './components/common/ResetPassword'
import ForgotPassword from './components/common/ForgotPassword'
import Home from './components/common/HomePage'
import { Participate } from './components/user/Participate'
import { Responding } from './components/user/Responding'
import { ViewDetails } from './components/survey/ViewDetails'
import { ViewAnalytics } from './components/user/ViewAnalytics'
import { ParticipatedSurveys } from './components/user/ParticipatedSurveys'
import { AdminSidebar } from './components/admin/AdminSidebar'
import { AdminProfile } from './components/admin/AdminProfile'
import AdminDashboard from './components/admin/AdminDashboard'


function App() {

  axios.defaults.baseURL = "http://localhost:3000"
  
  
  return (
   
    <> 
     <Routes>
     <Route path="/1" element ={<LandingPage/>}></Route>
     <Route path="/" element={<Home />} />

      <Route path='/login' element={<Login/>}></Route>
      <Route path='/login2' element={<Login2/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signup2' element={<Signup2/>}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
      <Route path="/resetpassword/:token" element ={<ResetPassword/>}></Route>
    </Routes>  
    <body class="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
    <div className="app-wrapper">
      {/* <UserSidebar></UserSidebar>\ */}

      
      <Routes>
      <Route path="" element={<PrivateRoutes />}>
        <Route path='/user' element={<UserSidebar/>}>
          <Route path='profile' element={<UserProfile/>}></Route>
        </Route>
        {/* <Route path='/Demouser' element={<DemoSidebar/>}>
          <Route path='profile' element={<DemoProfile/>}></Route>
        </Route> */}
        <Route path='/admin' element={<AdminSidebar/>}>
          <Route path='profile' element={<AdminProfile/>}></Route>
          <Route path='dashboard' element={<AdminDashboard/>}></Route>

        </Route>
        <Route path="/survey" element={<SurveySidebar />}>
            <Route path="addsurvey" element={<CreateSurvey/>} />
            <Route path="addsurvey2" element={<CreateSurvey2/>} />
            <Route path="mysurveys" element ={<ViewMySurveys/>}></Route>
            <Route path="details/:id" element={<ViewDetails />} />
            <Route path="update/:id" element={<UpdateSurvey />} />
            <Route path="participate" element={<Participate />} />
            {/* <Route path="response/:id" element={<Responding/>}></Route> */}
            <Route path="response/:id" element={<Responding/>}></Route>
            <Route path="analytics/:id" element={<ViewAnalytics />} />
            <Route path="participated" element={<ParticipatedSurveys />} />
          </Route>
      </Route>
      </Routes>

    </div>
   </body>
   </>

  )
}

export default App