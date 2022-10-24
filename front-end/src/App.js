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
  const [charging, setCharging] = useState(false)
  const [option, setOption] = useState(1)
  const [hour, setHour] = useState(12)
  const [rideNow, setRideNow] = useState(false)
  const [map, setMap] = useState('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=XUsL1AmkUL4FXM0DB8aZ')
  const [data, setData] = useState(
    [
      {
        "corrected_duration": 26,
        "distance": 18639.4,
        "duration": 956.7,
        "result": {
          "portions": [
            {
              "color": "green",
              "end": {
                "latitude": 39.931062,
                "longitude": 116.31381599999999
              },
              "portion": 0,
              "start": {
                "latitude": 39.931218,
                "longitude": 116.314194
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.930954,
                "longitude": 116.342314
              },
              "portion": 1,
              "start": {
                "latitude": 39.930996,
                "longitude": 116.32084599999999
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.90522,
                "longitude": 116.350286
              },
              "portion": 2,
              "start": {
                "latitude": 39.92451,
                "longitude": 116.349674
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.897582,
                "longitude": 116.349322
              },
              "portion": 3,
              "start": {
                "latitude": 39.898488,
                "longitude": 116.35019799999999
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.896736,
                "longitude": 116.34486199999999
              },
              "portion": 4,
              "start": {
                "latitude": 39.897144000000004,
                "longitude": 116.347988
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.89536,
                "longitude": 116.342732
              },
              "portion": 5,
              "start": {
                "latitude": 39.89629,
                "longitude": 116.343548
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.878762,
                "longitude": 116.342956
              },
              "portion": 6,
              "start": {
                "latitude": 39.890978,
                "longitude": 116.342584
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.870514,
                "longitude": 116.342624
              },
              "portion": 7,
              "start": {
                "latitude": 39.873646,
                "longitude": 116.342966
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.867942,
                "longitude": 116.343574
              },
              "portion": 8,
              "start": {
                "latitude": 39.869088,
                "longitude": 116.342776
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.867176,
                "longitude": 116.34528
              },
              "portion": 9,
              "start": {
                "latitude": 39.867464,
                "longitude": 116.3442
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.866992,
                "longitude": 116.350592
              },
              "portion": 10,
              "start": {
                "latitude": 39.867058,
                "longitude": 116.346878
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.868114,
                "longitude": 116.36048600000001
              },
              "portion": 11,
              "start": {
                "latitude": 39.867256000000005,
                "longitude": 116.353994
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.869392,
                "longitude": 116.376306
              },
              "portion": 12,
              "start": {
                "latitude": 39.868648,
                "longitude": 116.36606400000001
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.870576,
                "longitude": 116.40242400000001
              },
              "portion": 13,
              "start": {
                "latitude": 39.869873999999996,
                "longitude": 116.385396
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.869873999999996,
                "longitude": 116.41122
              },
              "portion": 14,
              "start": {
                "latitude": 39.870576,
                "longitude": 116.40888000000001
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.86988,
                "longitude": 116.41712000000001
              },
              "portion": 15,
              "start": {
                "latitude": 39.869699999999995,
                "longitude": 116.41328
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.869516000000004,
                "longitude": 116.42716
              },
              "portion": 16,
              "start": {
                "latitude": 39.869834,
                "longitude": 116.42059
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.868898,
                "longitude": 116.43245399999999
              },
              "portion": 17,
              "start": {
                "latitude": 39.869282,
                "longitude": 116.430126
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.868994,
                "longitude": 116.435286
              },
              "portion": 18,
              "start": {
                "latitude": 39.868826,
                "longitude": 116.43374399999999
              }
            }
          ],
          "route": [
            {
              "end": {
                "latitude": 39.93101,
                "longitude": 116.31369
              },
              "start": {
                "latitude": 39.93127,
                "longitude": 116.31432
              }
            },
            {
              "end": {
                "latitude": 39.93094,
                "longitude": 116.34947
              },
              "start": {
                "latitude": 39.93101,
                "longitude": 116.31369
              }
            },
            {
              "end": {
                "latitude": 39.89879,
                "longitude": 116.35049
              },
              "start": {
                "latitude": 39.93094,
                "longitude": 116.34947
              }
            },
            {
              "end": {
                "latitude": 39.89728,
                "longitude": 116.34903
              },
              "start": {
                "latitude": 39.89879,
                "longitude": 116.35049
              }
            },
            {
              "end": {
                "latitude": 39.8966,
                "longitude": 116.34382
              },
              "start": {
                "latitude": 39.89728,
                "longitude": 116.34903
              }
            },
            {
              "end": {
                "latitude": 39.89505,
                "longitude": 116.34246
              },
              "start": {
                "latitude": 39.8966,
                "longitude": 116.34382
              }
            },
            {
              "end": {
                "latitude": 39.87469,
                "longitude": 116.34308
              },
              "start": {
                "latitude": 39.89505,
                "longitude": 116.34246
              }
            },
            {
              "end": {
                "latitude": 39.86947,
                "longitude": 116.34251
              },
              "start": {
                "latitude": 39.87469,
                "longitude": 116.34308
              }
            },
            {
              "end": {
                "latitude": 39.86756,
                "longitude": 116.34384
              },
              "start": {
                "latitude": 39.86947,
                "longitude": 116.34251
              }
            },
            {
              "end": {
                "latitude": 39.86708,
                "longitude": 116.34564
              },
              "start": {
                "latitude": 39.86756,
                "longitude": 116.34384
              }
            },
            {
              "end": {
                "latitude": 39.86697,
                "longitude": 116.35183
              },
              "start": {
                "latitude": 39.86708,
                "longitude": 116.34564
              }
            },
            {
              "end": {
                "latitude": 39.8684,
                "longitude": 116.36265
              },
              "start": {
                "latitude": 39.86697,
                "longitude": 116.35183
              }
            },
            {
              "end": {
                "latitude": 39.86964,
                "longitude": 116.37972
              },
              "start": {
                "latitude": 39.8684,
                "longitude": 116.36265
              }
            },
            {
              "end": {
                "latitude": 39.87081,
                "longitude": 116.4081
              },
              "start": {
                "latitude": 39.86964,
                "longitude": 116.37972
              }
            },
            {
              "end": {
                "latitude": 39.86964,
                "longitude": 116.412
              },
              "start": {
                "latitude": 39.87081,
                "longitude": 116.4081
              }
            },
            {
              "end": {
                "latitude": 39.86994,
                "longitude": 116.4184
              },
              "start": {
                "latitude": 39.86964,
                "longitude": 116.412
              }
            },
            {
              "end": {
                "latitude": 39.86941,
                "longitude": 116.42935
              },
              "start": {
                "latitude": 39.86994,
                "longitude": 116.4184
              }
            },
            {
              "end": {
                "latitude": 39.86877,
                "longitude": 116.43323
              },
              "start": {
                "latitude": 39.86941,
                "longitude": 116.42935
              }
            },
            {
              "end": {
                "latitude": 39.86905,
                "longitude": 116.4358
              },
              "start": {
                "latitude": 39.86877,
                "longitude": 116.43323
              }
            }
          ]
        }
      },
      {
        "corrected_duration": 31,
        "distance": 20532.1,
        "duration": 1011.9,
        "result": {
          "portions": [
            {
              "color": "green",
              "end": {
                "latitude": 39.931062,
                "longitude": 116.31381599999999
              },
              "portion": 0,
              "start": {
                "latitude": 39.931218,
                "longitude": 116.314194
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.931002,
                "longitude": 116.318554
              },
              "portion": 1,
              "start": {
                "latitude": 39.931008,
                "longitude": 116.314906
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.936,
                "longitude": 116.31965
              },
              "portion": 2,
              "start": {
                "latitude": 39.932249999999996,
                "longitude": 116.31974000000001
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.936834,
                "longitude": 116.326972
              },
              "portion": 3,
              "start": {
                "latitude": 39.937146,
                "longitude": 116.321458
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.93701,
                "longitude": 116.336042
              },
              "portion": 4,
              "start": {
                "latitude": 39.9368,
                "longitude": 116.330618
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.938208,
                "longitude": 116.342674
              },
              "portion": 5,
              "start": {
                "latitude": 39.937362,
                "longitude": 116.339056
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.938818,
                "longitude": 116.347888
              },
              "portion": 6,
              "start": {
                "latitude": 39.938572,
                "longitude": 116.344882
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.939308000000004,
                "longitude": 116.349442
              },
              "portion": 7,
              "start": {
                "latitude": 39.939001999999995,
                "longitude": 116.349028
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.941074,
                "longitude": 116.349852
              },
              "portion": 8,
              "start": {
                "latitude": 39.939826000000004,
                "longitude": 116.349648
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.942298,
                "longitude": 116.350824
              },
              "portion": 9,
              "start": {
                "latitude": 39.941692,
                "longitude": 116.350146
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.946204,
                "longitude": 116.362386
              },
              "portion": 10,
              "start": {
                "latitude": 39.943426,
                "longitude": 116.353884
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.948018,
                "longitude": 116.410868
              },
              "portion": 11,
              "start": {
                "latitude": 39.947352,
                "longitude": 116.376632
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.947936,
                "longitude": 116.42524
              },
              "portion": 12,
              "start": {
                "latitude": 39.948164,
                "longitude": 116.42302
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.946476,
                "longitude": 116.427116
              },
              "portion": 13,
              "start": {
                "latitude": 39.947514,
                "longitude": 116.426264
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.919786,
                "longitude": 116.428416
              },
              "portion": 14,
              "start": {
                "latitude": 39.939544,
                "longitude": 116.427654
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.902544000000006,
                "longitude": 116.42971
              },
              "portion": 15,
              "start": {
                "latitude": 39.910536,
                "longitude": 116.42893
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.89884,
                "longitude": 116.430834
              },
              "portion": 16,
              "start": {
                "latitude": 39.899620000000006,
                "longitude": 116.43018599999999
              }
            },
            {
              "color": "orange",
              "end": {
                "latitude": 39.89742,
                "longitude": 116.435698
              },
              "portion": 17,
              "start": {
                "latitude": 39.89829,
                "longitude": 116.43221199999999
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.89613,
                "longitude": 116.43757199999999
              },
              "portion": 18,
              "start": {
                "latitude": 39.896879999999996,
                "longitude": 116.437038
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.881128,
                "longitude": 116.439566
              },
              "portion": 19,
              "start": {
                "latitude": 39.892192,
                "longitude": 116.438204
              }
            },
            {
              "color": "red",
              "end": {
                "latitude": 39.871719999999996,
                "longitude": 116.43798000000001
              },
              "portion": 20,
              "start": {
                "latitude": 39.87601,
                "longitude": 116.43951
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.869521999999996,
                "longitude": 116.43615000000001
              },
              "portion": 21,
              "start": {
                "latitude": 39.870098,
                "longitude": 116.43714
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.869354,
                "longitude": 116.434148
              },
              "portion": 22,
              "start": {
                "latitude": 39.869336,
                "longitude": 116.43540200000001
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.869024,
                "longitude": 116.43375400000001
              },
              "portion": 23,
              "start": {
                "latitude": 39.869276,
                "longitude": 116.433736
              }
            },
            {
              "color": "green",
              "end": {
                "latitude": 39.869028,
                "longitude": 116.43539200000001
              },
              "portion": 24,
              "start": {
                "latitude": 39.868962,
                "longitude": 116.434168
              }
            }
          ],
          "route": [
            {
              "end": {
                "latitude": 39.93101,
                "longitude": 116.31369
              },
              "start": {
                "latitude": 39.93127,
                "longitude": 116.31432
              }
            },
            {
              "end": {
                "latitude": 39.931,
                "longitude": 116.31977
              },
              "start": {
                "latitude": 39.93101,
                "longitude": 116.31369
              }
            },
            {
              "end": {
                "latitude": 39.93725,
                "longitude": 116.31962
              },
              "start": {
                "latitude": 39.931,
                "longitude": 116.31977
              }
            },
            {
              "end": {
                "latitude": 39.93673,
                "longitude": 116.32881
              },
              "start": {
                "latitude": 39.93725,
                "longitude": 116.31962
              }
            },
            {
              "end": {
                "latitude": 39.93708,
                "longitude": 116.33785
              },
              "start": {
                "latitude": 39.93673,
                "longitude": 116.32881
              }
            },
            {
              "end": {
                "latitude": 39.93849,
                "longitude": 116.34388
              },
              "start": {
                "latitude": 39.93708,
                "longitude": 116.33785
              }
            },
            {
              "end": {
                "latitude": 39.9389,
                "longitude": 116.34889
              },
              "start": {
                "latitude": 39.93849,
                "longitude": 116.34388
              }
            },
            {
              "end": {
                "latitude": 39.93941,
                "longitude": 116.34958
              },
              "start": {
                "latitude": 39.9389,
                "longitude": 116.34889
              }
            },
            {
              "end": {
                "latitude": 39.94149,
                "longitude": 116.34992
              },
              "start": {
                "latitude": 39.93941,
                "longitude": 116.34958
              }
            },
            {
              "end": {
                "latitude": 39.9425,
                "longitude": 116.35105
              },
              "start": {
                "latitude": 39.94149,
                "longitude": 116.34992
              }
            },
            {
              "end": {
                "latitude": 39.94713,
                "longitude": 116.36522
              },
              "start": {
                "latitude": 39.9425,
                "longitude": 116.35105
              }
            },
            {
              "end": {
                "latitude": 39.94824,
                "longitude": 116.42228
              },
              "start": {
                "latitude": 39.94713,
                "longitude": 116.36522
              }
            },
            {
              "end": {
                "latitude": 39.94786,
                "longitude": 116.42598
              },
              "start": {
                "latitude": 39.94824,
                "longitude": 116.42228
              }
            },
            {
              "end": {
                "latitude": 39.94613,
                "longitude": 116.4274
              },
              "start": {
                "latitude": 39.94786,
                "longitude": 116.42598
              }
            },
            {
              "end": {
                "latitude": 39.9132,
                "longitude": 116.42867
              },
              "start": {
                "latitude": 39.94613,
                "longitude": 116.4274
              }
            },
            {
              "end": {
                "latitude": 39.89988,
                "longitude": 116.42997
              },
              "start": {
                "latitude": 39.9132,
                "longitude": 116.42867
              }
            },
            {
              "end": {
                "latitude": 39.89858,
                "longitude": 116.43105
              },
              "start": {
                "latitude": 39.89988,
                "longitude": 116.42997
              }
            },
            {
              "end": {
                "latitude": 39.89713,
                "longitude": 116.43686
              },
              "start": {
                "latitude": 39.89858,
                "longitude": 116.43105
              }
            },
            {
              "end": {
                "latitude": 39.89588,
                "longitude": 116.43775
              },
              "start": {
                "latitude": 39.89713,
                "longitude": 116.43686
              }
            },
            {
              "end": {
                "latitude": 39.87744,
                "longitude": 116.44002
              },
              "start": {
                "latitude": 39.89588,
                "longitude": 116.43775
              }
            },
            {
              "end": {
                "latitude": 39.87029,
                "longitude": 116.43747
              },
              "start": {
                "latitude": 39.87744,
                "longitude": 116.44002
              }
            },
            {
              "end": {
                "latitude": 39.86933,
                "longitude": 116.43582
              },
              "start": {
                "latitude": 39.87029,
                "longitude": 116.43747
              }
            },
            {
              "end": {
                "latitude": 39.86936,
                "longitude": 116.43373
              },
              "start": {
                "latitude": 39.86933,
                "longitude": 116.43582
              }
            },
            {
              "end": {
                "latitude": 39.86894,
                "longitude": 116.43376
              },
              "start": {
                "latitude": 39.86936,
                "longitude": 116.43373
              }
            },
            {
              "end": {
                "latitude": 39.86905,
                "longitude": 116.4358
              },
              "start": {
                "latitude": 39.86894,
                "longitude": 116.43376
              }
            }
          ]
        }
      }
    ]
)


  // create a async function to fetch data from the API
  async function fetchData() {
    const requestOptions = {
      method: 'POST',
      reffrrerPolicy : 'unsafe-url',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pickup_lat : startPoint['lat'], pickup_lon : startPoint['lng'], dropoff_lat  : endPoint['lat'], dropoff_lon  : endPoint['lng'], hour: rideNow ? 'now' : hour})
    };

    console.log(requestOptions['body'])
    setCharging(true)
    const response = await fetch('https://geocell.one//machine_learning', requestOptions)
    const temp = await response.json()
    if(temp['message'] == 'Success'){
      setData(temp['result'])
      setCharging(false)
      setOption(0)
    }
    else{
      alert(temp['message'])
      setCharging(false)
    }
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

  const [theme, setTheme] = useState('emrald')

  function changeTheme() {
    if (theme === 'emrald') {
      setTheme('halloween')
      setMap('https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=XUsL1AmkUL4FXM0DB8aZ')
    } 
    if (theme === 'halloween') {
      setTheme('emrald')
      setMap('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=XUsL1AmkUL4FXM0DB8aZ')
    }
  }

  return (
    <div data-theme={theme} className='pb-10'>

      <div className="navbar bg-primary sticky top-0 z-50">
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
          <img className="w-4 h-4 rounded-full mr-1 fill-white" src="https://cdn.discordapp.com/attachments/1015252420277846046/1034054106362433637/3601262_1.png" alt="avatar" />
          <input type="checkbox" className="toggle toggle-sm" onChange={changeTheme} />
          <a className="btn btn-ghost btn-circle" href='https://github.com/Senshiben-efrei/traffic_congestion' target='none'>
            <img className="w-8 h-8 rounded-full" src="https://cdn.discordapp.com/attachments/1015252420277846046/1032275501944946699/github-icon_1.png" alt="avatar" />
          </a>
          
        </div>
      </div>

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


      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* <!-- Page content here --> */}

          <div className="mockup-window border bg-base-300 w-4/5 h-4/6 self-center mt-9">
            <div className="flex justify-center bg-base-200">
              <MapContainer center={center} zoom={11} scrollWheelZoom={true} className='rounded-lg'>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={'https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=XUsL1AmkUL4FXM0DB8aZ'} //vttps://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png        
                  />

                {data[option]['result']['route'] && data[option]['result']['route'].map((point, index) => (
                  <Polyline key={index} pathOptions={{ color : 'green '}} positions={[[point['start']['latitude'],point['start']['longitude']],[point['end']['latitude'],point['end']['longitude']]]} />
                ))}

                {/* {data && data['portions'].map((point, index) => (
                  <Polyline key={index} pathOptions={{ color : point['color']}} positions={[[point['start']['latitude'],point['start']['longitude']],[point['end']['latitude'],point['end']['longitude']]]} />
                ))} */}

                {data[option]['result']['portions'] && data[option]['result']['portions'].map((point, index) => (
                  <Polyline key={index} pathOptions={{ color : point['color']}} positions={[[point['start']['latitude'],point['start']['longitude']],[point['end']['latitude'],point['end']['longitude']]]} />
                ))}


                
                <Startmarker />
                <Endmarker />
                
              </MapContainer>
            </div>
          </div>


          <div className=' flex flex-row justify-center'>
            
            <div className="form-control w-28 self-center mt-5">
              <label className="label cursor-pointer">
                <span className="label-text font-bold ml-3">Ride Now!</span> 
                <input type="checkbox" className="checkbox checkbox-sm" onChange={() => setRideNow(!rideNow)}/>
              </label>
            </div>

            <label className="text-gray-500 text-lg font-bold mx-6 self-center mt-5">or</label>

            <input type="number" min="0" max="23" id="visitors" className=" w-11 self-center mt-5 py-3 pl-3 bg-slate-200 rounded-md" placeholder="12" required onChange={e => setHour(e.target.value)}></input>
            <label className="text-gray-500 text-lg font-bold mx-2 self-center mt-5">:</label>
            <input type="number" min="0" max="59" id="visitors" className=" w-11 self-center mt-5 py-3 pl-3 bg-slate-200 rounded-md" placeholder="00" required></input>
          </div>

          <button className="btn btn-primary w-28 self-center mt-3 text-white font-bold" onClick={fetchData} >Compute</button>

          <h3 className='mt-4 text-center font-bold px-4 self-center'>Expected duration <nobr className='text-green-500'>{data[option] && Math.floor(data[option]['duration']/60)} min</nobr> but with congestion <nobr className='text-red-500'>{data[option] && Math.floor(data[option]['corrected_duration'])} min</nobr></h3>

                  
        </div> 

        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}

            <div className="flex flex-col w-full border-opacity-50">
              <div className="divider">Departure localisation</div>
              <div className="grid h-20 card bg-base-200 rounded-box place-items-center text-center">{(startPoint['lat'].toString().slice(0, -7) + ' , ' + startPoint['lng'].toString().slice(0, -7))}</div>
              <div className="divider">Arrival localisation</div>
              <div className="grid h-20 card bg-base-200 rounded-box place-items-center text-center">{endPoint['lat'].toString().slice(0, -7) + ' , ' + endPoint['lng'].toString().slice(0, -7)}</div>
              <div className="divider">Options</div>
              <div className="dropdown self-center">
                <label tabIndex={0} className="btn btn-primary text-white m-1">Option {option + 1} / {data.length}</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  {data && data.map((point, index) => (
                    <li key={index}><a onClick={() => setOption(index)}>option {index + 1}</a></li>
                  ))}
                </ul>
              </div>
              <div className="divider">Trip time</div>
              <div className="grid h-20 card bg-base-200 rounded-box place-items-center">{data[option] && ('0' + (Math.floor(data[option]['corrected_duration']/60))).slice(-2)} : {data[option] && ('0' + (Math.floor(data[option]['corrected_duration']%60))).slice(-2)}</div>
              <div className="divider">Trip distance</div>
              <div className="grid h-20 card bg-base-200 rounded-box place-items-center">{data[option] && Math.floor(data[option]['distance']/1000)} Km</div>
              
            </div>

            
          </ul>
        </div>
      </div>

      <div className={`${charging ? 'visible' : 'invisible'} w-full h-[115%] bg-black absolute top-0 left-0 opacity-80 flex justify-center items-center animate-pulse`}>
        <img className="w-28 h-28 rounded-full mr-2 animate-spin" src="https://cdn.discordapp.com/attachments/1015252420277846046/1032275581364084827/github-icon_2.png" alt="avatar" />
      </div>

    </div>
  );
}

export default App;
