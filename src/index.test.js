var expect = require('chai').expect;
var calcFunctions = require('./index');

describe('calc-functions', function() {
	describe('noi', function() {
		it('should be 0 with no inputs', function() {
			expect(calcFunctions.noi()).to.equal(0);
		});
		it('should be negative if expenses > income', function() {
			expect(calcFunctions.noi(10000, 11211)).to.equal(-1211);
		});
		it('should be positive if income > expenses', function() {
			expect(calcFunctions.noi(5432, 5000)).to.equal(432);
		});
	});

	describe('loanAmount', function() {
		it('should be 0 if no inputs or inputs are negative', function() {
			expect(calcFunctions.loanAmount()).to.equal(0);
			expect(calcFunctions.loanAmount(-1, 1)).to.equal(0);
			expect(calcFunctions.loanAmount(1,-1)).to.equal(0);
		});
		it('should be difference of inputs if downpayment > 1', function() {
			expect(calcFunctions.loanAmount(50000, 10000)).to.equal(40000);
			expect(calcFunctions.loanAmount(76000, 2)).to.equal(75998);
		});
		it('should be price * (1-downpayment) if downpayment <= 1', function() {
			expect(calcFunctions.loanAmount(50000, 0.2)).to.equal(40000);
			expect(calcFunctions.loanAmount(50000, 1)).to.equal(0);
		});
	});

	describe('loanPayment', function() {
		it('should be 0 if no inputs or inputs <= 0', function() {
			expect(calcFunctions.loanPayment()).to.equal(0);
			expect(calcFunctions.loanPayment(-1,1,1)).to.equal(0);
			expect(calcFunctions.loanPayment(1,0,-1)).to.equal(0);
			expect(calcFunctions.loanPayment(1,-1,1)).to.equal(0);
			expect(calcFunctions.loanPayment(1,0,0)).to.equal(0);
		});
		it('should be 430 for input (90000,4,30)', function() {
			expect(calcFunctions.loanPayment(90000,4,30)).to.equal(430);
		});
		it('should be 5032 for input (90000,3.8,30,False)', function() {
			expect(calcFunctions.loanPayment(90000,3.8,30,false)).to.be.within(5032,5034);
		});
	});

	describe('cashOutlay', function() {
		it('should be 0 if no inputs or inputs <= 0', function() {
			expect(calcFunctions.cashOutlay()).to.equal(0);
			expect(calcFunctions.cashOutlay(-1,1,1)).to.equal(0);
			expect(calcFunctions.cashOutlay(1,-1,1)).to.equal(0);
			expect(calcFunctions.cashOutlay(0,1,-1)).to.equal(0);
			expect(calcFunctions.cashOutlay(1,0,0)).to.equal(0);
		});
		it('should be 24500 for input (10000,3500,11000)', function() {
			expect(calcFunctions.cashOutlay(10000,3500,11000)).to.equal(24500);
		});
	});

	describe('downpaymentAmount', function() {
		it('should be 0 if no inputs or inputs <= 0', function() {
			expect(calcFunctions.downpaymentAmount()).to.equal(0);
			expect(calcFunctions.downpaymentAmount(-1,1)).to.equal(0);
			expect(calcFunctions.downpaymentAmount(1,-1)).to.equal(0);
			expect(calcFunctions.downpaymentAmount(10000, 1.1)).to.equal(0);
		});
		it('should be price * downpayment', function() {
			expect(calcFunctions.downpaymentAmount(100000,0.1)).to.equal(10000);
			expect(calcFunctions.downpaymentAmount(114000,0.07)).to.be.within(7980,7982);
		});
	});

	describe('grossRevenue', function() {
		it('should be 0 if no rents', function() {
			expect(calcFunctions.grossRevenue()).to.equal(0);
			expect(calcFunctions.grossRevenue([],1000)).to.equal(0);
		});
		it('should be sum of inputs', function() {
			expect(calcFunctions.grossRevenue([500, 450])).to.equal(950);
			expect(calcFunctions.grossRevenue([500, 450],100)).to.equal(1050);
		});
		it('should be sum of inputs * 12 in annual', function() {
			expect(calcFunctions.grossRevenue([500, 450],0,false)).to.equal(11400);
			expect(calcFunctions.grossRevenue([900, 625, 650],75,false)).to.equal(27000);
		});
	});

	describe('unitCost', function() {
		it('should be 0 if input <= 0', function() {
			expect(calcFunctions.unitCost()).to.equal(0);
			expect(calcFunctions.unitCost(-1,1)).to.equal(0);
			expect(calcFunctions.unitCost(1,-1)).to.equal(0);
		});
		it('should be cost / units', function() {
			expect(calcFunctions.unitCost(100000, 2)).to.equal(50000);
			expect(calcFunctions.unitCost(229000, 4)).to.equal(57250);
		});
	});
});
