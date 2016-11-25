"use strict";
//driverGenerator
//file to generate a driver from a driver confior settings file to treamline the drivers, they all use more or less the smae code and logic
var path = require('path');
const util = require('util');
const convert = require('../lib/baseConverter').jan.ConvertBase;
const helpFunctions = require('../lib/helpFunctions.js').jan;

const libClass = require('../lib/libClass.js')
const signal = require('../../signalx10.js');

//const driverProperties = require('./driverLibProp.js');
//const driverFunctions = require('./driverLibFunct.js');

// parent of driverFunctions
class driverProperties
{


    // to put the complete devices 


    constructor(app, driver, capabilities)
    {
        this.appReference = require('../app.js')
        this.lib = new libClass();
        this.debug = true;//  to set debug on or off  
        this.lib.log = this.lib.log.bind(this);

        this.lib.log(` ${this.constructor.name}  is this.         welkom to ${this.constructor.name}`);
        this.lib.log(` ${this.constructor.name}  is this.`, util.inspect(this))


        this.lib.log('app ', app)
        this.lib.log('driver', driver)
        this.lib.log('capabilities', capabilities)

        signal.on('signal', frame => this.lib.log('frame', frame))


        this.lib.log('app in ', util.inspect(this.appReference))

        this.lib.log("path resolve  ", path.resolve('driverLib.js'))
        this.lib.log('filename ', path.basename(__filename))
        this.lib.log('dirname ', path.basename(__dirname))

        this.lib.log('this.filename', this.filename)


        this.lib.log('module.filenamev', module.filename)

        //variables needed in drvers self 
        this.devicesData = new Array();
        // to put the complete devices 
        this.homeyDevices = new Array();

        if (app = 'X10')
        {
            this.houseCode = "";
            this.unitCode = "";
        }








        this.viewOrder = ["show_options", "generic_done"]
        this.views = [
            {
                "template": "../drivers/MS14E/pair/showoptions.html",
                "options": {
                    "title": "show pair options cm13e",
                    "body": "",
                    "prepend": [],
                    "append": [],
                    "svg": "",
                    "svgWidth": "80vw",
                    "svgHeight": "70vh",
                    "initWithDeviceData": false,
                    "previous": true,
                    "next": "add_device"
                },
                "prepend": [],
                "append": [],
                "id": "show_options"
            },
            {
                "template": "../drivers/MS14E/pair/done.html",
                "options": {
                    "title": "pair pair done",
                    "body": "",
                    "prepend": [],
                    "append": [],
                    "svg": "",
                    "svgWidth": "80vw",
                    "svgHeight": "70vh",
                    "initWithDeviceData": true,
                    "previous": true,
                    "next": false
                },
                "prepend": [],
                "append": [],
                "id": "generic_done"
            }
        ]




    }

}

// parent of driverLib and child of driverProperties
class driverFunctions extends driverProperties
{
    constructor(app, driver, capabilities)
    {
        super(app, driver, capabilities);
        this.lib = new libClass();
        // this.lib.log = this.lib.log.bind(this);// makes that this class is this in function and not base class
        libClass.getDeviceById = libClass.getDeviceById.bind(this)
        libClass.computeHomeyDevice = libClass.computeHomeyDevice.bind(this);
        libClass.updateCapabilitiesHomeyDevice = libClass.updateCapabilitiesHomeyDevice.bind(this);
        this.lib.log(` ${this.constructor.name}  is this.         welkom to ${this.constructor.name}`);



        this.debug = true;//  to set debug on or off 


        this.lib.log(` ${this.constructor.name}  is this. `, util.inspect(this));


         // this.realtime = (x, y, z) => { };
          this.realtime = (x,y,z) => module.exports.realtime(x,y,z);


        this.init = (devices_data, callback) =>
        {
            //variables needed in drvers self 
            this.devicesData = [];
            // to put the complete devices 
            this.homeyDevices = [];


            this.lib.log(driver + ' init   ', "init driver started")
            this.lib.log(driver + ' init Homey test  ', Homey.jil);
            //  this.lib.log('Generic this init ', util.inspect(this));

            devices_data.forEach(device_data =>
            {
                this.addDevice(device_data, app, driver, capabilities);

            });

            this.lib.log('init Homey ', util.inspect(Homey, false, null))
            this.lib.log('init Homey app ', util.inspect(Homey.app, false, null))
            this.lib.log('init Homey devices ', util.inspect(Homey.app.homeyDevices, false, null))
            this.lib.log('init app jil ', util.inspect(Homey.app.jil, false, null))

            //this.lib.log('driver 22 devices_data', util.inspect(devices_data, false, null))
            //this.lib.log('driver 22 devices_data', util.inspect(this.devicesData, false, null))
            this.lib.log('init after addDevice homeyDevices ', util.inspect(this.appReference.homeyDevices, false, null))

            callback();

        },



            this.pair = (socket) =>
            {
                let houseCode = ''
                let unitCode = ''

                socket.on("saveUnitCode", data =>
                {

                    this.lib.log("OnOff 147 unitcode    ", data.unitCode);
                    unitCode = data.unitCode;
                });

                socket.on('saveHouseCode', data =>
                {

                    this.lib.log("OnOff 147 housecode    ", data.houseCode);
                    houseCode = data.houseCode;
                });


                socket.on("done", (data, callback) =>
                {





                    this.lib.log(" pair done this  ", util.inspect(this));


                    let deviceParams = {}
                    deviceParams.houseCode = houseCode
                    deviceParams.unitCode = unitCode

                    let homeyDevice = libClass.computeHomeyDevice(deviceParams, app, driver, capabilities)




                    this.lib.log(" pair done data ", data);  //no data
                    this.lib.log(" pair done callback ", util.inspect(callback, null, false));

                    this.lib.log("pair on done device to be paired ", homeyDevice);
                    this.lib.log(" homeydevices  ", this.appReference.homeyDevices);   // undefiend
                    this.lib.log(" pair done homeydevices doesnt contain ", !helpFunctions.contains(this.appReference.homeyDevices, homeyDevice));
                    this.lib.log(" pair done homeydevicesundefined ", util.inspect(this.appReference.homeyDevices, null, false));


                    // let homeyDevice = libClass.computeHomeyDevice(app, driver, capabilities)
                    if (!helpFunctions.contains(this.appReference.homeyDevices, homeyDevice))
                    {
                        if (!this.appReference.homeyDevices)
                        { this.appReference.homeyDevices = [] }


                        let deviceParams = {}

                        deviceParams.houseCode = houseCode
                        deviceParams.unitCode = unitCode


                        this.addDevice(deviceParams, app, driver, capabilities);
                        //  this.addDevice(device_data, app, driver, capabilities);
                        // this.homeyDevices.push(homeyDevice);
                        this.lib.log(" pair done after push device ", util.inspect(this.appReference.homeyDevices));
                    } else
                    {
                        this.lib.log(" pair done in else updatacap ", util.inspect(this.appReference.homeyDevices, null, false));
                        this.updateCapabilitiesHomeyDevice(homeyDevice);
                    }

                    //var devicedataobj = { "id": device.data.id };


                    callback(null, homeyDevice);
                    //socket.emit('pairingdone', '', function (err, result) {
                    //    this.lib.log(result) // Hi!
                    //});

                });




                socket.on('disconnect', function ()
                {

                })
            };


        this.capabilities = {}

        if (helpFunctions.containsCapability(capabilities, 'onoff'))
        {

            this.capabilities.onoff =

                {
                    //  motion


                    get: (device_data, callback) =>
                    {

                        this.lib.log(' capabilitis get onoff entered device_data', device_data)
                        // get the device with a locally defined function
                        let device = libClass.getDeviceById(device_data);

                        this.lib.log(' capabilitis get device. onoff  ', device)

                        this.lib.log(' capabilitis get device. onoff  ', device.capability.onoff)
                        this.lib.log('device_data  ', device_data)
                        if (device instanceof Error) return callback(device);

                        //  this.realtime(device_data, 'onoff', device.capability.onoff);

                        // send the dim value to Homey
                        if (typeof callback == 'function')
                        {
                            callback(null, device.capability.onoff);
                        }
                    },

                    set: (device_data, onoff, callback) =>
                    {
                        // to set a circle you have to tranlate te modulemaccadress to appliance.id
                        // applinace id is  send to plugwise

                        this.lib.log('capabilitis set onoff    ', onoff)


                        //if (device_data instanceof Error) return callback(device_data);
                        this.lib.log('capabilitis set  onoff entered')

                        let device = libClass.getDeviceById(device_data);

                        //if (device.onoff == true) {
                        //    onoff = false;
                        //}
                        //else if (device.capability.onoff == false) {
                        //    onoff = true;
                        //}

                        device.capability.onoff = onoff;

                        //translate for x10 function
                        let X10Command = ''

                        if (onoff == true)
                        {
                            X10Command = 'on';
                        }
                        else if (onoff == false)
                        {
                            X10Command = 'off';
                        }

                        this.lib.log('capabilitis set  send to plugwise', onoff)
                        this.lib.log("device that is sendng", device_data);


                        // signal.sendbitarray(signal.codeX10SendCommand(device_data.houseCode, device_data.unitCode, X10Command));

                        let sendCommand = {
                            'houseCode': device_data.houseCode,
                            'unitCode': device_data.unitCode,
                            'X10Command': X10Command
                        }
                        signal.emit('sendCommand', sendCommand)
                        // this.updateDeviceOnOff(device_data, device, boolean:onoff)
                        libClass.updateCapabilitiesHomeyDevice(app, driver, capabilities, device, 'onoff', onoff)
                        callback(null, onoff);
                        // });
                    }


                } // if onoff

            if (helpFunctions.containsCapability(capabilities, 'alarm_motion'))
            {

                this.capabilities.alarm_motion = {
                    //  motion


                    get: (device_data, callback) =>
                    {

                        this.lib.log(' capabilitis get onoff entered device_data', device_data)
                        // get the device with a locally defined function
                        let device = libClass.getDeviceById(device_data);

                        this.lib.log(' capabilitis get device. onoff  ', device)
                        this.lib.log('device_data  ', device_data)
                        this.lib.log(' capabilitis get device. onoff  ', device.capability.alarm_motion)


                        if (device instanceof Error) return callback(device);

                        //  this.realtime(device_data, 'alarm_motion', device.alarm_motion);

                        // send the alarm_mtion value to Homey
                        if (typeof callback == 'function')
                        {
                            callback(null, device.capability.alarm_motion);
                        }
                    }

                }

            } // if alarm_motion


            if (helpFunctions.containsCapability(capabilities, 'alarm_night'))
            {

                this.capabilities.alarm_night = {
                    //  motion


                    get: (device_data, callback) =>
                    {

                        this.lib.log(' capabilitis get onoff entered device_data', device_data)
                        // get the device with a locally defined function
                        let device = libClass.getDeviceById(device_data);

                        this.lib.log(' capabilitis get device. onoff  ', device)
                        this.lib.log('device_data  ', device_data)
                        this.lib.log(' capabilitis get device. onoff  ', device.capability.alarm_night)


                        if (device instanceof Error) return callback(device);

                        //  this.realtime(device_data, 'alarm_night', device.alarm_night);

                        // send the alarm_mtion value to Homey
                        if (typeof callback == 'function')
                        {
                            callback(null, device.capability.alarm_night);
                        }
                    }

                }




            }





        };// capabilities













        this.getDeviceById = (deviceIn) =>
        {
            // this.lib.log(" 338 homeydevices  ", this.appReference.homeyDevices);   // undefiend
            this.lib.log("339 homeydevices in app.ja  ", this.appReference.homeyDevices);   // undefiend
            this.lib.log('getDeviceById deviceIn', deviceIn);
            let matches = this.appReference.homeyDevices.filter(d => d.data.id === deviceIn.id);
            return matches ? matches[0] : null;
        }





        // this.updateDeviceOnOff = this.updateDeviceOnOff.bind(this);

        //device_data in  moved to libclass static pair is boolean if pair thousecode and untkcode isknown
        this.addDevice = (deviceIn, app, driver, capabilities) =>
        {
            let deviceParams = {}

            deviceParams.houseCode = deviceIn.houseCode
            deviceParams.unitCode = deviceIn.unitCode
            //  this.homeyDevices.push(libClass.computeHomeyDevice(deviceParams,app, driver, capabilities))
            this.appReference.homeyDevices.push(libClass.computeHomeyDevice(deviceParams, app, driver, capabilities))
            this.devicesData.push(deviceIn)
            //this.lib.log('driver MS14E homeydevices in adddevice', util.inspect(this.appReference.homeyDevices, false, null));
        }



        //   this.addDevicePair = (deviceParams,app, driver, capabilities) =>        {

        //    let device = libClass.computeHomeyDevice(deviceParams,app, driver, capabilities)
        //this.homeyDevices.push(device)
        //    this.appReference.homeyDevices.push(device)
        //    deviceIn = device.data

        //this.devicesData.push(deviceIn)
        //    //this.lib.log('driver MS14E homeydevices in adddevice', util.inspect(this.homeyDevices, false, null));
        //}







        // onoff is value
        this.updateDeviceOnOff = (device_data, device, onoff) =>
        {
            device.capability.onoff = onoff;
            this.lib.log('this.updateDeviceOnOff   device', device)
            this.lib.log('this.updateDeviceOnOff   onoff', onoff)
            this.realtime(device_data, 'onoff', onoff); //module.exports.
        };


        this.updateCapabilitiesHomeyDevice = (app, driver, capabilities, device, capability, value) =>
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

                        if (this.appReference.homeyDevices[i].data.type == driver &&
                            this.appReference.homeyDevices[i].data.houseCode == dev.data.houseCode &&
                            this.appReference.homeyDevices[i].data.unitCode == dev.data.unitCode)
                        {
                            //  this.lib.log('567 updateCapabilitiesHomeyDevice before change homeyDevices[i]  ', util.inspect(homeyDevices[i], false, null));
                            this.appReference.homeyDevices[i].capability[capability] = value;
                            // relatime params device_data , capability ,value
                            module.exports.realtime(this.appReference.homeyDevices[i].data, capability, value);



                            this.lib.log('updateCapabilitiesHomeyDevice this.appReference.homeyDevices[i].data   ', this.appReference.homeyDevices[i].data)

                            //     this.lib.log('567 updateCapabilitiesHomeyDevice after change homeyDevices[i]  ', util.inspect(this.appReference.homeyDevices[i], false, null))

                            break;  //stop this loop we found it
                        }
                        else if (this.appReference.homeyDevices[i].data.type == "MS13E" &&
                            this.appReference.homeyDevices[i].data.houseCode === dev.data.houseCode &&
                            Number(this.appReference.homeyDevices[i].data.unitCode) === Number(device.data.unitCode - 1) &&
                            driver === "MS13E"
                        )
                        {
                            console.log('updateCapabilitiesHomeyDevice alarm night   ', device.capability.alarm_motion)

                            this.appReference.homeyDevices[i].capablity.alarm_night = value;
                            // this.appReference.realtime(this.appReference.homeyDevices[i].data, 'alarm_night', dev.alarm_motion);
                            module.exports.realtime(this.appReference.homeyDevices[i].data, capablity, value);
                            break
                        }
                    }
                }
            }
        }

        this.renamed = (device_data, new_name) =>
        {
            this.lib.log('renamed entered device_data  ', device_data);

            this.appReference.homeyDevices[this.appReference.homeyDevices.indexOf(libClass.getDeviceById(device_data))].name = new_name;
        }


        this.deleted = device_data =>
        {
            this.appReference.homeyDevices.splice(this.appReference.homeyDevices.indexOf(libClass.getDeviceById(device_data), 1));
            this.lib.log('deleted device_data', device_data);
        }


        signal.on('realtimeapp', x =>this.lib.log(x))


        signal.on('realtime', realtimeparams =>
        {
            this.lib.log('realtime from app arrived', realtimeparams.device_data, ' ', realtimeparams.capability,'  ', realtimeparams.value);

            
            this.update(realtimeparams.device_data, realtimeparams.capability, realtimeparams.value)

        })

        this.update = (x, y, z) =>
        {
            this.realtime(x, y, z)

        } 









    } // constructor

}



class driverLib extends driverFunctions
{
    constructor(app, driver, capabilities)
    {
        super(app, driver, capabilities);
        //#region driver
        this.lib = new libClass();
        this.debug = true;//  to set debug on or off  
        this.lib.log = this.lib.log.bind(this); // makes that this class is this in function and not base class

        this.lib.log(` ${this.constructor.name}  is this.         welkom to ${this.constructor.name}`);


        this.lib.log('app ', app)
        this.lib.log('driver', driver)
        this.lib.log('capabilities', capabilities)


        this.drivers = {

            Generic: 'Generic'

        };

        this.capability = {
            measure_temperature: 'measure_temperature',
            measure_humidity: 'measure_humidity',
            measure_pressure: 'measure_pressure',
            measure_rain: 'measure_rain',
            meter_rain: 'meter_rain',
            measure_wind_angle: 'measure_wind_angle',
            measure_gust_strength: 'measure_gust_strength',
            measure_wind_strength: 'measure_wind_strength',
            alarm_battery: 'alarm_battery',
            alarm_motion: 'alarm_motion',
            alarm_night: 'alarm_night',
            onoff: 'onoff',
            dim: 'dim',
            measure_power: 'measure_power',
            meter_power: 'meter_power'
        };

        //#endregion







        //#region properties



        //#endregion

        //#region functions








        //#endregion














        // the actual properties of driver to be added to this of driver
        // this.driverProperties = new driverProperties();


        //  this.driverFunctions = new driverFunctions();


    }; ///end constructor

} //end driverLib

module.exports = driverLib;

