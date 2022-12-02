import { Routes, BrowserRouter } from "react-router-dom";
import routes, { renderRoutes } from "routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default App;
