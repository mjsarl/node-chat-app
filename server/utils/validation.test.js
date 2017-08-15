var expect = require('expect');
var {isRealstring} = require('./validation');

describe('isRealstring tests', ()=>{
  it('should reject non-string values', ()=>{
    var nonstring = {name: 'mickeyMouse', age: 205}
    var res = isRealstring(nonstring);
    expect(res).toBe(false);
  });
  
  it('should reject strings that only contain spaces', ()=>{
    var spacestring = '      ';
    var res = isRealstring(spacestring);
    expect(res).toBe(false);
    
  });
  
  it('should allow valid string values', ()=>{
    var validString = 'mickeyMouse';
    var res = isRealstring(validString);
    expect(res).toBe(true);

  });
});