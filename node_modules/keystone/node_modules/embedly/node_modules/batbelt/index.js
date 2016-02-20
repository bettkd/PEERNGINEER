// # BatBelt #
//
// ![logo](http://static.embed.ly/batbelt/logo.gif "BatBelt")
//
// Helps prevent an untimely death.
//
//   $ npm install batbelt

/*
 * Copyright (c) 2012 Bob Corsaro
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

var H = require('hashish')


// ****
// ## flatten ##
//
// Flatten an array.
//
// _ex_ `flatten([[1,2],[3],4,5]) -> [1,2,3,4,5]`

function flatten(array) {
  var result = [], self = arguments.callee;
  array.forEach(function(item) {
    Array.prototype.push.apply(
      result,
      Array.isArray(item) ? self(item) : [item] ) } )
  return result }


// ****
// ## listify ##
//
// If it's not an Array, cast it to one.
//
// _ex_ `listify("bob") -> ["bob"]`
//      `listify(["bob"]) -> ["bob"]`

function listify(obj) {
  if (!Array.isArray(obj)) {
    return [obj] }
  else {
    return obj } }


// ****
// ## times ##
//
// Make an Array of str. Your str cannot contain "$%#$".
//
// _ex_ `times('?', 4) -> ['?', '?', '?', '?']`

function times(str, n) {
  return Array(n+1).join('?').split('').join('$%#$').replace(/\?/g, str).split('$%#$') }


// ****
// ## round ##
//
// Round down to arbitrary increment.
//
// _ex_ `round(453, 10) -> 450`

function round(number, increment) {
  number = Number(number)
  increment = Number(increment)
  return Math.round(number - number % increment) }


// ****
// ## NOOP ##

function NOOP() {}


// ****
// ## merge ##
//
// Merge two objects. The second can be null.
//
// _ex_ `merge( {first: "default", second: "default"}
//           , {second: "set", third: "set"}) ->
//      {first: "default", second: "set", third: "set"}`

function merge(first, second) {
  return H(first).update(second||{}).end }


exports = module.exports =
  { flatten: flatten
  , listify: listify
  , times: times
  , round: round
  , NOOP: NOOP
  , merge: merge }
