import { BrowserRouter } from "react-router-dom";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import PublicRoutes from "../routes/PublicRoutes";

const AppRouter = () => {
  // authentication process
  const isLoggedIn = true;
  return (
    <BrowserRouter>
      {
        isLoggedIn
          ? <ProtectedRoutes />
          : <PublicRoutes />
      }
    </BrowserRouter>
  );
};

export default AppRouter;
