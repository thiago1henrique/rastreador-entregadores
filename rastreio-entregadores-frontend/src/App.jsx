// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [localizacoes, setLocalizacoes] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLocalizacoes((prev) => [
        ...prev.filter((loc) => loc.entregadorId !== data.entregadorId),
        data,
      ]);
    };

    return () => socket.close();
  }, []);

  return (
    <MapContainer
      center={[-23.55052, -46.633308]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {localizacoes.map((loc) => (
        <Marker key={loc.entregadorId} position={[loc.latitude, loc.longitude]}>
          <Popup>
            Entregador: {loc.entregadorId}
            <br />
            Latitude: {loc.latitude}
            <br />
            Longitude: {loc.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
