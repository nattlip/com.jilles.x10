//http://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files?rq=1
// done this way you avoid "this is not a function" and you dont have to reference them
// use require('./lib/lib.js')(); in referencing file and no li. just name function
module.exports = function ()
{
    // the old way ecma 5
    this.ComplementBitArray5 = function (ba)
    {
        var baComplement = [];

        for (var i = 0; i < ba.length; i++)
        {

            if (ba[i] == 0)
            {
                baComplement[i] = 1;
            } else if (ba[i] == 1)
            {
                baComplement[i] = 0
            };
        };
        return baComplement
    };
    // the new way ecma 6
    this.ComplementBitArray6 = a => a.map(v => { if (v === 1) { v = 0 } else if (v === 0) { v = 1 } return v });
    this.ComplementBitArray7 = a => a.map(v => { (v === 1) ? v = 0 : v = 1; return v });
    //etc


    // [1, 3, 4, 2].find(x => x > 3) // 4
    // parentheses around those arguments(y, z, w,v)
    // checks if zeros and ones are equal in byte and complentbytr
    this.checkZerosAndOnes = (y, z, w, v) => y.concat(z).filter(x => x == 1).length == y.concat(z).filter(x => x == 0).length &&
        w.concat(v).filter(x => x == 1).length == w.concat(v).filter(x => x == 0).length

    this.checkvalidcomplement = (y, z, q, w) => y.length == z.length && y.every((v, i) => v === ComplementBitArray7(z)[i]) &&
        q.length == w.length && q.every((v, i) => v === ComplementBitArray7(w)[i])

    // on off to true false
    this.makeBoolean = (x) => { if (x === 'on') { return true } if (x === 'off') { return false }}



    // the old way check if a contains obj
    this.contains = function (a, obj)
    {
        for (var i = 0; i < a.length; i++)
        {
            if (a[i].data.id == obj.data.id)
            {
                return true;
            }
        }
        return false;
    };

    //  e = element  devicee in devices
    this.contains2 = (a, b) => e.some(e => e.data.id === b.data.id)

    // check if capability exists in string
    this.containsCapability = (a,b) => e.some(e => e === b)
   
};