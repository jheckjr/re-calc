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
