import {Route, Redirect} from "react-router-dom";
import {isAuthUser} from "../../utils/AuthService";

export default function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthUser() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
}