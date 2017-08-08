var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate the correct message object', ()=>{
      var fromTxt = 'Mark';
      var textTxt = 'Test text for message';
      var res = generateMessage(fromTxt, textTxt);

      expect(res.from).toMatch(fromTxt);
      expect(res.text).toMatch(textTxt);
      //expect(res.createdAt).toBeA('date');

  });
});
