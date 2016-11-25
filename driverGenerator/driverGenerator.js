"use strict";
//driverGenerator
//file to generate a driver from a driver confior settings file to treamline the drivers, they all use more or less the smae code and logic

const util = require('util');
const convert = require('../lib/baseConverter').jan.ConvertBase;
const helpFunctions = require('../lib/helpFunctions.js').jan;
const libClass = require('../lib/libClass.js')
const app = require('../app.js')
//const driverLib = require('./driverLib.js');





 class  driverGenerator
{

     constructor(params)
     {


        
      
         this.lib = new libClass();
         this.debug = true;//  to set debug on or off  
         this.lib.log = this.lib.log.bind(this); // makes that this class is this in function and not base class
         this.lib.log(` ${this.constructor.name}  is this.         welkom to ${this.constructor.name}`);



         const driverConfig = new (require('./driverConfig.js'))(params)
       //  const driverConfig = new Config(app, driver, capabilities)

         //  lib.log('driverGenerator object driverLib ', util.inspect(driverLib))
         this.lib.log(' object driverConfig ', util.inspect(driverConfig))
         // in original driver var self is the driver content which is exported to home with module.exports = self;
         // so we hevae export sell as  homey drivet 

         this.lib.log('params  ', params)
         //this.lib.log('driver', driver)
         //this.lib.log('capabilities', capabilities)

     

         this.init = driverConfig['init'] // see that an object made a string works is same as self.init = driverConfig.init;         this.pair = driverConfig['pair']
         this.devicesData = driverConfig['devicesData']         this.homeyDevices = driverConfig['homeyDevices']                this.houseCode = driverConfig['houseCode']         this.unitCode = driverConfig['unitCode']         this.addDeviceInit = driverConfig['addDeviceInit']
         this.addDevicePair = driverConfig['addDevicePair']
         this.getDeviceById = driverConfig['getDeviceById']
         this.updateDeviceOnOff = driverConfig['updateDeviceOnOff']
         this.updateCapabilitiesHomeyDevice = driverConfig['updateCapabilitiesHomeyDevice']
         this.capabilities = driverConfig['capabilities'];
         this.vieworder = driverConfig['vieworder']
         this.views = driverConfig['views']

         this.renamed = driverConfig['renamed']
         this.deleted = driverConfig['deleted']
         this.realtime = driverConfig['realtime']


         //driverConfig['']



     };  // end constructor
}; //end driverGenerator

module.exports =   driverGenerator  // no new if it is used as class in require as extends ipv instantiate with super 

