import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      fontWeight: "900",
      whiteSpace: "nowrap",
      fontSize: "13px",
      color: "#ffffff",
    }}
  >
    <i
      className="fa fa-map-marker mr-2 fa-3x"
      aria-hidden="true"
      style={{ color: "red" }}
    ></i>
    {text}
  </div>
);

export default function GMap() {
  const defaultProps = {
    center: {
      lat: 37.48510332112991,
      lng: -121.92585771891232,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "100%" }}>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={37.485103320129966}
          lng={-121.92788771891232}
          text="161 Mission Falls Lane, Fremont"
        />
      </GoogleMapReact> */}
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            width="100%"
            height="350"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=161%20mission%20falls%20ln%20fremont&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            title="maps"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
