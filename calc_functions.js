/********************************
 Produce an error or log msg if input is 0?

 ********************************/

/*
 * Mortgage amount
 * Input: purchase price
 *		  downpayment amount or percentage
 * Output: amount in mortgage in dollars
 *
 * amount = purchase - downpayment
 */
function loanAmount(purchasePrice=0, downpayment=0) {
	if (purchasePrice <= 0 || downpayment <= 0)
		return 0;

	if (downpayment <= 1) 
		return Math.ceil(purchasePrice * (1-downpayment));
	else 
		return Math.ceil(purchasePrice - downpayment);
}

/*
 * Mortgage payment (fixed rate)
 * Input: loan amount
 *		   interest rate
 *		   term in years
 * Output: monthly mortgage payment
 *
 * payment = (amount*(rate/12)*(1+(rate/12))^(term*12)) / ((1+(rate/12))^(term*12)-1)
 */
function loanPayment(loanAmount=0, intRate=0, loanTerm=0, monthly=True) {
	if (loanAmount <= 0 || intRate <= 0 || term <= 0) 
		return 0;

	let rate = intRate / 12;	// monthly rate
	let term = loanTerm * 12;	// term in months
	let payment = (loanAmount * rate * Math.pow(1+rate, term)) / 
		(Math.pow(1+rate, term) - 1);

	if (monthly) 
		return Math.ceil(payment);
	else
		return Math.ceil(payment * 12);
}

/*
 * Cash outlay
 * Input: improvement cost
 * 		closing costs
 *		downpayment
 * Output: cash outlay amount
 *
 * outlay = improvement cost + closing cost + downpayment
 */
function cashOutlay(downpayment=0, closingCost=0, improvCost=0) {
	if (downpayment <= 0 || closingCost <= 0 || improvCost <= 0) 
		return 0;

	return Math.ceil(downpayment + closingCost + improvCost);
}

/*
 * Downpayment
 * Input: purchase price
 * 		  downpayment percentage
 * Output: downpayment amount
 */
function downpaymentAmount(purchasePrice=0, downpaymentPct=0) {
	if (purchasePrice <= 0 || downpaymentPct <= 0 || 1 < downpaymentPct) 
		return 0;

	return Math.ceil(purchasePrice * downpaymentPct);
}

/*
 * Gross Revenue
 * Input: monthly rent amounts
 * 		  other revenue sources
 * Output: monthly gross revenue (or annual)
 */
function grossRevenue(rent=[], otherRev=0, monthly=True) {
	if (rent.length === 0) 
		return 0;

	let rentAmount = rent.reduce(function(prev, curr) {
		prev += curr;
	});

	if (monthly)
		return Math.ceil(rentAmount + otherRev);
	else
		return Math.ceil((rentAmount + otherRev) * 12);
}

/*
 * Cost/unit
 * Input: total purchase cost
 *		  number of units
 * Output: cost amount per unit
 */
function unitCost(totalCost=0, numUnits=0) {
	if (totalCost <= 0 || numUnits <= 0)
		return 0;

	return Math.ceil(totalCost / numUnits);
}

/*
 * Cap rate
 * Input: NOI
 *		  purchase cost
 * Output: cap rate (percentage)
 */
function capRate(purchasePrice=0, noi=0) {
	if (purchasePrice <= 0)
		return 0;

	let capRate = noi / purchasePrice;
	return capRate.toFixed(1);
}

/*
 * Gross rent multiplier
 * Input: purchase price
 *		  gross revenue per year
 * Output: gross rent multiplier
 */
function grossRentMult(purchasePrice=0, grossRev=0) {
	if (purchasePrice <= 0 || grossRev <= 0) 
		return 0;

	let grm = purchasePrice / grossRev;
	return grm.toFixed(1);
}

/*
 * Cash ROI
 * Input: annual cash flow
 *		  cash outlay
 * Output: cash ROI percentage
 */
function cashROI(cashFlow=0, cashOutlay=0) {
	if (cashOutlay === 0) 
		return 0;

	let roi = cashFlow / cashOutlay;
	return roi.toFixed(1);
}

/*
 * Total ROI
 * Input: equity accrued
 *   	  appreciation
 *		  annual cash flow
 *		  cash outlay
 * Output: total ROI percentage
 */
function totalROI(equity=0, appreciation=0, cashFlow=0, cashOutlay=0) {
	if (cashOutlay === 0) 
		return 0;

	let roi = (equity + appreciation + cashFlow) / cashOutlay;
	return roi.toFixed(1);
}

/*
 * Debt service coverage ratio (DSCR)
 * Input: annual NOI
 *		  annual mortgage payment
 * Output: DSCR
 */
function debtSCRatio(noi=0, loanPayment=0) {
	if (loanPayment === 0) 
		return 0;

	let dscr = noi / loanPayment;
	return dscr.toFixed(2);
}

/*
 * Cash flow
 * Input: noi
 *		  mortgage payment
 * Output: cash flow amount
 */
function cashFlow(noi=0, loanPayment=0) {
	return Math.ceil(noi - loanPayment);
}

/*
 * Gross income
 * Input: gross revenue
 *		  vacancy rate (decimal [0, 1])
 * Output: gross income
 */
function grossIncome(grossRev=0, vacancyRate=0) {
	return Math.ceil(grossRev * (1-vacancyRate));
}

/*
 * Total expenses
 * Input: list of annual expenses
 * Output: sum of expenses
 */
function totalExpenses(expenses=[]) {
	if (expenses.length === 0)
		return 0;

	return Math.ceil(expenses.reduce(function(prev, curr) {
		return prev + curr;
	}));
}

/*
 * NOI
 * Input: gross income
 * 		  total expenses
 * Output: NOI
 */
function noi(grossIncome=0, totalExpenses=0) {
	return Math.ceil(grossIncome - totalExpenses);
}

/*
 * Equity accrued
 * Input: year
 * Output: equity accrued in that year
 * remainingLoanVal is array of yearly remaining loan amounts
 */
function equity(year=0, total=False) {
	if (year === 0)
		return remainingLoanVal[year];

	if (!total)
		return remainingLoanVal[year-1] - remainingLoanVal[year];
	else
		return remainingLoanVal.reduce(function(prev, curr, index, arr) {
			if (index <= year)
				return prev + (arr[index] - arr[index - 1]);
			else
				return prev;
		});
}

/*
 * Appreciation
 * Input: after repair value
 *		  appreciation rate
 		  year
 * Output: appreciation amount
 */
function appreciation(arv=0, appRate=0, year=0, total=False) {
	if (year === 0)
		return arv;

	let totalApp = 0;
	let annualApp = 0;

	for (let i = 1; i <= year; i++) {
		annualApp = appRate * (arv + totalApp);
		totalApp += annualApp;
	}

	if (!total)
		return Math.ceil(annualApp);
	else
		return Math.ceil(totalApp);
}

/*
 * Create amortization schedule
 * Input: loan amount
 * 		  interest rate
 *		  loan payment
 *		  loan term (years)
 * Output: array of yearly remaining loan amounts
 */
function makeAmortSchedule(loanAmount=0, loanPayment=0, intRate=0, loanTerm=0) {
	if (loanAmount <= 0 || loanPayment <= 0 || intRate <= 0 || loanTerm <= 0)
		return [0];

	let schedule = [loanAmount];
	let monthlyRate = intRate / 12;
	let monthlyRem = loanAmount;

	for (let i = 1; i <= loanTerm*12; i++) {
		let principal = loanPayment - (monthlyRem * monthlyRate);
		monthlyRem -= principal;

		if (i % 12 === 0)
			schedule.push(monthlyRem);
	}

	return schedule;
}