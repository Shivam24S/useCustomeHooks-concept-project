import Places from "./Places";

export async function FetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  // if error occurred handling error
  if (!response.ok) {
    throw new Error("something went wrong");
  }
  const responseData = await response.json();

  return responseData.places;
}

export async function userUpdatePlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("can't able upload an error occurred");
  }

  const responseData = await response.json();

  return responseData.message;
}

export async function UserSelectPlacesData() {
  const response = await fetch("http://localhost:3000/user-places");
  const responseData = await response.json();
  return responseData.places;
}
