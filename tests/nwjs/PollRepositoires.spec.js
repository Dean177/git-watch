var expect = require('chai').expect;

var PollRepositories = require('../../app/scripts/PollRepositories');

describe('placeholder', function(){
  describe('poll', function() {
    var tester = 'o hai';

    it('should be a string', function(){
      expect(tester).to.be.a('string');
    });

    it('should be "o hai"', function(){
      expect(tester).to.equal('o hai');
    });

    it('should be 5 chars long', function(){
      expect(tester).to.have.length(5);
    });

  })
});