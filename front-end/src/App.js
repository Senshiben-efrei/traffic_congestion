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

      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">GeoCell</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* <!-- Page content here --> */}


          <h1 className='self-center text-4xl font-bold pt-2'>App</h1>
          <div className=' p-5 self-center' >
            <MapContainer center={center} zoom={11} scrollWheelZoom={true} className='rounded-lg'>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=XUsL1AmkUL4FXM0DB8aZ" //vttps://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png        
                />

                
              {point2.map((point, index) => (
                <Polyline key={index} pathOptions={{ color : point.color}} positions={point.coords} />
              ))}


              <Marker position={startPoint} />

              
              <Startmarker />
              <Endmarker />
              
            </MapContainer>
          </div>

          <div className="flex w-3/5 self-center">
            <div className="grid h-auto flex-grow card bg-base-300 rounded-box place-items-center">
              <div className="flex flex-col w-36">
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center">Start point</div> 
                <div className="divider"></div> 
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center">{startPoint['lat'] + ' , ' + startPoint['lng']}</div>
              </div>
            </div>

            <div className="divider divider-horizontal">►</div>

            <div className="grid h-auti flex-grow card bg-base-300 rounded-box place-items-center">
              <div className="flex flex-col w-36">
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center">End point</div> 
                <div className="divider"></div> 
                <div className="grid h-20 card bg-base-300 rounded-box place-items-center">{endPoint['lat'] + ' , ' + endPoint['lng']}</div>
              </div>
            </div>
          </div>

        </div> 

        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
            
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
