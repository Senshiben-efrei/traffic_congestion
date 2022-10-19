import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet';
import { useState, useRef, useMemo, useCallback } from 'react'

function App() {

  const startIcon = Leaflet.divIcon({
    className: "my-custom-pin",
    iconAnchor: [-7, 15],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="
    background-color: #b52438;
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF" />`
  })

  const endIcon = Leaflet.divIcon({
    className: "my-custom-pin",
    iconAnchor: [-7, 15],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="
    background-color: #44b51b;
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF" />`
  })

  const center = {lat: 39.92026958978369, lng: 116.39740004226684}
  const [startPoint, setStart] = useState(center)
  const [endPoint, setEnd] = useState(center)
  const [Tracker, setstacker] = useState(center)
  const [data, setDtata] = useState(null)
  const points = [
    { 
      coords: [[39.93212, 116.42719],[39.90577, 116.42916]],
      color: 'red'
    },
    { 
      coords: [[39.93312, 116.42819],[39.90677, 116.43016]],
      color: 'blue'
    }
  ]
  const point2 = [
    {
    coords: [[39.93345, 116.37282],[39.93151, 116.37382]],
    color: 'red'
    },
    {
    coords: [[39.93151, 116.37382],[39.93212, 116.42719]],
    color: 'orange'
    },
    {
    coords: [[39.93212, 116.42719],[39.90577, 116.42916]],
    color: 'blue'
    },
    {
    coords: [[39.90577, 116.42916],[39.90699, 116.42903]],
    color: 'green'
    },
    {
    coords: [[39.90699, 116.42903],[39.90711, 116.43049]],
    color: 'red'
    }
  ]

  function fetchRoute() {
    fetch('http://10.23.215.103:5000/api')
        .then(response => response.json())
        .then(data => setDtata(data));
  }


  function Startmarker() {
    const [draggable, setDraggable] = useState(true)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setStart(marker.getLatLng())
            console.log(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
      <Marker icon={startIcon}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={startPoint}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
  }

  function Endmarker() {
    const [draggable, setDraggable] = useState(true)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setEnd(marker.getLatLng())
            console.log(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
      <Marker icon={endIcon}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={endPoint}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
  }

  return (
    <div className="">

      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-5xl">
          <h3 className="font-bold text-lg">Welcome to GeoCell !</h3>
          <p className="py-4 text-justify">
            A machine learning based platform made to compute the best way to go from a localisation to an other taking in concideration trafic conjestion on the roads
            <br/>
            <br/>
            The WebApp is now available for the city of Beijing, China, and the dataset used to train the model is from 10,300+ taxis that collectet a total of 17,662,984 GPS points.
            <br/>
            <br/>
            To use it just move the markers on the map to set the  <nobr className='text-red-500'>Start</nobr>  and  <nobr className='text-green-500'>End</nobr> point of your trip, then click on the "Compute" button to get the best route.
            <br/>
            <br/>
            To see the details of your trip click on the drawer icon on the top left and for more information about the project click on the "Github" button on the top right.
            <br/>
            <br/>
            <b>Have Fun !</b>
          
          </p>

          <div className="modal-action">
            <label htmlFor="my-modal-5" className="btn">Yay!</label>
          </div>
        </div>
      </div>

      <div className="navbar bg-primary">
        <div className="navbar-start">
          <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
        </div>
        <div className="navbar-center">
          <label className="btn btn-ghost normal-case text-xl modal-button text-white" htmlFor="my-modal-5">
            <img className="w-8 h-8 rounded-full mr-2" src="https://cdn.discordapp.com/attachments/1015252420277846046/1032275581364084827/github-icon_2.png" alt="avatar" />
            GeoCell
            </label>
        </div>
        <div className="navbar-end">
          <a className="btn btn-ghost btn-circle" href='https://github.com/Senshiben-efrei/traffic_congestion' target='none'>
            <img className="w-8 h-8 rounded-full" src="https://cdn.discordapp.com/attachments/1015252420277846046/1032275501944946699/github-icon_1.png" alt="avatar" />
          </a>
          
        </div>
      </div>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* <!-- Page content here --> */}

          <div className="mockup-window border bg-base-300 w-4/5 h-3/4 self-center mt-9">
            <div className="flex justify-center bg-base-200">
              <MapContainer center={center} zoom={11} scrollWheelZoom={true} className='rounded-lg'>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=XUsL1AmkUL4FXM0DB8aZ" //vttps://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png        
                  />

                {data && data.map((point, index) => (
                  <Polyline key={index} pathOptions={{ color : point.color}} positions={point.coords} />
                ))}


                <Marker position={startPoint} />

                
                <Startmarker />
                <Endmarker />
                
              </MapContainer>
            </div>
          </div>

        </div> 

        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}

            <div className="flex flex-col w-full border-opacity-50">
              <div className="divider">Departure localisation</div>
              <div className="grid h-20 card bg-base-300 rounded-box place-items-center text-center">{startPoint['lat'] + ' , ' + startPoint['lng']}</div>
              <div className="divider">Arrival localisation</div>
              <div className="grid h-20 card bg-base-300 rounded-box place-items-center text-center">{endPoint['lat'] + ' , ' + endPoint['lng']}</div>
              <div className="divider">Trip time</div>
              <div className="grid h-20 card bg-base-300 rounded-box place-items-center">XX : XX</div>
            </div>

            <button className="btn btn-primary" onClick={fetchRoute}>Compute</button>
            
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
