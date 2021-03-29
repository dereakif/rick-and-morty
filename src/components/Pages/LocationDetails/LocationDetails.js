import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCharacter } from "rickmortyapi";

const LocationDetails = () => {
  const location = useLocation();
  const [residentsInfo, setResidentsInfo] = useState([]);
  useEffect(() => {
    const residents = getCharacter(
      location.state.residents.map((item) => item.replace(/\D/g, ""))
    );

    /*  residents.then(async (value) =>
      value.constructor === Object
        ? setResidentsInfo([...residentsInfo, value])
        : setResidentsInfo(value)
    ); */
    residents.length > 0 &&
      residents.then(async (value) => setResidentsInfo(value));
    console.log(residentsInfo);
  }, []);
  return <div></div>;
};
export default LocationDetails;
