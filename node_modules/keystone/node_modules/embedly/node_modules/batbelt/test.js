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

var BB = require('./index')
  , should = require('should')

describe("BatBelt", function() {
  it("should flatten arrays of arrays", function() {
    BB.flatten([[1,2],[3,[4,[5]],6],7,8]).should.eql([1,2,3,4,5,6,7,8]) } )

  it("should listify strings", function() {
    BB.listify("bob").should.eql(["bob"]) } )

  it("should times strings", function() {
    BB.times("bob", 2).should.eql(["bob", "bob"]) } )

  it("should round numbers", function() {
    BB.round(452, 20).should.eql(440) } )

  it("should merge objects", function() {
    BB.merge
      ( { first: "default" , second: "default"}
      , {second: "set" , third: "set"} )
    .should.eql(
        { first: "default" , second: "set", third: "set"} ) } ) } )
