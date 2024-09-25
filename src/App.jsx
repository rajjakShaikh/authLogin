import "./App.css";
// import Formvalidate from "./components/formvalidate";
import Tenstackexample from "./components/tenstackexample";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Protectedroute from "./components/services/protectedroute";
// import DataTablecomp from "./components/datatablecomp";
// import Create from "./components/create";
// import Test from "./components/test";
import ToggleApihit from "./components/toggleApihit";
import Test from "./components/test";
// import Swrtest from "./components/swrtest";
// import LiftingState from "./components/liftingstate";

function App() {
  return (
    <>
      {/* <Formvalidate /> */}
      {/* <Tenstackexample /> */}
      {/* <Swrtest /> */}
      {/* <DataTablecomp /> */}
      {/* <Create />
      <ToggleApihit /> */}
      {/* <LiftingState /> */}
      {/* <ToggleApihit /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* protected Routes  */}
          <Route path="/" element={<Protectedroute />}>
            <Route path="/" element={<Tenstackexample />} />
            <Route path="/test" element={<ToggleApihit />} />
            <Route path="/memotest" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
