import React, {useState} from "react";
import { Header } from "../components";
const Geolocation = () => {
  const [details, setDetails] = useState(0);
  const getUserGeoLocationDetails = () => {
    fetch(
      "https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91"
    )
      .then((response) => response.json())
      .then((data) => setDetails(data));
  };

  return (
    <>
      <Header title="Get user IP and location in ReactJs" />
      <div className="row">
        <div className="col text-center">
          <h2>Get location</h2>
          <p className="mt-3">
            <button className="btn-btn-primary" onClick={getUserGeoLocationDetails()}>
              Find my setDetails
            </button>
            <div className="row justify-content-center mt-3">
              <div className="col-lg-6 text-center text-dark">
                {details & <ul className="list-group">
                  <li className="list-group-item">
                    Location: {`${details.city},${details.country_name}(${details.country_code})`}
                    {`${details.city},${details.country_name}(${details.country_code})`}
                  </li>
                  <li className="list-group-item">IP {details.IPV4}</li>
                </ul>}
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};
export default Geolocation;
