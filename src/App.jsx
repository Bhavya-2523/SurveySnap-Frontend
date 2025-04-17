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
import { UserManagement } from './components/admin/UserManagement'
import { SurveyManagement } from './components/admin/SurveyManagement'
import { Analytics } from './components/admin/Analytics'
import HomePage from './components/common/HomePage1'
import ContactPage from './components/common/Contact'


function App() {

  axios.defaults.baseURL = "http://localhost:3000"
  
  
  return (
   
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/1" element={<LandingPage />} />
        <Route path="/" element={<Home />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<ContactPage/>} />
        
        {/* Private Routes */}
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/user" element={<UserSidebar />}>
            
          </Route>

          <Route path="/admin" element={<AdminSidebar />}>
            <Route path="profile" element={<AdminProfile />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="UserManage" element={<UserManagement />} />
            <Route path="SurveyManage" element={<SurveyManagement />} />
            <Route path="Analytics" element={<Analytics />} />
            <Route path="analytics/:id" element={<ViewAnalytics />} />
          </Route>

          <Route path="/survey" element={<SurveySidebar />}>
          <Route path="profile" element={<UserProfile />} />
            <Route path="addsurvey" element={<CreateSurvey />} />
            <Route path="addsurvey2" element={<CreateSurvey2 />} />
            <Route path="mysurveys" element={<ViewMySurveys />} />
            <Route path="details/:id" element={<ViewDetails />} />
            <Route path="update/:id" element={<UpdateSurvey />} />
            <Route path="participate" element={<Participate />} />
            <Route path="response/:id" element={<Responding />} />
            <Route path="analytics/:id" element={<ViewAnalytics />} />
            <Route path="participated" element={<ParticipatedSurveys />} />
          </Route>
        </Route>
      </Routes>
    </>

  )
}

export default App