import { useLocation } from "react-router";

const LocationDetails = () => {
  const location = useLocation();
  console.log(location.state);
  return <div></div>;
};
export default LocationDetails;
