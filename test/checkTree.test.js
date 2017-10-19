var expect = require("chai").expect
var should = require("chai").should()
var _ = require("lodash")
var {checkTree} = require("../lib/checkTree")
describe("#Check Tree Wrog Scenario", () => {
  
  fn=()=>{
    var tree={
      $ARGS:[{}]
    }
    checkTree(tree)
  }
  describe("#missing name", () => {
    it("Should return an error", () => {
      expect(fn).to.throw("non valid syntax tree");
    })
  })
})
describe("#Check Tree Success Scenario", () => {
  var tree1={
    $ARGS:[{name:"tableName"}]
  }
  describe("#have just the name", () => {
    it("Should generate default", () => {
      checkTree(tree1).should.to.deep.include={label:"table_name"}
      checkTree(tree1).should.to.deep.include={required:false}
      checkTree(tree1).should.to.deep.include={type:"any"}
    })
  })
})
