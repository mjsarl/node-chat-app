var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', ()=>{
  it('should generate the correct new location message object', ()=>{
      var fromTxt = 'Mark';
      var textLat = '51.6076237';
      var textLng = '-0.6994039999999999';
      var textURL= 'https://www.google.com/maps/?q=51.6076237,-0.6994039999999999';
      var res = generateLocationMessage(fromTxt, textLat, textLng);

      expect(res.from).toMatch(fromTxt);
      expect(res.url).toMatch(textURL);
      //expect(res.createdAt).toBeA('date');

  });
});

// https://www.google.com/maps/?q=51.6076237,-0.6994039999999999
