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

    const isAllowed = allowedTypes.includes(type);

    const accessibleRoute =
      token && isAllowed ? children : <Navigate to="/login" replace={true} />;

    return accessibleRoute;
  } else {

    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectedDoctorRoute;
