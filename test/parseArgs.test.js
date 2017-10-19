var expect = require("chai").expect
var should = require("chai").should()
var _ = require("lodash")
var {parseArgs} = require("../lib/parseArgs")
describe("#Wrong Scenario", () => {
  describe("#excute with wrong type argument  required = false ", () => {
    var tree1 = {
      $ARGS: [{label:"copy",required:true,type:"number"}]
      ,$FN(){console.log("ok")}
    }
    it("Should return an error object", () => {
      parseArgs(["a simple string"], tree1).should.to.be.a('array')
    })
  })
  /*-------------------------------------------------------------------*/
  describe("#excute with too much argument", () => {
    var tree3 = {
      $ARGS: [{label:"copy",required:false,type:"string"}]
      ,$FN(){console.log("ok")}
    }
    it("Should return an error object", () => {
      fn3=parseArgs(["too","much"], tree3).should.to.be.a('array')
    })
  })
  /*-------------------------------------------------------------------*/
  describe("#excute with missing required argument", () => {
    var tree4 = {
      $ARGS: [{label:"copy",required:true,type:"string"},
      {label:"dest",required:true,type:"string"}]
      ,$FN(){console.log("ok")}
    }
    it("Should return an error object", () => {
      fn3=parseArgs(["too"], tree4).should.to.be.a('array')
    })
  })  
})

describe("#Success Scenario ", () => {
  describe("#excute whithout argument required = false ", () => {
    var tree = {
      $FN:function(){console.log("function executed")},
      $ARGS: [{label:"copy",required:false,type:"string"}]
    }
    it("shoud execute the function", () => {
      var fn=parseArgs([], tree).should.to.be.a("object")
    })
  })
  /*-------------------------------------------------------------------*/
})

