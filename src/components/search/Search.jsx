import chroma from "chroma-js";
import { useCallback, useState, useRef } from "react";
import AsyncSelect from "react-select/async";
import { geoApiOptions } from "../../api";
import debounce from "lodash.debounce"; // Import debounce

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    margin: "1rem 0",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma("blue");
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled ? "#ccc" : isSelected ? "white" : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot(), color: "white" }),
  placeholder: (styles) => ({ ...styles, ...dot("#FFF"), color: "#FFF" }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.color),
    color: "white",
    marginLeft: "0.1rem",
  }),
};

export default function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceFetchRef = useRef(null); // Reference for debounced function

  // Initialize debounce only once and reset it when needed
  const initializeDebouncedFetch = () => {
    debounceFetchRef.current = debounce(async (inputValue, callback) => {
      if (!inputValue) return;

      setIsLoading(true); // Set loading before API call
      try {
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${inputValue}`,
          geoApiOptions
        );

        if (!response.ok) {
          throw new Error("API Request Failed"); // Handle failed requests
        }

        const data = await response.json();
        const options = data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }));
        callback(options);
      } catch (error) {
        console.error("Failed To Load Cities:", error);
        callback([]); // Provide an empty array if the request fails
      } finally {
        setIsLoading(false); // Stop loading after the API call completes
      }
    }, 1000); // Delay of 1 second
  };

  // Reset debounce on component mount and when necessary
  const loadOptions = useCallback((inputValue, callback) => {
    if (!debounceFetchRef.current) {
      initializeDebouncedFetch(); // Initialize debounce if not already
    }
    debounceFetchRef.current(inputValue, callback); // Call debounced function
  }, []);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <>
      <AsyncSelect
        placeholder="Search For A City"
        cacheOptions={false} // Disable caching to prevent stale options
        loadOptions={loadOptions}
        styles={colourStyles}
        value={search}
        onChange={handleOnChange}
        isLoading={isLoading} // Show loading indicator while fetching
      />
    </>
  );
}
