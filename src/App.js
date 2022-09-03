// import './App.css';
import Body from "./components/body";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import "./css/sb-admin-2.css";
import "./vendor/fontawesome-free/css/all.min.css"
function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Body />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
