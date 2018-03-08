// jilles433 app.js


"use strict";
const fs = require('fs');
const path = require('path');
const util = require('util');
const convert = require('./lib/baseConverter').jan.ConvertBase;
const helpFunctions = require('./lib/helpFunctions.js').jan;
const libClass = require('./lib/libClass.js');
const EventEmitter = require('events').EventEmitter;
const Log = require('homey-log').Log;

require('./lib/lib.js')();
//const driverMS13E = require('./drivers/MS13E/driver.js');
//const driverLib = require('./driverGenerator/driverLib.js');

//const update = require('./lib/libClass.js').updateCapabilitiesHomeyDevice;
//const update = require('./drivers/MS13E/driver.js').updateCapabilitiesHomeyDevice


const signal = require('./signalx10.js');
//const MS14E = require('./drivers/MS14E.js');
//const userconfig = require('./userconf.json');

//const signal = jil.signal;

const counter = 0;
const counter2 = 0;

class App  {

    

    constructor()
    {
       
        this.lib = new libClass();
        this.lib.log = this.lib.log.bind(this);
        this.debug = true;//  to set debug on or off 
        this.lib.log(` ${this.constructor.name}  is this. `, util.inspect(this));
        this.homeyDevices = [];
        this.devicesData = [];
        this.app = ''
        this.jil = ""
        
      //signal.on('signal', (frame) =>
      //  {
      //      this.lib.log('app on signal  ', frame)
      //  });

             


        this.init = () =>
        {
            this.lib.log('init homeyDevices ', util.inspect(this.homeyDevices, false, null))

            this.jil = 'this is a sentence in app iniit'
            this.app = 'X10'



         
          



            this.X10DeviceMap =

                {

                    'MS': 'MS13E',
                    'On': 'OnOff',
                    'Di': 'Dim',
                    'Al': 'All'
                }





            // here it starts generating drivers from the properties of X10Device
            this.X10DeviceTypes = {

                "MS14E": {
                    data: {
                        id: null,
                        houseCode: null,
                        unitCode: null,
                        type: "MS14E",
                    },
                    name: null,
                    capabilities: ["alarm_motion", "alarm_night"],
                    capability: {
                        alarm_motion: false,
                        alarm_night: false
                    }
                },
                "OnOff": {
                    data: {
                        id: null,
                        houseCode: null,
                        unitCode: null,
                        type: "OnOff",
                    },
                    name: null,
                    capabilities: ["onoff"],
                    capability: { onoff: false }
                },
                "Dim": {
                    data: {
                        id: null,
                        houseCode: null,
                        unitCode: null,
                        type: "Dim",
                    },
                    name: null,
                    capabilities: ["onoff", "dim"],
                    capability: {
                        onoff: false,
                        dim: 0
                    }
                }
            }

            signal.on('receivedX10Signal', result => this.processResult(result))
            // process receoved signals param result  houseCode unitCode: unitCodeString,c       command  : homeyCommand         
            this.processResult = (result) =>
            {
                let homeyDevice = {};

                this.lib.log('signal result arrived in app ', util.inspect(result, false, null));


                this.triggerflow(result);



                this.homeyDevices.forEach(d =>
                {
                    if (d.data.houseCode === result.houseCode && d.data.unitCode === result.unitCode)
                    {
                        homeyDevice = d
                        this.lib.log('homeyDevice found corresponding ', util.inspect(homeyDevice, false, null));                        
                        let app = this.app;
                        let driver = d.data.type;
                        let capabilities = d.capabilities;
                        let capability = "alarm_motion"

                        
                        //(app, driver, capabilities, device, capability, boolean:value)
                        //driverMS13E.updateCapabilitiesHomeyDevice(app,driver,capabilities,homeyDevice,capability,result.command)
                        this.update(app, driver, capabilities, homeyDevice, capability, result.command)
                    }
                    else if
                        (d.data.houseCode === result.houseCode && Number(d.data.unitCode) === ( Number(result.unitCode)  -1))
                    {
                        homeyDevice = d;
                        this.lib.log('homeyDevice found corresponding MS14E alarm night  ', util.inspect(homeyDevice, false, null));
                        let app = this.app;
                        let driver = d.data.type;
                        let capabilities = d.capabilities;
                        let capability = "alarm_night"

                        //(app, driver, capabilities, device, capability, boolean:value)
                       this.update(app, driver, capabilities, homeyDevice, capability, result.command)
                        //driverMS13E.updateCapabilitiesHomeyDevice(app,driver,capabilities,homeyDevice,capability,result.command)
                    }
                    
                });


            };
        
            this.update = (app, driver, capabilities, device, capability, value) =>
            {
                this.lib.log('updateCapabilitiesHomeyDevice capabilities    ', util.inspect(capabilities, false, null));
                this.lib.log('updateCapabilitiesHomeyDevice capability    ', util.inspect(capability, false, null));
                this.lib.log('updateCapabilitiesHomeyDevice value    ', value);
                this.lib.log('device  ', device)
                this.lib.log('app  ', app)
                this.lib.log('driver  ', driver)


               

               
                let driverH = Homey.manager('drivers').getDriver('MS13E');
                this.lib.log('driverH    ', util.inspect(driverH, false, null));
                this.lib.log('driverH    ', 'app 190');









                //  this.lib.log('567 changeDesc homeyDevices before change  ', util.inspect(homeyDevices, false, null));

                if (app = 'X10')
                {
                    signal.emit('realtimeapp', 'this is realtime app')
                    if (capabilities.indexOf(capability) != -1)
                        this.lib.log(' capabilities.indexOf(capability) != -1 ', capabilities.indexOf(capability) != -1)

                    {
                        for (let i in this.homeyDevices)
                        {
                           // this.lib.log('homeyDevices[i]  ', this.homeyDevices[i])
                           
                            this.lib.log(' this.homeyDevices[i].type == driver ', this.homeyDevices[i].data.type == driver)
                            this.lib.log('driver  ', driver)
                            this.lib.log('his.homeyDevices[i].type  ', this.homeyDevices[i].data.type)
                            this.lib.log('homeyDevices[i].data.houseCode == device.data.houseCode ', this.homeyDevices[i].data.houseCode == device.data.houseCode)
                            this.lib.log(' this.homeyDevices[i].data.unitCode == device.data.unitCode ', this.homeyDevices[i].data.unitCode == device.data.unitCode)


                            this.lib.log('selector', this.homeyDevices[i].data.type == driver &&
                                this.homeyDevices[i].data.houseCode == device.data.houseCode &&
                                this.homeyDevices[i].data.unitCode == device.data.unitCode)

                            if (this.homeyDevices[i].data.type == driver &&
                                this.homeyDevices[i].data.houseCode == device.data.houseCode &&
                                this.homeyDevices[i].data.unitCode == device.data.unitCode)
                            {
                                this.lib.log('selected homeyDevices[i]  ', this.homeyDevices[i])

                                //  this.lib.log('567 updateCapabilitiesHomeyDevice before change homeyDevices[i]  ', util.inspect(homeyDevices[i], false, null));
                                this.homeyDevices[i].capability[capability] = value;
                                // relatime params device_data , capability ,value


                                let realtimeparams = {
                                    'device_data': this.homeyDevices[i].data,
                                    'capability': capability,
                                    'value': value
                                }

                               // signal.emit('realtime',realtimeparams)
                                this.lib.log('devicedata  ', this.homeyDevices[i].data )
                                this.lib.log('capability  ', capability)
                                this.lib.log('makeBoolean(value)  ', makeBoolean(value))
                                this.lib.log('value  ', value)

                                driverH.realtime(this.homeyDevices[i].data, capability, makeBoolean(value));                        
                                this.lib.log('driverH    ', 'app 244');


                                this.lib.log('updateCapabilitiesHomeyDevice this.homeyDevices[i].data   ', this.homeyDevices[i].data)

                                //     this.lib.log('567 updateCapabilitiesHomeyDevice after change homeyDevices[i]  ', util.inspect(this.homeyDevices[i], false, null))

                                break;  //stop this loop we found it
                            }
                            else if (this.homeyDevices[i].data.type == "MS13E" &&
                                this.homeyDevices[i].data.houseCode === device.data.houseCode &&
                                Number(this.homeyDevices[i].data.unitCode) === Number(device.data.unitCode - 1) &&
                                driver === "MS13E"
                            )
                            {
                                console.log('updateCapabilitiesHomeyDevice alarm night   ', device.capability.alarm_motion)

                                this.homeyDevices[i].capablity.alarm_night = value;
                            

                                let realtimeparams = {
                                    'device_data': this.homeyDevices[i].data,
                                    'capability' : capability,
                                    'value' : value
                                }
                        
                                driverH.realtime(this.homeyDevices[i].data, capability, makeBoolean(value));
                                this.lib.log('driverH    ', 'app 271');
                           
                                break
                            }
                        }
                    }
                }
            }


            // this is fired when a flow with this trigger has been found, and has extra arguments
            Homey.manager('flow').on('trigger.Received_X10_command', function (callback, args, state) {

              
                util.log('state', state)  // input from event input  
             util.log('args', args)  // input from trigger card
              

                if (args.houseCode == state.houseCode && args.unitCode == state.unitCode &&
                    args.command == state.command) {
                 callback(null, true); // If true, this flow should run. The callback is (err, result)-style.
                } else {
                    callback(null, false);
                }

              

                //Homey.manager('flow').trigger('Received_X10_command', tokens, state, function (err, result) {
                //    if (err) return Homey.error(err);
                //});

            });

            this.triggerflow = (result) => {


                var tokens = {};

                if (result.command == true)
                { result.command = 'on' }  // 'on'  'off'
                else if (result.command == false)
                { result.command = 'off' } 

                var state = {

                    'houseCode': result.houseCode,
                    'unitCode': result.unitCode,
                    'command' : result.command

                   

                }

                Homey.manager('flow').trigger('Received_X10_command', tokens, state, function (err, result) {

               util.log('flow triggered with state ' ,state)
                    if (err) return Homey.error(err);



                })


            }

            









        } // end init

     



    } // end constructor  







     // create a generic driver 


    }  // end class

module.exports = new App();
