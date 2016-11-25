"use strict";
const util = require('util');
const driverGenerator = require('../driverGenerator/driverGenerator.js');  // no new and () in module export drivergenerator 
const libClass = require('../../lib/libClass.js');
const signal = require('../../signalx10.js');
const helpFunctions = require('../lib/helpFunctions.js').jan;
//module.exports = driverGenerator.createDriver('switch');

//util.log(` OnOff  is this.  ................before class `, util.inspect(driverGenerator));




//let app = Symbol() 
//let driver = Symbol()
//let capabilities = Symbol()










class MS13E extends driverGenerator
{
    constructor()
    {

        let params = {};
        let appV = `X10`
        let driverV = `MS13E`
        let capabilitiesV = ["alarm_motion", "alarm_night"]



        params['app'] = appV;
        params['driver'] = driverV
        params['capabilities'] = capabilitiesV



        //#region constructor

        super(params);


        //#region parameters to be send to driverLib

        // app




        //#endregion




        // this.lib = new libClass();
        this.debug = true;//  to set debug on or off  
        this.lib.log = this.lib.log.bind(this); // makes that this class is this in function and not base class
        this.lib.log(` ${this.constructor.name}  is this.         welkom to ${this.constructor.name}`);


        this.lib.log('params MS13E ', params)
        

        // this.init = this.init.bind(this);
        //this.pair = this.pair.bind(this);

        //this.addDevice = this.addDevice.bind(this);
        //this.updateCapabilitiesHomeyDevice = this.updateCapabilitiesHomeyDevice.bind(this);

        //this.capabilities.MS13E.get = this.capabilities.MS13E.get.bind(MS13E);
        //this.capabilities.MS13E.set = this.capabilities.MS13E.set.bind(MS13E);

        //this.getDeviceById = this.getDeviceById.bind(this);



        //this.updateDeviceMS13E = this.updateDeviceMS13E.bind(this);




        //#endregion






    }






}
module.exports = new MS13E();