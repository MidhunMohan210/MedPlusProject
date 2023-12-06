/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedDoctorRoute = ({ children, allowedTypes }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { user } = useContext(authContext);
  const user=JSON.parse(localStorage.getItem('doctorInfo'))

  console.log(user);
  console.log(allowedTypes);
  if (user) {
    const type = user.type;
    const token = user.token;

    // eslint-disable-next-line react/prop-types
    const isAllowed = allowedTypes.includes(type);

    const accessibleRoute =
      token && isAllowed ? children : <Navigate to="/doctors/login" replace={true} />;

    return accessibleRoute;
  } else {

    return <Navigate to="/doctors/login" replace={true} />;
  }
};

export default ProtectedDoctorRoute;
