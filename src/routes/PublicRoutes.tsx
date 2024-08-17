import { Route, Routes } from "react-router-dom"
import Login from "../resources/views/login/Login"

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default PublicRoutes