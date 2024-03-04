import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { FetchAvailablePlaces } from "./Http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       setAvailablePlaces(responseData.places);
  //     });
  // }, []);

  // now using async await method for fetching this method preferable due to code readability

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsLoading(true);
        // optimizing code Structure moving into another separate file
        const places = await FetchAvailablePlaces();
        // getting user location for sorting places data by distance
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });
      } catch (error) {
        setError({
          message: error.message || "please try again later after sometime",
        });
      }
      setIsLoading(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title={"an error occurred"} message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      isLoading={isLoading}
      loadingText="fetching PlacesData...."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
