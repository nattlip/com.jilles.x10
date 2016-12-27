'use strict';
const util = require('util');
const helpFunctions = require('./helpFunctions.js').jan;
// class for widely used functions
class lib
{

    constructor()
    {

        this.debug = false;
     

     this.log  = function() 
        {
            if (this.debug)
            {
               
                [].unshift.call(arguments, `${this.constructor.name}::`);
              
            
             
                util.log.apply(this.log, arguments);  // this makes argumensts passed as parameter from this.log to console.log  
              //  [].shift.apply(arguments);
                
            }
           // else { console.log(false) }
        
        }

        //this.log = this.log.bind(this, this.constructor.name);

        //this.log('lib started')

     // doestn wwork static does compute device out of parameters  
       this.computeHomeyDevice = function(app, driver, capabilities)
    {
        let hD = {}
        hD.data = {}
        if (app = "X10")
        {
            hD.data.id = app + driver + this.houseCode + this.unitCode
            hD.data.houseCode = this.houseCode
            hD.data.unitCode = this.unitCode
            hD.data.type = driver
            hD.name = hD.data.id
            hD.capabilities = capabilities
            hD.capability = {};

            if (helpFunctions.containsCapability(capabilities, 'onoff'))
                hD.capability.onoff = false;
            //dim number from 0 to 1 decimals 2
            if (helpFunctions.containsCapability(capabilities, 'dim'))
                hD.capability.dim = 0;
            if (helpFunctions.containsCapability(capabilities, "alarm_motion"))
                hD.capability.alarm_motion = false;
            if (helpFunctions.containsCapability(capabilities, "alarm_night"))
                hD.capability.alarm_night = false;
        }

        return hD
    } 

//not working static is
     this.getDeviceById =  (deviceIn) =>
{
    this.log(" 329 homeydevices  ", this.homeyDevices);   // undefiend
    this.log('getDeviceById deviceIn', deviceIn);
    let matches = this.homeyDevices.filter(d => d.data.id === deviceIn.id);
    return matches ? matches[0] : null;
}











//#endregion

    }// end constructor

    //static function this is used by generic driver
     static computeHomeyDevice  (deviceParams,app, driver, capabilities) 
     {


         let houseCode = deviceParams.houseCode
         let unitCode = deviceParams.unitCode
    let hD = {}
    hD.data = {}
    if (app = "X10")
    {
        hD.data.id = app + driver + houseCode + unitCode
        hD.data.houseCode =houseCode
        hD.data.unitCode = unitCode
        hD.data.type = driver
        hD.name = hD.data.id
        hD.capabilities = capabilities
        hD.capability = {};

        if (helpFunctions.containsCapability(capabilities, 'onoff'))
            hD.capability.onoff = false;
        //dim number from 0 to 1 decimals 2
        if (helpFunctions.containsCapability(capabilities, 'dim'))
            hD.capability.dim = 0;
        if (helpFunctions.containsCapability(capabilities, "alarm_motion"))
            hD.capability.alarm_motion = false;
        if (helpFunctions.containsCapability(capabilities, "alarm_night"))
            hD.capability.alarm_night = false;

    }
         this.lib.log('hD ' , hD)
   return hD
}
     
   
     static getDeviceById(deviceIn) 
     {
         this.lib.log(" 329 homeydevices  ", this.homeyDevices);   // undefiend
         this.lib.log("339 homeydevices in app.ja  ", this.appReference.homeyDevices);
         let matches = this.appReference.homeyDevices.filter(d => d.data.id === deviceIn.id);
         return matches ? matches[0] : null;


     }

     static updateCapabilitiesHomeyDevice  (app, driver, capabilities, device, capability, value) 
{
    this.lib.log('updateCapabilitiesHomeyDevice capabilities    ', util.inspect(capabilities, false, null));
    this.lib.log('updateCapabilitiesHomeyDevice capability    ', util.inspect(capability, false, null));
    this.lib.log('updateCapabilitiesHomeyDevice value    ', value);
    //  this.lib.log('567 changeDesc homeyDevices before change  ', util.inspect(homeyDevices, false, null));

    if (app = 'X10')
    {
        if (capabilities.indexOf(capability) != -1) 
        {
            for (let i in this.appReference.homeyDevices)
            {

                if (this.appReference.homeyDevices[i].type == driver &&
                    this.appReference.homeyDevices[i].data.houseCode == device.data.houseCode &&
                    this.appReference.homeyDevices[i].data.unitCode == device.data.unitCode)
                {
                    //  this.lib.log('567 updateCapabilitiesHomeyDevice before change homeyDevices[i]  ', util.inspect(homeyDevices[i], false, null));
                    this.appReference.homeyDevices[i].capability[capability] = value;
                    // relatime params device_data , capability ,value
                 



                    this.lib.log('updateCapabilitiesHomeyDevice this.appReference.homeyDevices[i].data   ', this.appReference.homeyDevices[i].data)

                    //     this.lib.log('567 updateCapabilitiesHomeyDevice after change homeyDevices[i]  ', util.inspect(this.appReference.homeyDevices[i], false, null))

                    break;  //stop this loop we found it
                }
                else if (this.appReference.homeyDevices[i].type == "MS13E" &&
                    this.appReference.homeyDevices[i].data.houseCode === device.data.houseCode &&
                    Number(this.appReference.homeyDevices[i].data.unitCode) === Number(device.data.unitCode - 1) &&
                    driver === "MS13E"
                )
                {
                    console.log('updateCapabilitiesHomeyDevice alarm night   ', device.capability.alarm_motion)

                    this.appReference.homeyDevices[i].capability.alarm_night = value;
                    // this.appReference.realtime(this.appReference.homeyDevices[i].data, 'alarm_night', device.alarm_motion);
                    break
                }
            }
        }
    }
}




}  // end class lib

module.exports =   lib ;