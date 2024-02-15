import {
  faArrowRight,
  faBed,
  faCalendarDays,
  faCar,
  faCity,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { App } from "./searchdropdown.jsx";
import "./header.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import React from "react";
import { SearchdropdownTo } from "./searchdropdown-to.jsx";

const Header = ({ setState }) => {
  const [startDate, setStartDate] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;
  const [searchResults, setSearchResults] = useState([]); // Move the declaration above its usage
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const SourceCity = (data) => {
    console.log(data, "SourceCity");
    setSourceCity(data);
  };

  const DestinationCity = (data) => {
    console.log(data, "DestinationCity");
    setDestinationCity(data);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleCitySelect = (city) => {
  //   setSourceCity(city);
  // };

  // const destinationCitySelect = (citys) => {
  //   setDestinationCity(citys);
  // };

  const handleSearch = async (event) => {
    try {
      const formattedDate = startDate.toISOString().split("T")[0]; // Format date as 'YYYY-MM-DD'
      const apiUrl = `https://api.npoint.io/4829d4ab0e96bfab50e7`;
      // ?sourcecity=${sourceCity}&destinationcity=${destinationCity}&date=${formattedDate}

      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setSearchResults(data.data.result);

      const filteredResults = data.data.result.filter((result) => {
        if (
          result.displayData.source.airport.cityName === sourceCity &&
          result.displayData.destination.airport.cityName === destinationCity
        ) {
          return result;
        }
      });
      console.log(filteredResults, "filteredResults");
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="headerContainer">
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>
          <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
          <p className="headerDesc">
            Get rewarded for your travels – unlock instant savings of 10% or
            more with a free Lamabooking account
          </p>
          <button className="headerBtn">Sign in / Register</button>
          <div>{/* <FlightSearch/> */}</div>

          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCity} className="headerIcon" />
              <App
                className="headerSearchInput"
                SourceCity={SourceCity}
                // onChange={(e) => setSourceCity(e.target.value)}
              />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCity} className="headerIcon" />
              <SearchdropdownTo
                className="headerSearchInput"
                DestinationCity={DestinationCity}
                // onChange={(e) => setDestinationCity(e.target.value)}
              />
            </div>

            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="headerSearchInput"
              />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPerson} className="headerIcon" />
              <span></span>
            </div>
            <div>
              <button className="headerBtn" onClick={handleSearch}>
                Search Flight
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="headerList">
        <div class="flight-ticket-card">
          <div class="airline-logo">
            <img
              src="//www.skyscanner.net/images/airlines/favicon/0S.png"
              alt="SpiceJet"
              width="50"
            />
          </div>
          <div class="flight-details">
            <p>Flight with - {result.displayData.airlines[0].airlineName}</p>
            <p>
              Departing from {result.displayData.source.airport.cityName} at
              {result.displayData.destination.arrTime.slice(11, 16)}, arriving
              in {result.displayData.destination.airport.cityName} at{" "}
              {result.displayData.source.depTime.slice(11, 16)}
            </p>
            <p>{result.displayData.totalDuration}</p>
          </div>
          <div class="price">
            <h1>{`Rs. ${result?.fare}`}</h1>
            <button class="select-button">Book Flight</button>
          </div>
        </div>
      </div> */}

      <div>
        {currentResults && (
          <div className="">
            {currentResults.map((result, index) => (
              <div className="" key={index}>
                <div class="flight-ticket-card">
                  <div class="airline-logo">
                    <img
                      src="//www.skyscanner.net/images/airlines/favicon/0S.png"
                      alt="SpiceJet"
                      width="50"
                    />
                  </div>
                  <div class="flight-details">
                    <p>{result.displayData.airlines[0].airlineName}</p>
                    <p>
                      {" "}
                      {result.displayData.source.airport.cityName}{" "}
                      {"---------------------> "}{" "}
                      {result.displayData.destination.airport.cityName}
                    </p>
                    <p>
                      Deoarture At{" "}
                      {result.displayData.source.depTime.slice(11, 16)}{" "}
                      {"---> "}Arrival At{" "}
                      {result.displayData.destination.arrTime.slice(11, 16)}
                    </p>

                    <p>Durarion: {result.displayData.totalDuration}</p>
                  </div>
                  <div class="price">
                    <h1>{`Rs. ${result?.fare}`}</h1>
                    <button class="select-button">Book Flight</button>
                  </div>
                </div>
              </div>
              // <div className="searchResultCard" key={index}>
              //   <div className="">
              //     <div className="headerContainers">
              //       <div className="headerList">
              //         <div className="headerListItem">
              //           <p>{result.displayData.airlines[0].airlineName}</p>
              //           <br />
              //           <p>{result.displayData.airlines[0].flightNumber}</p>
              //         </div>
              //         <div className="headerListItem">
              //           <h4>
              //             {/* {" "} */}
              //             {result.displayData.source.airport.cityName}
              //             <br />
              //             {/* <br /> */}
              //             {/* {result.displayData.destination.airport.cityCode} */}
              //             <br />
              //             <br />
              //             {result.displayData.destination.arrTime.slice(11, 16)}
              //             <br />
              //           </h4>
              //         </div>

              //         <div className="headerListItem">
              //           <p>
              //             {result.displayData.totalDuration}
              //             <br />
              //             {/* "fa-light fa-arrow-right" */}
              //             <FontAwesomeIcon
              //               icon={faArrowRight}
              //               // style={{ fontSize: "2em" }}
              //               className="headerIcons"
              //             />
              //             {result.displayData.stopInfo}
              //           </p>
              //         </div>

              //         <div className="headerListItem">
              //           <h4>
              //             {result.displayData.destination.airport.cityName}
              //             <br />
              //             {/* <br /> */}
              //             {/* {result.displayData.source.airport.cityCode} */}
              //             <br /> <br />{" "}
              //             {result.displayData.source.depTime.slice(11, 16)}
              //             <br />
              //           </h4>
              //         </div>
              //         <div className="headerListItem">
              //           <button className="headerBtn">
              //             {`Rs. ${result?.fare}`}
              //           </button>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          {searchResults.length > resultsPerPage && (
            <>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt; Prev
              </button>
              <p>
                {Array(Math.ceil(searchResults.length / resultsPerPage))
                  .fill()
                  .map((_, i) => (
                    <p key={i}>
                      {/* <button onClick={() => paginate(i + 1)}>{i + 1}</button> */}
                      <button
                        onClick={() => paginate(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                      >
                        {i + 1}
                      </button>
                    </p>
                  ))}
              </p>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(searchResults.length / resultsPerPage)
                }
              >
                Next &gt;
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

/* <Controller
              name={`${name}.${index}.source_city`}
              control={control}
              render={({ field }) => (
                <FormControl className="headerSearchInput">
                  <InputLabel id={`source_city-${index}`}>
                    source_city
                  </InputLabel>
                  <Select
                    labelId={`source_city-${index}`}
                    id={`source_city-${index}`}
                    {...field}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            /> */

// const handleSearch = async () => {
//   try {
//     const formattedDate = startDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
//     const apiUrl = `https://api.npoint.io/4829d4ab0e96bfab50e7?sourcecity=${sourceCity}&destinationcity=${destinationCity}&date=${formattedDate}`;

//     // Fetch data from API using apiUrl
//     console.log('Fetching data from:', apiUrl);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

{
  /* <input
                type="text"
                placeholder="Destination City"
                className="headerSearchInput"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
              /> */
}
{
  /* <select
                className="headerSearchInput"
                value={sourceCity}
                onChange={(e) => setDestinationCity(e.target.value)}
              >
                <option value="">Select Source City</option>
                {options1.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select> */
}

{
  /* <h2>
                  <p>
                    airlineName - {result.displayData.airlines[0].airlineName}
                  </p>
                  <br />
                  <p>
                    flightNumber- {result.displayData.airlines[0].flightNumber}
                  </p>
                </h2> */
}
{
  /* <p>
                  {result.displayData.destination.airport.cityName}{" "}
                  {result.displayData.destination.airport.cityCode}{" "}
                  {result.displayData.destination.arrTime}
                </p> */
}
{
  /* <p>
                  {result.displayData.source.airport.cityName}{" "}
                  {result.displayData.source.airport.cityCode}{" "}
                  {result.displayData.source.depTime}
                  {result.displayData.totalDuration}
                </p> */
}
{
  /* <button variant="contained" color="primary">
                  {`Rs. ${result?.fare}`}
                </button> */
}
