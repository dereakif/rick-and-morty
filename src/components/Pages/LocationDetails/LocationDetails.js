import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCharacter } from "rickmortyapi";

const LocationDetails = () => {
  const location = useLocation();
  useEffect(() => {
    const residents = getCharacter(
      location.state.residents.map((item) => item.replace(/\D/g, ""))
    );
    console.log(residents);
  }, []);
  return <div></div>;
};
export default LocationDetails;
