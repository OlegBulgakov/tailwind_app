import React from "react";
import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoutes/PrivateRoute";

// components

const AdminNavbar = React.lazy(() => import('../components/Navbars/AdminNavbar'));
const Sidebar = React.lazy(() => import('../components/Sidebar/Sidebar'));
const HeaderStats = React.lazy(() => import('../components/Headers/HeaderStats'));
const FooterAdmin = React.lazy(() => import('../components/Footers/FooterAdmin'));

// views

const Dashboard = React.lazy(() => import('../views/admin/Dashboard'));
const Maps = React.lazy(() => import('../views/admin/Maps'));
const Settings = React.lazy(() => import('../views/admin/Settings'));
const Tables = React.lazy(() => import('../views/admin/Tables'));

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <PrivateRoute path="/admin/dashboard" component={Dashboard} />
            <PrivateRoute path="/admin/maps" component={Maps} />
            <PrivateRoute path="/admin/settings" component={Settings} />
            <PrivateRoute path="/admin/tables" component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
