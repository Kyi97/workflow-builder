import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SideBar from "./components/SideBar";
import AppRouter from "./routes/Router";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/builder" || location.pathname.includes("/builder/");

  return (
    <Provider store={store}>
      <div className="flex h-screen">
        {!hideSidebar && <SideBar className="fixed" />}
        <div className={!hideSidebar ? "flex-1 md:ml-64 ml-20" : "flex-1"}>
          <AppRouter />
        </div>
      </div>
    </Provider>
  );
};

export default App;
