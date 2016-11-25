"use strict";
const util = require('util');
const MS13E = require('../MS13E.js');
const libClass = require('../../lib/libClass.js')

let lib = new libClass();
this.debug = true;//  to set debug on or off  
let name = 'driver.js MS13E::';
lib.log = lib.log.bind(this, name); // makes that this class is this in function and not base class
lib.log(` ${this.constructor.name}  is this.         welkom to ${this.constructor.name}`);





lib.log('MS13E inits in driver.js ', util.inspect(MS13E))
lib.log('MS13E inits init driver.js ', util.inspect(MS13E.init.toString(), { showHidden: true, depth: null, showProxy: true }))
module.exports = MS13E;


// to see body funtion toString() in util inspect;
// this means this module is  is returned from the createdriver from Generic
//TODO:  create Generic computed            computed = dynamically = generated


/*
Flow of classes:  driver -> generic -> driverGenerator - > driverconfig -> driverLib -> driverProperties , driverFunctions
driver needed by Homey  exports  Generic (clone) , Generic exports driverGenerator as super with extras
DriverGenerator picks certain parts of driverConfig DriverConfig im ports drivrLib drivrLib imports properties ad functions.

the parameters are set in Generic.
parameters are :
which capabilities , for pairing ,setting and getting
devicedata for constants of device not chching properties like id and others
homeydevice = devicedata as data and changing properties like name, state capability 
default driver functions as init pair
default driver properties as pair
views. way to not define them in app.json
todo pull signal out of json
keep control , json is not changeble.

parameter app:  eg x 10 , which variables which :  signals  devices 
parameter device : capabilities 

*/


