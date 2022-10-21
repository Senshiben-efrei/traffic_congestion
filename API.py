import requests
import polyline
import pandas as pd
import math
from numpy import cos, sin, arcsin, sqrt, arctan2, radians

from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS, cross_origin

def onSegment (start, end, x, y):
    x1 = start[0]
    y1 = start[1]
    x2 = end[0]
    y2 = end[1]
    dist = abs((y2-y1)*x - (x2-x1)*y + x2*y1 - y2*x1)/math.sqrt((y2-y1)**2 + (x2-x1)**2)
    if dist < 0.0003 and x <= max(x1,x2) and x >= min(x1,x2) and y <= max(y1,y2) and y >= min(y1,y2):
        return True
    return False

def getRoute(pickup_lon, pickup_lat, dropoff_lon, dropoff_lat):
    
    loc = "{},{};{},{}".format(pickup_lon, pickup_lat, dropoff_lon, dropoff_lat)
    url = "http://router.project-osrm.org/route/v1/driving/"
    r = requests.get(url + loc + "?alternatives=true")
    #print(url + loc + "?alternatives=true")
    if r.status_code!= 200:
        return {}
  
    res = r.json()
    #print(res)   
    options = len(res['routes'])
    routes = []
    distances = []
    duration = []
    for i in range(options):
        routes.append(polyline.decode(res['routes'][i]['geometry']))
        distances.append(res['routes'][i]['distance'])
        duration.append(res['routes'][i]['duration'])
    start_point = [res['waypoints'][0]['location'][1], res['waypoints'][0]['location'][0]]
    end_point = [res['waypoints'][1]['location'][1], res['waypoints'][1]['location'][0]]
    
    out = { 'options': options,
            'route':routes,
            'start_point':start_point,
            'end_point':end_point,
            'distance':distances,
            'duration':duration
          }

    return out


# routes = getRoute(116.372817, 39.933556, 116.478400, 39.841633)

def getPoints(pickup, dropoff, df):
    route = getRoute(pickup[1], pickup[0], dropoff[1], dropoff[0])
    results = []

    for j in range(len(route['route'])):
        final_df = pd.DataFrame(columns=['date time', 'longitude', 'latitude', 'label', 'segment'])
        
        segments = []


        for i in range(len(route['route'][j]) - 1):
            #print(route['route'][j][i][1], route['route'][j][i][0])
            start = (route['route'][j][i][0], route['route'][j][i][1])
            end = (route['route'][j][i+1][0], route['route'][j][i+1][1])

            df3 = df[df.apply(lambda x: onSegment(start, end, x['latitude'], x['longitude']), axis=1)]
            df3['segment'] = i

            segments.append({
                'index': i,
                'start': start,
                'end': end
            })
            
            final_df = pd.concat([final_df, df3])
        
        results.append(final_df)

    return results, route['route'], route['duration'], route['distance']

def getPortions(df, route):
    portions = []
    n = 5
    for i in range(len(route) - 1):
        start = (route[i][0], route[i][1])
        end = (route[i+1][0], route[i+1][1])

        delta_lat = end[0] - start[0]
        delta_lon = end[1] - start[1]

        lat_portion = delta_lat / n
        lon_portion = delta_lon / n

        start_delta = (start[0] + lat_portion, start[1] + lon_portion)
        end_delta = (end[0] - lat_portion, end[1] - lon_portion)
        
        df2 = df[df.apply(lambda x: onSegment(start_delta, end_delta, x['latitude'], x['longitude']), axis=1)]

        # count the number of points labeled as 1 and 2
        labeled1 = df2[df2['label'] == 1].shape[0]
        labeled2 = df2[df2['label'] == 2].shape[0]

        if labeled1 + 3*labeled2 > 10:
            color = 'red'
        elif labeled1 + 3*labeled2 > 2:
            color = 'orange'
        else:
            color = 'green'

        portions.append({
            'portion': i,
            'start': {
                'latitude': start_delta[0],
                'longitude': start_delta[1] 
            },
            'end': {
                'latitude': end_delta[0],
                'longitude': end_delta[1]
            },
            'color': color,
        })
    basic = []
    for i in range(0, len(route) - 1):
            basic.append(
                {
                    'start': {
                        'latitude': route[i][0],
                        'longitude': route[i][1]
                    },
                    'end': {
                        'latitude': route[i+1][0],
                        'longitude': route[i+1][1]
                    }
                })
    return {
        'portions': portions,
        'route': basic
    }
    

def getDuration(portions, initial_duration):
    # count the number of red, orange, and green portions
    red = 0
    orange = 0
    green = 0
    for portion in portions:
        if portion['color'] == 'red':
            red += 1
        elif portion['color'] == 'orange':
            orange += 1
        else:
            green += 1

    print(red, orange, green)

    # calculate the duration
    duration = initial_duration * (1.5*red + 1.25*orange)


    return duration

# df = pd.read_csv('https://drive.google.com/uc?export=download&id='+'https://drive.google.com/file/d/1qcBW7V81AdyQ58kUgwUjiBmjqzcJLN34/view?usp=sharing'.split('/')[-2], header=None, names=['date time', 'longitude', 'latitude', 'label'])
# points = getPoints((39.933556, 116.372817), (39.841633, 116.478400), df)
# 116.372817, 39.933556, 116.478400, 39.841633

# portion_results = []
# for i in range(len(points[0])):
#     portion_results.append(getPortions(points[0][i], points[1][i]))

# print(portion_results)
    





app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def hello_world():
   return {
         "message": "Hello World"
   }

# request example :
# http://127.0.0.1:5000/machine_learning?pickup_lat=39.90772518863834&pickup_lon=116.39751663173872&dropoff_lat=39.95380284673872&dropoff_lon=116.46232507838539
@app.route('/machine_learning', methods = ['POST'])
def machine_learning():
    data = request.get_json()
    pickup_lat = data['pickup_lat']
    pickup_lon = data['pickup_lon']
    dropoff_lat = data['dropoff_lat']
    dropoff_lon = data['dropoff_lon']
    hour = 12


    # hour = str(datetime.now().hour)


    if pickup_lon < 115.875363 or pickup_lon > 117.351154 or pickup_lat < 39.482463 or pickup_lat > 40.315493:
        return {
            "message": "The pickup location is out of bounds",
            "status": 400,
            "pickup_lat": pickup_lat,
            "pickup_lon": pickup_lon
        }
    elif dropoff_lon < 115.875363 or dropoff_lon > 117.351154 or dropoff_lat < 39.482463 or dropoff_lat > 40.315493:
        return {
            "message": "The dropoff location is out of bounds",
            "status": 400
        }
    elif dropoff_lat == pickup_lat and dropoff_lon == pickup_lon:
        return {
            "message": "The pickup and dropoff locations are the same",
            "status": 400
        }
    elif not hour or pickup_lat == None or pickup_lon == None or dropoff_lat == None or dropoff_lon == None:
        return {
            "message": "Missing parameters",
            "status": 400
        }
    else:
        #df = pd.read_csv('data/hours/{}Htest.txt'.format(hour), header=None, names=['date time', 'longitude', 'latitude', 'label'])

        df = pd.read_csv('https://drive.google.com/uc?export=download&id='+'https://drive.google.com/file/d/1qcBW7V81AdyQ58kUgwUjiBmjqzcJLN34/view?usp=sharing'.split('/')[-2], header=None, names=['date time', 'longitude', 'latitude', 'label'])
        points = getPoints((float(pickup_lat), float(pickup_lon)), (float(dropoff_lat), float(dropoff_lon)), df)

        portion_results = []
        for i in range(len(points[2])):
            portion = getPortions(points[0][i], points[1][i])
            duration = getDuration(portion['portions'], points[2][i])
            portion_results.append({
                'result': portion,
                'duration': points[2][i],
                'corrected_duration': duration,
                'distance': points[3][i]
            })
        return jsonify(portion_results)
    # 39.90772518863834 116.39751663173872 39.95380284673872 116.46232507838539

if __name__ == '__main__':
    app.run(threaded=True, host='127.0.0.1', port=5000)