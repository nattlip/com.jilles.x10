"use strict";
const util = require('util');
const Dim = require('../Dim.js');
const libClass = require('../../lib/libClass.js')

let lib = new libClass();
this.debug = true;//  to set debug on or off  
let name = 'driver.js Dim::';
lib.log = lib.log.bind(this, name); // makes that this class is this in function and not base class
lib.log(` ${this.constructor.name}  is this.         welkom to ${this.constructor.name}`);





lib.log('Dim inits in driver.js ', util.inspect(Dim))
lib.log('Dim inits init driver.js ', util.inspect(Dim.init.toString(), { showHidden: true, depth: null, showProxy: true }))
module.exports = Dim;
