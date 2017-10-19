var expect = require("chai").expect
var should = require("chai").should()
var _ = require("lodash")
var {checkTree} = require("../lib/checkTree")
describe("#Check Tree Wrog Scenario", () => {
  var tree={
    $ARGS:[{}]
  }
  describe("#missing name", () => {
    it("Should return an error", () => {
      checkTree(["a simple string"], tree).should.to.be.equal="non valid syntax tree"
    })
  })
})
