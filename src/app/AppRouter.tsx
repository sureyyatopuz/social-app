import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import PublicRoutes from "../routes/PublicRoutes";
import { useSelector } from "react-redux";

const AppRouter = () => {

  const { user } = useSelector((state) => state.auth);
  console.log("user", user)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {user &&
          <ProtectedRoutes />
          ||
          <PublicRoutes />
        }
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
