import { Route, Routes } from "react-router-dom";
import Admin from "../resources/views/admin/Admin";
import User from "../resources/views/user/User";

const ProtectedRoutes = () => {
  const isAdmin = false;
  return (
    <Routes>
      {
        isAdmin
          ? <Route>
            <Route path="/admin" element={<Admin />} />
          </Route>
          : <Route>
            <Route path="/" element={<User />} />
          </Route>
      }

    </Routes>
  )
}

export default ProtectedRoutes