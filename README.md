<p align="center">
  <a href="" rel="noopener">
 <img src="https://cdn.discordapp.com/attachments/1015252420277846046/1033041717722615908/unknown.png" alt="Geo Cell logo"></a>
</p>

<h3 align="center">Geo Cell</h3>

<h4 align="center"></h4>

---

<p align="center"> Due to the high density of cars on the streets on the city of Beijing, China, which is leading to large traffic congestions especially in large cities, the city has decided to run analysis on the daily commute of transportation vehicles, namely taxi cars.
    <br> 
</p>

---

## 📝 Table of Contents

- [Features](#features)
- [Getting Started](#getting_started)
- [Dependencies](#dependencies)
- [Authors](#authors)
- [Efrei](#efrei)

## 🧐 Features <a name = "features"></a>
* Chose two points on the map and get directed between these two points
* Get the fastest paths using the KNN algorithm and avoid traffic congestion
* Chose between many paths the fastest computed path using machine learning
* Get the duration of your trip but also the corrected duration which takes in consideration the traffic congestion

## 🚀 Getting Started <a name = "getting_started"></a>

Just open this [link](https://front-end.djkf6glm8b7z8.amplifyapp.com/) and enjoy the project

Open the project in Visual Studio Code and run

# OR

As a developper you can explore the front-end by running :

```bash
npm install
npm start
```

The API can be runned without the website in the [API.ipynb](https://github.com/Senshiben-efrei/traffic_congestion/blob/data-exploration/API.ipynb)

The KNN machine learning algorithm can be runned locally with [localML](https://github.com/Senshiben-efrei/traffic_congestion/blob/data-exploration/localML.ipynb) file.
With this file you'll be able to update the datas by adding some files on Google Drive and re-run the machine learning algorithm to take in consideration the updates in the website when a new trip is computed.

## 🛠️ Dependencies <a name = "dependencies"></a>

You can install all the dependencies at once by running in your console:

```bash
pip install -r requirements.txt
```

The most importants libraries are:

* Flask, a python libraries used to create APIs and send to the front-end code all the results computed with python
* scikit-learn is used to label all the taxis locations recorded in the original datas and label them as high traffic congestion or not after they've been seperated by hours.
* pandas is used to manipulate dataframes and read/write into csv files to store the datas


## 🙇 Authors <a name = "authors"></a>

- [@Senshiben](https://github.com/Senshiben-efrei) - Front-End with react native and hosting with AWS amplify
- [@Pernam75](https://github.com/Pernam75) - Machine Learning using sklearn and KNN algorithm and Flask API

## 🏫 Made in Efrei Paris <a name="efrei"></a>

<a href="https://www.efrei.fr/"><img alt="Efrei Logo" src="https://github.com/Pernam75/MealMate/blob/main/src/EfreiLogo.png" width="179" height="58"></a>


