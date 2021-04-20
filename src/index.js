import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {useHistory} from "react-router";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import {Provider} from 'react-redux';
import createStore from './store/createStore';
import {ToastProvider} from 'react-toast-notifications';

import "assets/styles/tailwind.css";

// layouts

const Admin = React.lazy(() => import('./layouts/Admin'));
const Auth = React.lazy(() => import('./layouts/Auth'));

// views without layouts

const Landing = React.lazy(() => import('./views/Landing'));
const Profile = React.lazy(() => import('./views/Profile'));
const Index = React.lazy(() => import('./views/Index'));

// redux store

const store = createStore({});

export let customHistory = null

function App() {
  customHistory = useHistory()
  return(
    <Suspense fallback={<div>Загрузка...</div>}>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/auth" component={Auth} />
        <Route path="/admin" component={Admin} />
        {/* add routes without layouts */}
        <PrivateRoute path="/landing" component={Landing}/>
        <PrivateRoute path="/profile" component={Profile}/>

        <Route path="/" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </Suspense>
    )
}

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <Router>
        <App />
      </Router>
    </ToastProvider>
  </Provider>,
  document.getElementById("root")
);
