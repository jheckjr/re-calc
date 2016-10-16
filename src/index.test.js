var expect = require('chai').expect;
var calcFunctions = require('./index');

describe('calc-functions', function() {
	describe('noi', function() {
		it('should return 0 with no inputs', function() {
			expect(calcFunctions.noi()).to.equal(0);
		});
		it('should be negative if expenses > income', function() {
			expect(calcFunctions.noi(10000, 11211)).to.equal(-1211);
		});
		it('should be positive if income > expenses', function() {
			expect(calcFunctions.noi(5432, 5000)).to.equal(432);
		});
	});
});
