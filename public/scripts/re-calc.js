// /********************************
//  Produce an error or log msg if input is 0?

//  ********************************/

// /*
//  * Mortgage amount
//  * Input: purchase price
//  *		  downpayment amount
//  * Output: amount in mortgage in dollars
//  *
//  * amount = purchase - downpayment
//  */
function loanAmount(purchasePrice=0, downpayment=0) {
	if (purchasePrice <= 0 || downpayment <= 0)
		return 0;

	return purchasePrice - downpayment;
}

/*
 * Mortgage payment (fixed rate)
 * Input: loan amount
 *		  interest rate (percentage)
 *		  term in years
 * Output: monthly mortgage payment
 *
 * payment = (amount*(rate/12)*(1+(rate/12))^(term*12)) / ((1+(rate/12))^(term*12)-1)
 */
function loanPayment(loanAmount=0, intRate=0, loanTerm=0, monthly=true) {
	if (loanAmount <= 0 || intRate <= 0 || term <= 0) 
		return 0;

	let rate = (intRate / 100) / 12;	// monthly rate
	let term = loanTerm * 12;	// term in months
	let payment = (loanAmount * rate * Math.pow(1+rate, term)) / 
		(Math.pow(1+rate, term) - 1);

	if (monthly) 
		return payment;
	else
		return payment * 12;
}

/*
 * Cash outlay
 * Input: improvement cost
 * 		  closing costs
 *		  downpayment
 * Output: cash outlay amount
 *
 * outlay = improvement cost + closing cost + downpayment
 */
function cashOutlay(downpayment=0, closingCost=0, improvCost=0) {
	if (downpayment <= 0 || closingCost <= 0 || improvCost <= 0) 
		return 0;

	return downpayment + closingCost + improvCost;
}

/*
 * Downpayment
 * Input: purchase price
 * 		  downpayment percentage
 * Output: downpayment amount
 */
function downpaymentAmount(purchasePrice=0, downpaymentPct=0) {
	if (purchasePrice <= 0 || downpaymentPct <= 0) 
		return 0;

	return purchasePrice * downpaymentPct / 100;
}

/*
 * Gross Revenue
 * Input: monthly rent amounts
 * 		  other revenue sources
 * Output: monthly gross revenue
 */
function grossRevenue(rent=[], otherRev=0) {
	if (rent.length === 0) 
		return 0;

	let rentAmount = rent.reduce(function(prev, curr) {
		return prev += curr;
	});

	return rentAmount + otherRev;
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

	return totalCost / numUnits;
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

	return (noi / purchasePrice) * 100;
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

	return purchasePrice / grossRev;
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

	return (cashFlow / cashOutlay) * 100;
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

	return ((equity + appreciation + cashFlow) / cashOutlay) * 100;
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

	return noi / loanPayment;
}

/*
 * Cash flow
 * Input: noi
 *		  mortgage payment
 * Output: cash flow amount
 */
function cashFlow(noi=0, loanPayment=0) {
	return noi - loanPayment;
}

/*
 * Gross income
 * Input: gross revenue
 *		  vacancy rate (percentage)
 * Output: gross income
 */
function grossIncome(grossRev=0, vacancyRate=0) {
	if (vacancyRate < 0 || 100 < vacancyRate)
		return 0;

	return grossRev * (1 - (vacancyRate / 100));
}

/*
 * Total expenses
 * Input: list of annual expenses
 * Output: sum of expenses
 */
function totalExpenses(expenses=[]) {
	if (expenses.length === 0)
		return 0;

	return expenses.reduce(function(prev, curr) {
		return prev + curr;
	});
}

/*
 * NOI
 * Input: gross income
 * 		  total expenses
 * Output: NOI
 */
function noi(grossIncome=0, totalExpenses=0) {
	return grossIncome - totalExpenses;
}

/*
 * Equity accrued
 * Input: year
 * Output: equity accrued in that year
 * remainingLoanVal is array of yearly remaining loan amounts
 */
function equity(remainingLoanVal=[], year=0, total=false) {
	if (remainingLoanVal.length === 0) 
		return 0;
	if (year === 0)
		return remainingLoanVal[year];

	if (!total)
		return remainingLoanVal[year-1] - remainingLoanVal[year];
	else
		return this.remainingLoanVal.reduce(function(prev, curr, index, arr) {
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
function appreciation(arv=0, appRate=0, year=0, total=false) {
	if (year === 0)
		return arv;

	let totalApp = 0;
	let annualApp = 0;
	let rate = appRate / 100;

	for (let i = 1; i <= year; i++) {
		annualApp = rate * (arv + totalApp);
		totalApp += annualApp;
	}

	if (!total)
		return annualApp;
	else
		return totalApp;
}

/*
 * Create amortization schedule
 * Input: loan amount
 * 		  interest rate
 *		  loan term (years)
 * Output: array of yearly remaining loan amounts
 */
function makeAmortSchedule(loanAmount=0, intRate=0, loanTerm=0) {
	if (loanAmount <= 0 || intRate <= 0 || loanTerm <= 0)
		return [0];

	let schedule = [loanAmount];
	let monthlyRate = (intRate / 100) / 12;
	let monthlyRem = loanAmount;
	let payment = this.loanPayment(loanAmount, intRate, loanTerm);

	for (let i = 1; i <= loanTerm*12; i++) {
		let principal = payment - (monthlyRem * monthlyRate);
		monthlyRem -= principal;

		if (i % 12 === 0)
			schedule.push(monthlyRem);
	}

	// Remove rounding error
	schedule[loanTerm] = 0;

	return schedule;
}

export {reCalc: {
	loanAmount: loanAmount,
	loanPayment: loanPayment,
	cashOutlay: cashOutlay,
	downpaymentAmount: downpaymentAmount,
	grossRevenue: grossRevenue,
	unitCost: unitCost,
	capRate: capRate,
	grossRentMult: grossRentMult,
	cashROI: cashROI,
	totalROI: totalROI,
	debtSCRatio: debtSCRatio,
	cashFlow: cashFlow,
	grossIncome: grossIncome,
	totalExpenses: totalExpenses,
	makeAmortSchedule: makeAmortSchedule,
	appreciation: appreciation,
	equity: equity,
	noi: noi
}};