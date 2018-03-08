# HomeyX10



This app receives and transmits X10 signals over the air (433Mhz) (European x10 standard)
Makes Homey backward compatible with classic domotica , X10 functions 30 years now.

What works:

* X10 OnOff device
* X10 MS13E and lookalikes sensors (light alarm , movement alarm in one sensor)
* X10 Dim works

What doesn't:

*  All commands not yet implemented.

* The app shows all kind of referencing and extending possible in node.js 4.6.0 with Ecma6 , 
programming it was an excercise for Ecma6 and referencing


## changeLog


25-11-2016 admitted to github. and asked admisson app store Athom

27-11 -2016 removed not used save button from showoptions pair page which caused app crashes.

27-12-2016  made pair pages complete dynamic, so code only has to be written once for pairing
            added functionality to Dim device , so it works 

09-01-2017  starting a flow from a received X10 command implemented

19-06-2017 changed interval and sensitivity to new standards of homey 433 signal defenition , was changed with no notice or explanation 


[![Paypal donate][pp-donate-image]][pp-donate-link]
[pp-donate-link]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=42UGL52J4KPZE
[pp-donate-image]: https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif






Copyright (c) 2016 Jilles Miedema

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help



