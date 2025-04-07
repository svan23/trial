import "bootstrap/dist/css/bootstrap.css";

import { Outlet } from "react-router"

function App() {

  return (
    <>
      <div className="container">
      <Outlet />
      </div>
    </>
  );
}

export default App;
