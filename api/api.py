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
    array = [
    {
    'coords': [[39.93345, 116.37282],[39.93151, 116.37382]],
    'color': 'red'
    },
    {
    'coords': [[39.93151, 116.37382],[39.93212, 116.42719]],
    'color': 'orange'
    },
    {
    'coords': [[39.93212, 116.42719],[39.90577, 116.42916]],
    'color': 'blue'
    },
    {
    'coords': [[39.90577, 116.42916],[39.90699, 116.42903]],
    'color': 'green'
    },
    {
    'coords': [[39.90699, 116.42903],[39.90711, 116.43049]],
    'color': 'red'
    }
  ]
    return jsonify(array)

# create a route to post 3 variables to the api and return the result
@app.route('/post', methods=['POST'])
def api_post():
    #get the data from tthe body
    data = request.get_json()
    #get the variables from the data
    x = data['pickup']
    y = data['dropoff']
    t = data['time']
    #calculate the result
    result = x + y + t
    #return the result
    return jsonify(result)
    
if __name__ == '__main__':
    app.run(threaded=True, host='127.0.0.1', port=5000)

