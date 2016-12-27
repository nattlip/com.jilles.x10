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

           
        
              

        this.scriptfunction = `

   function makehtml()
        {

            var z;

            var x = document.getElementById("text").parentElement.nodeName;



            var y = document.getElementsByClassName("view-content");

            // alert(y.length);
           

            z = y[0];

            var alphabet = "abcdefghijklmnop".split("");
            var alphabetCount = 16
            console.log("hello");

            var houseCodes = document.createElement("select");
            houseCodes.className = "button";
            //<option value="" disabled selected style="display:none;">Label</option>
            var zeroOption = new Option("HouseCode", "0");
            houseCodes.options[houseCodes.options.length] = zeroOption;
            for (var i = 1; i <= alphabetCount ; i++)
            {
                houseCodes.options[houseCodes.options.length] = new Option(alphabet[i - 1].toUpperCase(), alphabet[i - 1].toUpperCase());
            }
            houseCodes.selectedIndex = 0;
            houseCodes.onchange = function () { saveHouseCode(); };
            z.appendChild(houseCodes);


            var numbers = new Array(16); //create a 16 element array

            var unitCodes = document.createElement("select");
            unitCodes.className = "button";
            var zeroOption2 = new Option("UnitCode", "0");
            unitCodes.options[unitCodes.options.length] = zeroOption2;
            for (var i = 1; i <= numbers.length; i++)
            {
                unitCodes.options[unitCodes.options.length] = new Option(i.toString(), i.toString());
            }
            unitCodes.selectedIndex = 0;
            unitCodes.onchange = function () { saveUnitCode() };
            z.appendChild(unitCodes);

            function saveHouseCode()
            {

                Homey.emit('saveHouseCode', { "houseCode": houseCodes[houseCodes.selectedIndex].value });
            }

            function saveUnitCode()
            {
                Homey.emit('saveUnitCode', { "unitCode": unitCodes[unitCodes.selectedIndex].value });

            }

                var sameX10Address = document.createElement('div');
                sameX10Address.id = 'sameX10Address';              
                z.appendChild(sameX10Address);

                var youCanContinue = document.createElement('div');
                youCanContinue.id = 'youCanContinue';              
                z.appendChild(youCanContinue);

            Homey.on('same', function ()
            {
                //alert('same address detected')
                 sameX10Address.innerHTML = 'Already used houseCode and unitCode detected';
                 youCanContinue.innerHTML = 'You can continue to pair if you wish';
               
           })

            Homey.on('notSame', function ()
            {
             
                sameX10Address.innerHTML = 'Not used houseCode and unitCode detected';
                youCanContinue.innerHTML = 'You can continue to pair if you wish';              

           })








            var nextButton = document.createElement('div');
            nextButton.id = 'next';
            nextButton.className = 'button';
            nextButton.innerHTML = 'NEXT >';


            nextButton.style.position = 'absolute';
            nextButton.style.bottom = 0;
            nextButton.style.right = 0;
            nextButton.onclick = next;
            z.appendChild(nextButton);

            function next()
            {
               // alert('nextbutton pressed')


                var virtualDeviceClass = $('.deviceclasses-list input[name="deviceClass-dummy"]:checked');

                Homey.emit('done', function (err, device)
                {
                    if (virtualDeviceClass.length > 0)
                    {
                        device.virtualClass = $(virtualDeviceClass).val();
                        device.virtualCapabilities = $(virtualDeviceClass).data('capabilities').split(',');
                    }

                    Homey.addDevice(device, function ()
                    {
                        Homey.done();
                    });
                });


                document.body.innerHTML = '<i class="loading fa fa-cog fa-spin"></i>'


            }


        }

makehtml();

`   // end tick


        this.html = `
<!DOCTYPE html>
<div id='instruction'class="button" >Choose the housecode and unitcode of X10 device </div>
<div id='text' ></div>
`  // end tick
         
    } // end contructor
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

        
      
      


          this.init = (devices_data, callback) => {
              //variables needed in drvers self 
              this.devicesData = [];
              // to put the complete devices 
              this.homeyDevices = [];


              this.lib.log(driver + ' init   ', "init driver started")
              this.lib.log(driver + ' init Homey test  ', Homey.jil);
              //  this.lib.log('Generic this init ', util.inspect(this));

              devices_data.forEach(device_data => {
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



              this.pair = (socket) => {
                  let houseCode = ''
                  let unitCode = ''

          

                  this.send = { 'sendhtml': this.html, 'sendscript': this.scriptfunction}

                  socket.emit('pairHtml', this.send);

                socket.on("saveUnitCode", data =>
                {

                    this.lib.log('device 147 unitcode    ', data.unitCode);
                    unitCode = data.unitCode;
                    if (helpFunctions.containsX10Address2(this.appReference.homeyDevices, houseCode, unitCode)) {

                        socket.emit('same')
                    }
                    else { socket.emit('notSame') }

                });

                socket.on('saveHouseCode', data =>
                {

                    this.lib.log("device 147 housecode    ", data.houseCode);
                    houseCode = data.houseCode;

                    if (helpFunctions.containsX10Address2(this.appReference.homeyDevices, houseCode, unitCode)) {

                        socket.emit('same')
                    }
                    else { socket.emit('notSame')}
                   


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
                    this.lib.log(" pair done homeydevices doesnt containX10Address ", !helpFunctions.containsX10Address(this.appReference.homeyDevices, homeyDevice));
                    this.lib.log(" pair done homeydevicesundefined ", util.inspect(this.appReference.homeyDevices, null, false));


                    // let homeyDevice = libClass.computeHomeyDevice(app, driver, capabilities)
                    //if (!helpFunctions.containsX10Address(this.appReference.homeyDevices, homeyDevice))
                    //{
                        if (!this.appReference.homeyDevices)
                        { this.appReference.homeyDevices = [] }


                        deviceParams = {}

                        deviceParams.houseCode = houseCode
                        deviceParams.unitCode = unitCode


                        this.addDevice(deviceParams, app, driver, capabilities);
                        //  this.addDevice(device_data, app, driver, capabilities);
                        // this.homeyDevices.push(homeyDevice);
                        this.lib.log(" pair done after push device ", util.inspect(this.appReference.homeyDevices));
                    //} else
                    //{
                    //    //#Here i am
                    //    this.lib.log(" pair done in else updatacap ", util.inspect(this.appReference.homeyDevices, null, false));
                       
                    //}

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
                    // onoff


                    get: (device_data, callback) =>
                    {

                        this.lib.log(' capabilitis get onoff entered device_data', device_data)
                        // get the device with a locally defined function
                        let device = libClass.getDeviceById(device_data);

                        this.lib.log(' capabilitis get device. onoff  ', device)

                        this.lib.log(' capabilitis get device. onoff  ', device.capability.onoff)
                        this.lib.log('device_data  ', device_data)
                        if (device instanceof Error) return callback(device);

                      

                        // send the onoff value to Homey
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

            // if capabilities contains dim

            if (helpFunctions.containsCapability(capabilities, 'dim')) {

                this.capabilities.dim =

                    {
                        //  motion


                        get: (device_data, callback) => {

                            this.lib.log(' capabilitis get dim entered device_data', device_data)
                            // get the device with a locally defined function
                            let device = libClass.getDeviceById(device_data);

                            this.lib.log(' capabilitis get device. dim  ', device)

                            this.lib.log(' capabilitis get device. dim  ', device.capability.dim)
                            this.lib.log('device_data  ', device_data)
                            if (device instanceof Error) return callback(device);

                    
                            // send the dim value to Homey
                            if (typeof callback == 'function') {
                                callback(null, device.capability.dim);
                            }
                        },

                        set: (device_data, dim, callback) => {
                            // to set a circle you have to tranlate te modulemaccadress to appliance.id
                            // applinace id is  send to plugwise

                            this.lib.log('capabilitis set dim dim value   ', dim)


                            //if (device_data instanceof Error) return callback(device_data);
                            this.lib.log('capabilitis set  dim entered')

                            let device = libClass.getDeviceById(device_data);
                            // dim is value between 0 and 1
                           // get dim value of device
                           // check difference valie is between 0 and 1 number with two decimals
                           
                            //rfxtrx if sind bright in 3 steps it is on = 4xbright
                            //rfxtransmitter bright in 10-6 cstep = 2xbright
                            let dimDevice = device.capability.dim 
                              // if dim device < set dim  command = bright else dim 
                            let deltaDevDimComDim = dimDevice - dim   
                            let X10Command = ''

                            if (deltaDevDimComDim > 0)  // command = dim   device is brighter as command dim
                            {

                                X10Command = 'dim';


                            }
                            else if (deltaDevDimComDim < 0) // // command = bright   device is dimmer as command dim
                            {

                                X10Command = 'bright';

                            }




                            // update device capability
                            device.capability.dim = dim;

                            //translate for x10 function
                           

                         
                         //TODO: if dimdevice capability off or on  is set dim value to 0 or 1
                         //TODO:update device capability accordingly in device
                            


                         

                            this.lib.log('capabilitie dim  send to signal', dim)
                            this.lib.log("device that is sendng", device_data);


                            // signal.sendbitarray(signal.codeX10SendCommand(device_data.houseCode, device_data.unitCode, X10Command));

                            let sendCommand = {
                                'houseCode': device_data.houseCode,
                                'unitCode': device_data.unitCode,
                                'X10Command': X10Command   // bright or dim 
                            }
                            this.lib.log("sendcommand dim "  , util.inspect(    sendCommand    , false, null))
                            signal.emit('sendCommand', sendCommand )
                               
                            // this.updateDeviceOnOff(device_data, device, boolean:dim)
                            libClass.updateCapabilitiesHomeyDevice(app, `OnOff`, capabilities, device, 'onoff', true)
                          

                            libClass.updateCapabilitiesHomeyDevice(app, driver, capabilities, device, 'dim', dim)

                            let driverH = Homey.manager('drivers').getDriver('Dim');
                            driverH.realtime(device_data, 'onoff', true)

                            callback(null, dim);
                          
                            // });
                        }


                    } //capability dim















            }  // if dim






            if (helpFunctions.containsCapability(capabilities, 'alarm_motion'))
            {

                this.capabilities.alarm_motion = {
                    //  motion


                    get: (device_data, callback) =>
                    {

                        this.lib.log(' capabilitis get alarm_motion entered device_data', device_data)
                        // get the device with a locally defined function
                        let device = libClass.getDeviceById(device_data);

                        this.lib.log(' capabilitis get device. alarm_motion  ', device)
                        this.lib.log('device_data  ', device_data)
                        this.lib.log(' capabilitis get device. alarm_motion  ', device.capability.alarm_motion)


                        if (device instanceof Error) return callback(device);

                
                        // send the alarm_motion value to Homey
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
                    //  alarm_night


                    get: (device_data, callback) =>
                    {

                        this.lib.log(' capabilitis get alarm_night entered device_data', device_data)
                        // get the device with a locally defined function
                        let device = libClass.getDeviceById(device_data);

                        this.lib.log(' capabilitis get device. alarm_night  ', device)
                        this.lib.log('device_data  ', device_data)
                        this.lib.log(' capabilitis get device. alarm_night  ', device.capability.alarm_night)


                        if (device instanceof Error) return callback(device);

                    // send the alarm_night value to Homey
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

