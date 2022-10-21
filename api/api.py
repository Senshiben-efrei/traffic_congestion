#create a flask app to send json data
from numpy import array
from flask import Flask, request, jsonify
from flask import request, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#set the route to the api
@app.route('/api', methods=['GET'])
def api():
    json = {'message': 'Success', 'status': 200, 'duration': [670], 'portions': [{'portion': 0, 'start': {'latitude': 39.907908, 'longitude': 116.397412}, 'end': {'latitude': 39.907902, 'longitude': 116.39711799999999}, 'color': 'green'}, {'portion': 1, 'start': {'latitude': 39.907576, 'longitude': 116.39699}, 'end': {'latitude': 39.906604, 'longitude': 116.3969}, 'color': 'green'}, {'portion': 2, 'start': {'latitude': 39.906444, 'longitude': 116.403288}, 'end': {'latitude': 39.906936, 'longitude': 116.422542}, 'color': 'red'}, {'portion': 3, 'start': {'latitude': 39.90707, 'longitude': 116.434338}, 'end': {'latitude': 39.906980000000004, 'longitude': 116.450472}, 'color': 'orange'}, {'portion': 4, 'start': {'latitude': 39.90668, 'longitude': 116.455918}, 'end': {'latitude': 39.90587, 'longitude': 116.45612200000001}, 'color': 'orange'}, {'portion': 5, 'start': {'latitude': 39.905656, 'longitude': 116.456084}, 'end': {'latitude': 39.905824, 'longitude': 116.455766}, 'color': 'green'}, {'portion': 6, 'start': {'latitude': 39.908086000000004, 'longitude': 116.455642}, 'end': {'latitude': 39.914704, 'longitude': 116.45558799999999}, 'color': 'green'}, {'portion': 7, 'start': {'latitude': 39.923120000000004, 'longitude': 116.45563399999999}, 'end': {'latitude': 39.94175, 'longitude': 116.455826}, 'color': 'red'}, {'portion': 8, 'start': {'latitude': 39.948370000000004, 'longitude': 116.457162}, 'end': {'latitude': 39.9496, 'longitude': 116.460978}, 'color': 'orange'}, {'portion': 9, 'start': {'latitude': 39.95081, 'longitude': 116.46225}, 'end': {'latitude': 39.95321, 'longitude': 116.46225}, 'color': 'green'}], 'route': [{'portion': 0, 'start': {'latitude': 39.90791, 'longitude': 116.39751}, 'end': {'latitude': 39.9079, 'longitude': 116.39702}}, {'portion': 1, 'start': {'latitude': 39.9079, 'longitude': 116.39702}, 'end': {'latitude': 39.90628, 'longitude': 116.39687}}, {'portion': 2, 'start': {'latitude': 39.90628, 'longitude': 116.39687}, 'end': {'latitude': 39.9071, 'longitude': 116.42896}}, {'portion': 3, 'start': {'latitude': 39.9071, 'longitude': 116.42896}, 'end': {'latitude': 39.90695, 'longitude': 116.45585}}, {'portion': 4, 'start': {'latitude': 39.90695, 'longitude': 116.45585}, 'end': {'latitude': 39.9056, 'longitude': 116.45619}}, {'portion': 5, 'start': {'latitude': 39.9056, 'longitude': 116.45619}, 'end': {'latitude': 39.90588, 'longitude': 116.45566}}, {'portion': 6, 'start': {'latitude': 39.90588, 'longitude': 116.45566}, 'end': {'latitude': 39.91691, 'longitude': 116.45557}}, {'portion': 7, 'start': {'latitude': 39.91691, 'longitude': 116.45557}, 'end': {'latitude': 39.94796, 'longitude': 116.45589}}, {'portion': 8, 'start': {'latitude': 39.94796, 'longitude': 116.45589}, 'end': {'latitude': 39.95001, 'longitude': 116.46225}}, {'portion': 9, 'start': {'latitude': 39.95001, 'longitude': 116.46225}, 'end': {'latitude': 39.95401, 'longitude': 116.46225}}]}
    d =[{'portion': 0, 'start': {'latitude': 39.907908, 'longitude': 116.397412}, 'end': {'latitude': 39.907902, 'longitude': 116.39711799999999}, 'color': 'green'}, {'portion': 1, 'start': {'latitude': 39.907576, 'longitude': 116.39699}, 'end': {'latitude': 39.906604, 'longitude': 116.3969}, 'color': 'green'}, {'portion': 2, 'start': {'latitude': 39.906444, 'longitude': 116.403288}, 'end': {'latitude': 39.906936, 'longitude': 116.422542}, 'color': 'red'}, {'portion': 3, 'start': {'latitude': 39.90707, 'longitude': 116.434338}, 'end': {'latitude': 39.906980000000004, 'longitude': 116.450472}, 'color': 'orange'}, {'portion': 4, 'start': {'latitude': 39.90668, 'longitude': 116.455918}, 'end': {'latitude': 39.90587, 'longitude': 116.45612200000001}, 'color': 'orange'}, {'portion': 5, 'start': {'latitude': 39.905656, 'longitude': 116.456084}, 'end': {'latitude': 39.905824, 'longitude': 116.455766}, 'color': 'green'}, {'portion': 6, 'start': {'latitude': 39.908086000000004, 'longitude': 116.455642}, 'end': {'latitude': 39.914704, 'longitude': 116.45558799999999}, 'color': 'green'}, {'portion': 7, 'start': {'latitude': 39.923120000000004, 'longitude': 116.45563399999999}, 'end': {'latitude': 39.94175, 'longitude': 116.455826}, 'color': 'red'}, {'portion': 8, 'start': {'latitude': 39.948370000000004, 'longitude': 116.457162}, 'end': {'latitude': 39.9496, 'longitude': 116.460978}, 'color': 'orange'}, {'portion': 9, 'start': {'latitude': 39.95081, 'longitude': 116.46225}, 'end': {'latitude': 39.95321, 'longitude': 116.46225}, 'color': 'green'}]
    return (json)


# create a route to post 3 variables to the api and return the result
#{"pickup_lat":39.92026958978369,"pickup_lon":116.39740004226684,"dropoff_lat":39.92026958978369,"dropoff_lon":116.39740004226684,"hour":12}

@app.route('/post', methods=['POST'])
def api_post():
    #get the data from tthe body
    data = request.get_json()
    #get the variables from the data
    x = data['pickup_lat']
    y = data['pickup_lon']
    z = data['dropoff_lat']
    a = data['dropoff_lon']
    b = data['hour']
    #calculate the result
    result = x + y + z + a + b
    #return the result
    return jsonify(result)
    
if __name__ == '__main__':
    app.run(threaded=True, host='127.0.0.1', port=5000)

