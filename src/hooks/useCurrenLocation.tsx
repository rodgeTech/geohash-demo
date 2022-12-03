import { useState, useEffect } from "react";

// Define the type of the location as an array of two numbers.
export type Coords = { latitude: number; longitude: number };

const key = "coords";

// Define the type of the key and defaultValue arguments as strings.
export const useCurrentLocation = () => {
  const [location, setLocation] = useState<Coords>();
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(key)) {
      const savedLocation: Coords = JSON.parse(localStorage.getItem(key)!);
      setLocation({
        latitude: savedLocation.latitude,
        longitude: savedLocation.longitude,
      });
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        localStorage.setItem(
          key,
          JSON.stringify({
            latitude: coords.latitude,
            longitude: coords.longitude,
          })
        );
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      });
    }
    setLoadingLocation(false);
  }, []);

  return { location, loadingLocation };
};
