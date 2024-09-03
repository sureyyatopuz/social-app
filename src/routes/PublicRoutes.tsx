import { Route, Routes } from "react-router-dom"
import Login from "../resources/views/login/Login"
import SignUp from "../resources/views/login/SignUp"

const PublicRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  )
}

export default PublicRoutes