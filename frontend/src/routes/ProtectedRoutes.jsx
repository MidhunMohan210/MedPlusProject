import { Navigate } from "react-router-dom";

const protectedRoute = ({ children, allowedTypes }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user=JSON.parse(localStorage.getItem('PatientInfo'))

  console.log(user);
  console.log(allowedTypes);
  if (user) {
    const type = user.type;
    const token = user.token;

    const isAllowed = allowedTypes.includes(type);

    const accessibleRoute =
      token && isAllowed ? children : <Navigate to="/users/login" replace={true} />;

    return accessibleRoute;
  } else {

    return <Navigate to="/users/login" replace={true} />;
  }
};

export default protectedRoute;
