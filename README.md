![alt example](https://github.com/betoharres/bus-poa-offiline/blob/master/example.gif?raw=true)

Small app loaded with a big json with bus schedules of my city. 
It displays all buses from [this site](http://www.eptc.com.br/EPTC_Itinerarios/linha.asp). 
The data was extracted using [this scrapper](https://github.com/betoharres/EPTCScrapper).
You can bookmark buses.
There are an icon showing in the schedule when the bus supports space inside the bus for disabled people.

## Development considerations:
I opted for not use redux to make things simple, also it'd be an overkill for this app because you just manage state for 2 components basically.

# Usage:
* ``$ git clone git@github.com:betoharres/bus-poa-offiline.git``
* ``$ cd bus-poa-offiline``
* ``$ yarn install``
* ``$ yarn start``
* ``$ react-native run-ios`` or ``$ android avd`` and then ``$ react-native run-android``
