import { Routes, Route, Link } from "react-router-dom"
import Home from "./ui/pages/Home"
import Contact from "./ui/pages/Contact"
import Dashboard from "./ui/pages/dashboard/Dashboard"
import Profile from "./ui/pages/dashboard/Profile"
import Settings from "./ui/pages/dashboard/Settings"
import LoginPage from "./ui/pages/LoginPage"
import RegisterPage from "./ui/pages/RegisterPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Home />} /> 
        {/* Parent route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested routes */}
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
