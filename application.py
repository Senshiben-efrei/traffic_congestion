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
    
def getDistance(start, end):
    R = 6370
    lat1 = radians(start['latitude'])
    lon1 = radians(start['longitude'])
    lat2 = radians(end['latitude'])
    lon2 = radians(end['longitude'])

    dlon = lon2 - lon1
    dlat = lat2- lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * arctan2(sqrt(a), sqrt(1-a))
    distance = R * c
    return distance

def getDuration(portions, initial_duration):
    # count the number of red, orange, and green portions
    red = 0
    orange = 0
    green = 0
    total_distance = 0
    for portion in portions:
        if portion['color'] == 'red':
            red += getDistance(portion['start'], portion['end'])
            total_distance += getDistance(portion['start'], portion['end'])
        elif portion['color'] == 'orange':
            orange += getDistance(portion['start'], portion['end'])
            total_distance += getDistance(portion['start'], portion['end'])
        else:
            green += getDistance(portion['start'], portion['end'])
            total_distance += getDistance(portion['start'], portion['end'])

    # calculate the duration
    duration = initial_duration * (1*green + 2*red + 1.75*orange)/total_distance
    #convert to minutes
    duration = round(duration / 60)
    return duration

# df = pd.read_csv('https://drive.google.com/uc?export=download&id='+'https://drive.google.com/file/d/1qcBW7V81AdyQ58kUgwUjiBmjqzcJLN34/view?usp=sharing'.split('/')[-2], header=None, names=['date time', 'longitude', 'latitude', 'label'])
# points = getPoints((39.933556, 116.372817), (39.841633, 116.478400), df)
# 116.372817, 39.933556, 116.478400, 39.841633

# portion_results = []
# for i in range(len(points[0])):
#     portion_results.append(getPortions(points[0][i], points[1][i]))

# print(portion_results)
    

def getData(hour):
    url = 'https://drive.google.com/file/d/1se8wg26AtyDNmGUbA767tFpKao73z_IJ/view?usp=sharing'

    if hour == 0:
        url = 'https://drive.google.com/file/d/1se8wg26AtyDNmGUbA767tFpKao73z_IJ/view?usp=sharing'
    elif hour == 1:
        url = 'https://drive.google.com/file/d/11cXZgNFsgNn7jUn2krnih7wzx48Z3xmT/view?usp=sharing'
    elif hour == 2:
        url = 'https://drive.google.com/file/d/11lz1wxFDR8-wC_H3Pre-QxsZM1fNXFYX/view?usp=sharing'
    elif hour == 3:
        url = 'https://drive.google.com/file/d/1PBPDE39g9k8o2SwIyFhrxdoe5hOeb4OL/view?usp=sharing'
    elif hour == 4:
        url = 'https://drive.google.com/file/d/1mrTMktq1HS_fRcZDjAvv9IAcs6OGznE4/view?usp=sharing'
    elif hour == 5:
        url = 'https://drive.google.com/file/d/1DJLlx_jc_O4-NvnzurqABjtrzWVO0lCP/view?usp=sharing'
    elif hour == 6:
        url = 'https://drive.google.com/file/d/1dGxpzxroI_4pYZtIWjuV6pKOw5jDNVnN/view?usp=sharing'
    elif hour == 7:
        url = 'https://drive.google.com/file/d/1aRY09cStM9p21HGXbxYh-7nhJ-AiMlh1/view?usp=sharing'
    elif hour == 8:
        url = 'https://drive.google.com/file/d/1q-snoS9B8R8B3nO8qUv-QyGe--k0JehP/view?usp=sharing'
    elif hour == 9:
        url = 'https://drive.google.com/file/d/1tm4n-IJpkgV3Q0NyzSaTTjgDZ5rL9iQ2/view?usp=sharing'
    elif hour == 10:
        url = 'https://drive.google.com/file/d/1qNTtu1lVgc5cUfqzO-EEwb0kJa2h87-6/view?usp=sharing'
    elif hour == 11:
        url = 'https://drive.google.com/file/d/1z_vIcv3fkR0n1RSSHoE4IwXP0SpQCWwq/view?usp=sharing'
    elif hour == 12:
        url = 'https://drive.google.com/file/d/1My74Z4CHY-9wYicjz8iUwX6_8jcK8odQ/view?usp=sharing'
    elif hour == 13:
        url = 'https://drive.google.com/file/d/1dZbee3EXNJNoXLDZd23CCWXSMtBNrkdo/view?usp=sharing'
    # ________________________________________________________
    elif hour == 14:
        url = 'https://drive.google.com/file/d/1My74Z4CHY-9wYicjz8iUwX6_8jcK8odQ/view?usp=sharing'
    elif hour == 15:
        url = 'https://drive.google.com/file/d/1z_vIcv3fkR0n1RSSHoE4IwXP0SpQCWwq/view?usp=sharing'
    elif hour == 16:
        url = 'https://drive.google.com/file/d/1qNTtu1lVgc5cUfqzO-EEwb0kJa2h87-6/view?usp=sharing'
    elif hour == 17:
        url = 'https://drive.google.com/file/d/1tm4n-IJpkgV3Q0NyzSaTTjgDZ5rL9iQ2/view?usp=sharing'
    elif hour == 18:
        url = 'https://drive.google.com/file/d/1q-snoS9B8R8B3nO8qUv-QyGe--k0JehP/view?usp=sharing'
    elif hour == 19:
        url = 'https://drive.google.com/file/d/1aRY09cStM9p21HGXbxYh-7nhJ-AiMlh1/view?usp=sharing'
    elif hour == 20:
        url = 'https://drive.google.com/file/d/1dGxpzxroI_4pYZtIWjuV6pKOw5jDNVnN/view?usp=sharing'
    elif hour == 21:
        url = 'https://drive.google.com/file/d/1DJLlx_jc_O4-NvnzurqABjtrzWVO0lCP/view?usp=sharing'
    elif hour == 22:
        url = 'https://drive.google.com/file/d/1mrTMktq1HS_fRcZDjAvv9IAcs6OGznE4/view?usp=sharing'
    elif hour == 23:
        url = 'https://drive.google.com/file/d/1PBPDE39g9k8o2SwIyFhrxdoe5hOeb4OL/view?usp=sharing'
    else:
        url = 'https://drive.google.com/file/d/1My74Z4CHY-9wYicjz8iUwX6_8jcK8odQ/view?usp=sharing'
  
    url = 'https://drive.google.com/uc?export=download&id=' + url.split('/')[-2]

    df = pd.read_csv(url, header=None, names=['date time', 'longitude', 'latitude', 'label'])

    return df, isinstance(df, pd.DataFrame)





application = Flask(__name__)
cors = CORS(application)
application.config['CORS_HEADERS'] = 'Content-Type'


@application.route('/hi')
def hello_world():
   return {
         "message": "Hello World"
   }

# request example :
# http://127.0.0.1:5000/machine_learning?pickup_lat=39.90772518863834&pickup_lon=116.39751663173872&dropoff_lat=39.95380284673872&dropoff_lon=116.46232507838539
@application.route('/machine_learning', methods = ['POST'])
def index():
    data = request.get_json()
    pickup_lat = data['pickup_lat']
    pickup_lon = data['pickup_lon']
    dropoff_lat = data['dropoff_lat']
    dropoff_lon = data['dropoff_lon']
    if data['hour'] == 'now':
        hour = datetime.now().hour
    else:
        hour = data['hour']

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

        df, data_status = getData(hour)
        if(not data_status):
            return {"message": "Error in getting data"}, 400
        else:
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

        return {
            "message": "Success",
            "result": portion_results,
        }
    # 39.90772518863834 116.39751663173872 39.95380284673872 116.46232507838539

if __name__ == '__main__':
    application.run()