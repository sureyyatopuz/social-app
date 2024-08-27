import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter.tsx";
import { Provider } from "react-redux";
import store from "../redux/store.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../resources/assets/global.css"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer />
    <AppRouter />
  </Provider>
);
