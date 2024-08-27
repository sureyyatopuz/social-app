import { Route, Routes } from "react-router-dom";
import Admin from "../resources/views/admin/Admin";
import User from "../resources/views/user/User";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user)
  return (
    <Routes>
      {
        user.isAdmin
          ?
          <>
            <Route index element={<Admin />} />
            <Route path="/admin" element={<Admin />} />
          </>

          :
          <Route path="/" element={<User />} />

      }

    </Routes>
  )
}

export default ProtectedRoutes