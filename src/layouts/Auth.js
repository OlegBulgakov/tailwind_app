import React, {Suspense} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

const Login = React.lazy(() => import('../views/auth/Login'));
const Register = React.lazy(() => import('../views/auth/Register'));

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          />
          <Suspense fallback={<div>Загрузка...</div>}>
            <Switch>
              <Route path="/auth/login" exact component={Login}/>
              <Route path="/auth/register" exact component={Register}/>
              <Redirect from="/auth" to="/auth/login"/>
            </Switch>
          </Suspense>
          <FooterSmall absolute/>
        </section>
      </main>
    </>
  );
}
