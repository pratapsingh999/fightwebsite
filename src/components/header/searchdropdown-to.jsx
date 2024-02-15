import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./searchdropdown.css";

const Citys = [
  {
    name: "Mumbai",
    cityCode: "BOM",
  },
  {
    name: "Chennai",
    cityCode: "MAA",
  },
  {
    name: "Delhi",
    cityCode: "DEL",
  },
];

export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return Citys.filter((City) => regex.test(City.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}

export function SearchdropdownTo({ DestinationCity }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    DestinationCity(newValue);
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Destination City",
    value,
    onChange,
    onFocus: () => {
      let elem = document.getElementsByClassName(
        "react-autosuggest__container"
      );
      elem[0].classList.add("react-autosuggest__container-is-focused");
    },
    onBlur: () => {
      let elem = document.getElementsByClassName(
        "react-autosuggest__container"
      );
      elem[0].classList.remove("react-autosuggest__container-is-focused");
    },
  };

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        id="prasun"
      />
      <div aria-hidden="true" className="indicator">
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="css-19bqh2r"
        >
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </div>
    </>
  );
}
