import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import PublicRoutes from "../routes/PublicRoutes";

const AppRouter = () => {
  // authentication process
  const isLoggedIn = true;
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {
          isLoggedIn
            ? <ProtectedRoutes />
            : <PublicRoutes />
        }
      </div>

    </BrowserRouter>
  );
};

export default AppRouter;
