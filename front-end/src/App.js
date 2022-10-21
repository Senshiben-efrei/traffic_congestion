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
  const [startPoint, setStart] = useState({lat: 39.93132681455846, lng: 116.31431579589845})
  const [endPoint, setEnd] = useState({lat: 39.868905071098865, lng: 116.43585205078126})
  const [Tracker, setstacker] = useState(center)
  const [data, setDtata] = useState(null)

  const datato = [
    {
      "portions": [
        {
          "portion": 0,
          "start": {
            "latitude": 39.933062,
            "longitude": 116.37302
          },
          "end": {
            "latitude": 39.931898000000004,
            "longitude": 116.37362
          },
          "color": "green"
        },
        {
          "portion": 1,
          "start": {
            "latitude": 39.931632,
            "longitude": 116.38449399999999
          },
          "end": {
            "latitude": 39.931998,
            "longitude": 116.416516
          },
          "color": "red"
        },
        {
          "portion": 2,
          "start": {
            "latitude": 39.926849999999995,
            "longitude": 116.427584
          },
          "end": {
            "latitude": 39.91104,
            "longitude": 116.428766
          },
          "color": "red"
        },
        {
          "portion": 3,
          "start": {
            "latitude": 39.906014,
            "longitude": 116.42913399999999
          },
          "end": {
            "latitude": 39.906746,
            "longitude": 116.429056
          },
          "color": "green"
        },
        {
          "portion": 4,
          "start": {
            "latitude": 39.907014000000004,
            "longitude": 116.429322
          },
          "end": {
            "latitude": 39.907086,
            "longitude": 116.430198
          },
          "color": "green"
        },
        {
          "portion": 5,
          "start": {
            "latitude": 39.907050000000005,
            "longitude": 116.44037200000001
          },
          "end": {
            "latitude": 39.90687,
            "longitude": 116.470018
          },
          "color": "red"
        },
        {
          "portion": 6,
          "start": {
            "latitude": 39.90663,
            "longitude": 116.480362
          },
          "end": {
            "latitude": 39.90609,
            "longitude": 116.481748
          },
          "color": "green"
        },
        {
          "portion": 7,
          "start": {
            "latitude": 39.905282,
            "longitude": 116.482502
          },
          "end": {
            "latitude": 39.903397999999996,
            "longitude": 116.483378
          },
          "color": "orange"
        },
        {
          "portion": 8,
          "start": {
            "latitude": 39.897348,
            "longitude": 116.48364000000001
          },
          "end": {
            "latitude": 39.881082,
            "longitude": 116.48355
          },
          "color": "green"
        },
        {
          "portion": 9,
          "start": {
            "latitude": 39.869966000000005,
            "longitude": 116.482504
          },
          "end": {
            "latitude": 39.852883999999996,
            "longitude": 116.479456
          },
          "color": "red"
        },
        {
          "portion": 10,
          "start": {
            "latitude": 39.846316,
            "longitude": 116.479348
          },
          "end": {
            "latitude": 39.843694,
            "longitude": 116.482072
          },
          "color": "orange"
        },
        {
          "portion": 11,
          "start": {
            "latitude": 39.842864000000006,
            "longitude": 116.481928
          },
          "end": {
            "latitude": 39.842996,
            "longitude": 116.478772
          },
          "color": "green"
        },
        {
          "portion": 12,
          "start": {
            "latitude": 39.842762,
            "longitude": 116.47767
          },
          "end": {
            "latitude": 39.841928,
            "longitude": 116.47752
          },
          "color": "green"
        }
      ],
      "route": [
        {
          "start": {
            "latitude": 39.93345,
            "longitude": 116.37282
          },
          "end": {
            "latitude": 39.93151,
            "longitude": 116.37382
          }
        },
        {
          "start": {
            "latitude": 39.93151,
            "longitude": 116.37382
          },
          "end": {
            "latitude": 39.93212,
            "longitude": 116.42719
          }
        },
        {
          "start": {
            "latitude": 39.93212,
            "longitude": 116.42719
          },
          "end": {
            "latitude": 39.90577,
            "longitude": 116.42916
          }
        },
        {
          "start": {
            "latitude": 39.90577,
            "longitude": 116.42916
          },
          "end": {
            "latitude": 39.90699,
            "longitude": 116.42903
          }
        },
        {
          "start": {
            "latitude": 39.90699,
            "longitude": 116.42903
          },
          "end": {
            "latitude": 39.90711,
            "longitude": 116.43049
          }
        },
        {
          "start": {
            "latitude": 39.90711,
            "longitude": 116.43049
          },
          "end": {
            "latitude": 39.90681,
            "longitude": 116.4799
          }
        },
        {
          "start": {
            "latitude": 39.90681,
            "longitude": 116.4799
          },
          "end": {
            "latitude": 39.90591,
            "longitude": 116.48221
          }
        },
        {
          "start": {
            "latitude": 39.90591,
            "longitude": 116.48221
          },
          "end": {
            "latitude": 39.90277,
            "longitude": 116.48367
          }
        },
        {
          "start": {
            "latitude": 39.90277,
            "longitude": 116.48367
          },
          "end": {
            "latitude": 39.87566,
            "longitude": 116.48352
          }
        },
        {
          "start": {
            "latitude": 39.87566,
            "longitude": 116.48352
          },
          "end": {
            "latitude": 39.84719,
            "longitude": 116.47844
          }
        },
        {
          "start": {
            "latitude": 39.84719,
            "longitude": 116.47844
          },
          "end": {
            "latitude": 39.84282,
            "longitude": 116.48298
          }
        },
        {
          "start": {
            "latitude": 39.84282,
            "longitude": 116.48298
          },
          "end": {
            "latitude": 39.84304,
            "longitude": 116.47772
          }
        },
        {
          "start": {
            "latitude": 39.84304,
            "longitude": 116.47772
          },
          "end": {
            "latitude": 39.84165,
            "longitude": 116.47747
          }
        }
      ]
    },
    {
      "portions": [
        {
          "portion": 0,
          "start": {
            "latitude": 39.933062,
            "longitude": 116.37302
          },
          "end": {
            "latitude": 39.931898000000004,
            "longitude": 116.37362
          },
          "color": "green"
        },
        {
          "portion": 1,
          "start": {
            "latitude": 39.93164,
            "longitude": 116.38123399999999
          },
          "end": {
            "latitude": 39.932030000000005,
            "longitude": 116.403476
          },
          "color": "red"
        },
        {
          "portion": 2,
          "start": {
            "latitude": 39.923158,
            "longitude": 116.411254
          },
          "end": {
            "latitude": 39.896152,
            "longitude": 116.412346
          },
          "color": "red"
        },
        {
          "portion": 3,
          "start": {
            "latitude": 39.886345999999996,
            "longitude": 116.413064
          },
          "end": {
            "latitude": 39.883934,
            "longitude": 116.414126
          },
          "color": "orange"
        },
        {
          "portion": 4,
          "start": {
            "latitude": 39.877664,
            "longitude": 116.414738
          },
          "end": {
            "latitude": 39.861266,
            "longitude": 116.41551199999999
          },
          "color": "red"
        },
        {
          "portion": 5,
          "start": {
            "latitude": 39.85614,
            "longitude": 116.42074799999999
          },
          "end": {
            "latitude": 39.85716,
            "longitude": 116.435682
          },
          "color": "orange"
        },
        {
          "portion": 6,
          "start": {
            "latitude": 39.858012,
            "longitude": 116.441946
          },
          "end": {
            "latitude": 39.859548,
            "longitude": 116.445804
          },
          "color": "orange"
        },
        {
          "portion": 7,
          "start": {
            "latitude": 39.860057999999995,
            "longitude": 116.447612
          },
          "end": {
            "latitude": 39.860052,
            "longitude": 116.449178
          },
          "color": "green"
        },
        {
          "portion": 8,
          "start": {
            "latitude": 39.858272,
            "longitude": 116.45199600000001
          },
          "end": {
            "latitude": 39.852938,
            "longitude": 116.458884
          },
          "color": "green"
        },
        {
          "portion": 9,
          "start": {
            "latitude": 39.848294,
            "longitude": 116.464258
          },
          "end": {
            "latitude": 39.839695999999996,
            "longitude": 116.473492
          },
          "color": "orange"
        },
        {
          "portion": 10,
          "start": {
            "latitude": 39.83643,
            "longitude": 116.475816
          },
          "end": {
            "latitude": 39.835229999999996,
            "longitude": 116.47355400000001
          },
          "color": "green"
        },
        {
          "portion": 11,
          "start": {
            "latitude": 39.835584,
            "longitude": 116.474002
          },
          "end": {
            "latitude": 39.837846,
            "longitude": 116.477608
          },
          "color": "green"
        },
        {
          "portion": 12,
          "start": {
            "latitude": 39.83921,
            "longitude": 116.47854199999999
          },
          "end": {
            "latitude": 39.84104,
            "longitude": 116.477738
          },
          "color": "green"
        }
      ],
      "route": [
        {
          "start": {
            "latitude": 39.93345,
            "longitude": 116.37282
          },
          "end": {
            "latitude": 39.93151,
            "longitude": 116.37382
          }
        },
        {
          "start": {
            "latitude": 39.93151,
            "longitude": 116.37382
          },
          "end": {
            "latitude": 39.93216,
            "longitude": 116.41089
          }
        },
        {
          "start": {
            "latitude": 39.93216,
            "longitude": 116.41089
          },
          "end": {
            "latitude": 39.88715,
            "longitude": 116.41271
          }
        },
        {
          "start": {
            "latitude": 39.88715,
            "longitude": 116.41271
          },
          "end": {
            "latitude": 39.88313,
            "longitude": 116.41448
          }
        },
        {
          "start": {
            "latitude": 39.88313,
            "longitude": 116.41448
          },
          "end": {
            "latitude": 39.8558,
            "longitude": 116.41577
          }
        },
        {
          "start": {
            "latitude": 39.8558,
            "longitude": 116.41577
          },
          "end": {
            "latitude": 39.8575,
            "longitude": 116.44066
          }
        },
        {
          "start": {
            "latitude": 39.8575,
            "longitude": 116.44066
          },
          "end": {
            "latitude": 39.86006,
            "longitude": 116.44709
          }
        },
        {
          "start": {
            "latitude": 39.86006,
            "longitude": 116.44709
          },
          "end": {
            "latitude": 39.86005,
            "longitude": 116.4497
          }
        },
        {
          "start": {
            "latitude": 39.86005,
            "longitude": 116.4497
          },
          "end": {
            "latitude": 39.85116,
            "longitude": 116.46118
          }
        },
        {
          "start": {
            "latitude": 39.85116,
            "longitude": 116.46118
          },
          "end": {
            "latitude": 39.83683,
            "longitude": 116.47657
          }
        },
        {
          "start": {
            "latitude": 39.83683,
            "longitude": 116.47657
          },
          "end": {
            "latitude": 39.83483,
            "longitude": 116.4728
          }
        },
        {
          "start": {
            "latitude": 39.83483,
            "longitude": 116.4728
          },
          "end": {
            "latitude": 39.8386,
            "longitude": 116.47881
          }
        },
        {
          "start": {
            "latitude": 39.8386,
            "longitude": 116.47881
          },
          "end": {
            "latitude": 39.84165,
            "longitude": 116.47747
          }
        }
      ]
    }
  ]

  function fetchRoute() {
    fetch('http://127.0.0.1:5000/api')
        .then(response => response.json())
        .then(data => {console.log(data)
          setDtata(data)});
  }

  // create a async function to fetch data from the API
  async function fetchData() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickup_lat : startPoint['lat'], pickup_lon : startPoint['lng'], dropoff_lat  : endPoint['lat'], dropoff_lon  : endPoint['lng'], hour: 12 })
    };

    console.log(requestOptions['body'])

    const response = await fetch('http://127.0.0.1:5000/machine_learning', requestOptions);
    setDtata(await response.json());
    const text = await response.text();
    console.log(text);
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
                  <Polyline key={index} pathOptions={{ color : 'blue'}} positions={[[point[0]['route']['start']['latitude'],point[0]['route']['start']['longitude']],[point[0]['route']['end']['latitude'],point[0]['route']['end']['longitude']]]} />
                ))}

                {/* {data && data['portions'].map((point, index) => (
                  <Polyline key={index} pathOptions={{ color : point['color']}} positions={[[point['start']['latitude'],point['start']['longitude']],[point['end']['latitude'],point['end']['longitude']]]} />
                ))} */}

                {data && data.map((point, index) => (
                  <Polyline key={index} pathOptions={{ color : point[0]['portions']['color']}} positions={[[point[0]['portions']['start']['latitude'],point[0]['portions']['start']['longitude']],[point[0]['portions']['end']['latitude'],point[0]['portions']['end']['longitude']]]} />
                ))}


                <Marker position={startPoint} />

                
                <Startmarker />
                <Endmarker />
                
              </MapContainer>
            </div>
          </div>

          <h3 className='mt-4 font-bold self-center'>Duration   {data && Math.floor(data['duration'][0]/60)} min {data && data['duration'][0]%60} sec</h3>
          // turn seconds to minutes

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

            <button className="btn btn-primary" onClick={fetchData}>Compute</button>
            
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
