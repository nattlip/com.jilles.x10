"use strict";

var util = require('util');
var convert = require('../../lib/baseConverter').jan.ConvertBase;
var helpFunctions = require('../../lib/helpFunctions.js').jan;
var app = require('../../app.js')
var signal = require('../../signalx10.js');





function createDriver(driver)
{


   

    var jil = app.x10Devicetypes;

    

 



    var self = {




        // the devices_data with devices data id house code and unit code
        devicesData: [],
        // to put the complete devices 
        homeyDevices: [],

        houseCode: "",
        unitCode: "",

        tobepaireddevice: {}, // device to pair





        init: function (devices_data, callback)
        {








            console.log('driver Oregon', "init driver started")

            devices_data.forEach(function (device_data)
            {
                addDevice(device_data);

            });








            //console.log('driver 70 devices_data', util.inspect(devices_data, false, null))
            //console.log('driver 71 devices_data', util.inspect(self.devicesData, false, null))
            //console.log('driver 72 devices_data', util.inspect(self.homeyDevices, false, null))

            callback();











        },  // end init
        //#region views
        viewOrder: ["show_options", "generic_done"],

        views: [
            {
                "template": "../drivers/Dim/pair/showoptions.html",
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
                "template": "../drivers/Dim/pair/done.html",
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
        ],


        //#endregion




        pair: function (socket)
        {



            socket.on('press_button', function (data) { console.log('pairing button pressed  ', data) });

            //app.json pair id = in frontend  list_sensors , pair template = in backend list_devices 
            socket.on('show_options', function (data, callback)
            {


                var device_data = {
                    name: "New Device",
                    data: {
                        id: "abcd1234"
                    }
                }


                // console.log('devise length  ' , homeyDevices.length)
                // err, result style
                //send device data to be paired to pGE
                callback(null, [device_data]);

                // even when we found another device, these can be shown in the front-end
                //setTimeout(function () {
                //    socket.emit('list_devices', moreDevices)
                //}, 2000)


            });


            socket.on("saveUnitCode", function (data)
            {

                util.log("Dim 147 unitcode    ", data.unitCode);
                self.unitCode = data.unitCode;
            });

            socket.on('saveHouseCode', function (data)
            {

                util.log("Dim 147 housecode    ", data.houseCode);
                self.houseCode = data.houseCode;
            });


            socket.on("done", function (data, callback)
            {








                self.tobepaireddevice = {
                    data: {
                        id: "X10" + self.houseCode + self.unitCode,
                        houseCode: self.houseCode,
                        unitCode: self.unitCode,
                        address: self.houseCode + self.unitCode
                    },
                    type: "Dim",
                    name: "X10" + "Dim" + self.houseCode + self.unitCode,
                    capabilities: ["onoff","dim"],
                    onoff: false,
                    dim: 1
                };


                console.log("device", self.tobepaireddevice);

                if (!contains(self.homeyDevices, self.tobepaireddevice))
                {
                    self.homeyDevices.push(self.tobepaireddevice);
                } else
                {

                    self.updateCapabilitiesHomeyDevice(self.tobepaireddevice);
                }

                //var devicedataobj = { "id": device.data.id };


                callback(null, self.tobepaireddevice);
                //socket.emit('pairingdone', '', function (err, result) {
                //    console.log(result) // Hi!
                //});

            });




            socket.on('disconnect', function ()
            {

            })

        },

        capabilities: {



            onoff: {
                //  motion


                get: function (device_data, callback)
                {

                    console.log('capabilitis get onoff entered')

                    // get the bulb with a locally defined function
                    var device = getDeviceById(device_data);
                    console.log('driver 279 capabilitis get device. onoff  ', device.onoff)
                    console.log('driver 201 device_data  ', device_data)
                    if (device instanceof Error) return callback(device);

                    //  self.realtime(device_data, 'onoff', device.onoff);

                    // send the dim value to Homey
                    if (typeof callback == 'function')
                    {
                        callback(null, device.onoff);
                    }
                },

                set: function (device_data, onoff, callback)
                {
                    // to set a circle you have to tranlate te modulemaccadress to appliance.id
                    // applinace id is  send to plugwise

                    console.log('capabilitis set onoff    ', onoff)


                    //if (device_data instanceof Error) return callback(device_data);
                    console.log('capabilitis set  onoff entered')

                    var device = getDeviceById(device_data);

                    //if (device.onoff == true) {
                    //    onoff = false;
                    //}
                    //else if (device.onoff == false) {
                    //    onoff = true;
                    //}

                    device.onoff = onoff;

                    //translate for x10 function
                    var X10Command = ''

                    if (onoff == true)
                    {
                        X10Command = 'on';
                    }
                    else if (onoff == false)
                    {
                        X10Command = 'off';
                    }

                    console.log('capabilitis set  send to plugwise', onoff)
                    console.log("device that is sendng", device_data);

                    //   var send = signal.codeX10Command(device_data.houseCode, device_data.unitCode, X10Command)
                    signal.sendbitarray(signal.codeX10Command(device_data.houseCode, device_data.unitCode, X10Command));

                    updateDeviceOnOff(self, device_data, onoff)
                    //  module.exports.realtime(device_data, 'onoff', onoff);

                    //     // Return state
                    callback(null, onoff);
                    // });
                }
            },


                dim: {
                    //  motion


                    get: function (device_data, callback)
                    {

                        console.log('capabilitis get dim entered')

                        // get the bulb with a locally defined function
                        var device = getDeviceById(device_data);
                        console.log('driver 279 capabilitis get device. dim  ', device.dim)
                        console.log('driver 201 device_data  ', device_data)
                        if (device instanceof Error) return callback(device);

                        //  self.realtime(device_data, 'dim', device.dim);

                        // send the dim value to Homey
                        if (typeof callback == 'function')
                        {
                            callback(null, device.dim);
                        }
                    },

                    set: function (device_data, dim, callback)
                    {
                        // to set a circle you have to tranlate te modulemaccadress to appliance.id
                        // applinace id is  send to plugwise

                        console.log('capabilitis set dim    ', dim)


                        //if (device_data instanceof Error) return callback(device_data);
                        console.log('capabilitis set  dim entered')

                        var device = getDeviceById(device_data);

                        //if (device.dim == true) {
                        //    dim = false;
                        //}
                        //else if (device.dim == false) {
                        //    dim = true;
                        //}

                        device.dim = dim;

                        //translate for x10 function
                        var X10Command = ''

                        if (dim == true)
                        {
                            X10Command = 'on';
                        }
                        else if (dim == false)
                        {
                            X10Command = 'off';
                        }

                        console.log('capabilitis set  send to plugwise', dim)
                        console.log("device that is sendng", device_data);

                        //   var send = signal.codeX10Command(device_data.houseCode, device_data.unitCode, X10Command)
                        signal.sendbitarray(signal.codeX10Command(device_data.houseCode, device_data.unitCode, X10Command));

                        updateDeviceDim(self, device_data, dim)
                 //  module.exports.realtime(device_data, 'dim', onoff);

                        //     // Return state
                        callback(null, dim);
                        // });
                    }



                }
          
        }// capabilities




    };// end self

    function updateDeviceOnOff(self, device, onoff)
    {
        device.onoff = onoff;
        self.realtime(device, 'onoff', onoff);
    }

    function updateDeviceDim(self, device, dim)
    {
        device.dim = dim;
        self.realtime(device, 'dim', dim);
    }


    function addDevice(deviceIn)
    {
        self.devicesData.push(deviceIn);

        self.homeyDevices.push(
            {
                data: {
                    id: deviceIn.id,
                    houseCode: deviceIn.houseCode,
                    unitCode: deviceIn.unitCode,
                    address: deviceIn.houseCode + deviceIn.unitCode,
                },
                type: "Dim",
                name: "X10" + "Dim" + deviceIn.houseCode + deviceIn.unitCode,
                capabilities: ["onoff"],
                onoff: false,
            });

     // console.log('driver 342 homeydevices in adddevice', util.inspect(self.homeyDevices, false, null));
    };

    function getDeviceById(deviceIn)
    {
        console.log('getDeviceById deviceIn', deviceIn);
        var matches = self.homeyDevices.filter(function (d)
        {

            return d.data.id == deviceIn.id;
        });
        return matches ? matches[0] : null;
    };



    //updates capabilities and realtime

    self.updateCapabilitiesHomeyDevice = function (dev)
    {
        //  console.log('567 changeDesc  dev     ', util.inspect(dev1, false, null));
        //  console.log('567 changeDesc homeyDevices before change  ', util.inspect(homeyDevices, false, null));

        for (var i in self.homeyDevices)
        {


            if (self.homeyDevices[i].data.address == dev.data.address)
            {
                //  console.log('567 updateCapabilitiesHomeyDevice before change homeyDevices[i]  ', util.inspect(homeyDevices[i], false, null));
                self.homeyDevices[i].onoff = dev.onoff;
                self.realtime(self.homeyDevices[i].data, 'onoff', dev.onoff);



                console.log('updateCapabilitiesHomeyDevice self.homeyDevices[i].data   ', self.homeyDevices[i].data)

              //console.log('567 updateCapabilitiesHomeyDevice after change homeyDevices[i]  ', util.inspect(self.homeyDevices[i], false, null))

                break;  //stop this loop we found it
            }



        }
    }












    return self;
} // end createdriver





module.exports = {
    createDriver: createDriver
};









function contains(a, obj)
{
    for (var i = 0; i < a.length; i++)
    {
        if (a[i].data.id == obj.data.id)
        {
            return true;
        }
    }
    return false;
}

function checkIfDeviceIsInHod(deviceIn)
{
    var matches = homeyDevices.filter(function (d)
    {
        return d.address == deviceIn.address;
    });
    return matches ? matches : null;
}

//TODO: update cappabilities not needed in actor device 