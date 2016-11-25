"use strict";
//driverGenerator
//file to generate a driver from a driver confior settings file to treamline the drivers, they all use more or less the smae code and logic

const util = require('util');
const convert = require('../lib/baseConverter').jan.ConvertBase;
const helpFunctions = require('../lib/helpFunctions.js').jan;
//const driverLib = require('./driverLib.js');
const app = require('../app.js')
const libClass = require('../lib/libClass.js')




class DriverConfig
{
    constructor(params)
    {
        const app = params['app']
        const driver = params['driver']
        const capabilities = params['capabilities']
        const driverLib = new (require('./driverLib.js'))(app, driver, capabilities);

        let lib = new libClass();
        this.debug = true;//  to set debug on or off  
        lib.log = lib.log.bind(this); // makes that this class is this in function and not base class
        lib.log(` ${this.constructor.name}  is this.         welkom to ${this.constructor.name}`);
        

        lib.log(` ${this.constructor.name} object driverLib`, util.inspect(driverLib))





        lib.log('app ', params['app']   )
        lib.log('driver', params['driver'] )
        lib.log('capabilities', params['capabilities'])
        lib.log('params ', params)
       



        this.devicesData = driverLib.devicesData;
        this.homeyDevices = driverLib.homeyDevices;
     
        this.houseCode = driverLib.houseCode;
        this.unitCode = driverLib.unitCode;
        this.capabilities = driverLib.capabilities

        this.vieworder = driverLib.vieworder
        this.views = driverLib.views

        this.init = driverLib.init;
        this.pair = driverLib.pair;
      

        this.addDeviceInit = driverLib.addDeviceInit
        this.addDevicePair = driverLib.addDevicePair
        this.getDeviceById = driverLib.getDeviceById
        this.updateDeviceOnOff = driverLib.updateDeviceOnOff
        this.updateCapabilitiesHomeyDevice = driverLib.updateCapabilitiesHomeyDevice
        this.realtime = driverLib.realtime

        this.renamed = driverLib.renamed
        this.deleted = driverLib.deleted

        ////TODO  locally invoked fnctions in driverLib dont hve to be passed ?

    };  // end constructor
}; //end class

module.exports =  DriverConfig;