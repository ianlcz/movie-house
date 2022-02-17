import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import routes from "./routes";
import { fetchMovies } from "./store/effects/movies.effects";
import { store } from "./store/store";

const App = () => (
  <Provider store={store}>
    <Routes>
      {routes.map((r) =>
        r.isProtected ? (
          <Route exact element={<ProtectedRoute />} key={r.path}>
            <Route exact path={r.path} element={r.component} />
          </Route>
        ) : (
          <Route exact path={r.path} element={r.component} key={r.path} />
        ),
      )}
    </Routes>
  </Provider>
);

export default App;
