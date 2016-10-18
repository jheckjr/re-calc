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

	describe('capRate', function() {
		it('should be 0 if price <= 0', function() {
			expect(calcFunctions.capRate()).to.equal(0);
			expect(calcFunctions.capRate(0,1000)).to.equal(0);
		});
		it('should be noi / price', function() {
			expect(calcFunctions.capRate(114000,8579)).to.be.within(7.5,7.6);
			expect(calcFunctions.capRate(100000,-1000)).to.be.within(-1.1,-1.0);
		});
	});

	describe('grossRentMult', function() {
		it('should be 0 if inputs <= 0', function() {
			expect(calcFunctions.grossRentMult()).to.equal(0);
			expect(calcFunctions.grossRentMult(0,0)).to.equal(0);
			expect(calcFunctions.grossRentMult(-1,1)).to.equal(0);
			expect(calcFunctions.grossRentMult(1,-1)).to.equal(0);
		});
		it('should be price / grossRev', function() {
			expect(calcFunctions.grossRentMult(128990,18000)).to.be.within(7.15,7.2);
		});
	});

	describe('cashROI', function() {
		it('should be 0 if cash outlay is 0', function() {
			expect(calcFunctions.cashROI()).to.equal(0);
			expect(calcFunctions.cashROI(1000,0)).to.equal(0);
		});
		it('should be cash flow / cash outlay', function() {
			expect(calcFunctions.cashROI(2651,22970)).to.be.within(11.5,11.6);
		});
	});

	describe('totalROI', function() {
		it('should be 0 if cash outlay is 0', function() {
			expect(calcFunctions.totalROI()).to.equal(0);
			expect(calcFunctions.totalROI(1000,1000,100,0)).to.equal(0);
		});
		it('should be sum / cash outlay', function() {
			expect(calcFunctions.totalROI(1933,1290,2651,22970)).to.be.within(25.5,25.6);
		});
	});

	describe('debtSCRatio', function() {
		it('should be 0 if loan payment is 0', function() {
			expect(calcFunctions.debtSCRatio()).to.equal(0);
			expect(calcFunctions.debtSCRatio(1000,0)).to.equal(0);
		});
		it('should be noi / loan payment', function() {
			expect(calcFunctions.debtSCRatio(8579,5928)).to.be.within(1.44, 1.46);
		});
	});

	describe('cashFlow', function() {
		it('should be noi - loan payment', function() {
			expect(calcFunctions.cashFlow(8579,5928)).to.equal(2651);
		});
	});

	describe('grossIncome', function() {
		it('should be 0 if vacancy rate not within [0,1]', function() {
			expect(calcFunctions.grossIncome(18000,8)).to.equal(0);
		});
		it('should be grossRev * (1-vacancyRate)', function() {
			expect(calcFunctions.grossIncome(18000,0.08)).to.equal(16560);
		});
	});

	describe('totalExpenses', function() {
		it('should be 0 if no expenses', function() {
			expect(calcFunctions.totalExpenses([])).to.equal(0);
		});
		it('should be sum of expenses', function() {
			expect(calcFunctions.totalExpenses([1760,480,1325,2700,1716])).to.equal(7981);
		});
	});

    // Remove ceil from functions and change tests
	describe('makeAmortSchedule', function() {
		it('should be [0] if inputs are 0', function() {
			expect(calcFunctions.makeAmortSchedule()).to.eql([0]);
			expect(calcFunctions.makeAmortSchedule(-1,10,10)).to.eql([0]);
			expect(calcFunctions.makeAmortSchedule(1000,-10,10)).to.eql([0]);
			expect(calcFunctions.makeAmortSchedule(1000,10,-10)).to.eql([0]);
		});
		it('should be an amortization schedule in an array', function() {
			let schedule = calcFunctions.makeAmortSchedule(106020,3.8,30);
			expect(schedule[0]).to.equal(106020);
			expect(schedule[1]).to.be.within(104087,104088);
			expect(schedule[30]).to.equal(0);
		});
	});
});
