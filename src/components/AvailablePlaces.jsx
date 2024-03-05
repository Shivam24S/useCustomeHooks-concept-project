import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { FetchAvailablePlaces } from "./Http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
  const places = await FetchAvailablePlaces();
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       setAvailablePlaces(responseData.places);
  //     });
  // }, []);

  // using custom hook

  const {
    isLoading,
    error,
    fetchedData: availablePlaces,
  } = useFetch({
    FetchFn: fetchSortedPlaces,
    initialValue: [],
  });

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
