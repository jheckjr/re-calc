//import reCalc from "re-calc";

var CalculatorBox = React.createClass({
	getInitialState: function() {
		return {
			propInfo: {
				title: '',
				street: '',
				city: '',
				state: '',
				zip: '',
				description: '',
				mls: '',
				notes: '',
				image: ''
			},
			purchaseInfo: {
				purchasePrice: 0,
				closingCost: 0,
				repairCost: 0,
				arv: 0,
				downpayment: 0,
				intRate: 0,
				loanTerm: 0
			},
			rentalInfo: {
				monthlyRent: [0],
				otherIncome: 0,
				vacancyRate: 0,
				electricity: 0,
				gas: 0,
				water: 0,
				sewer: 0,
				trash: 0,
				other: 0,
				repairs: 0,
				propMgmt: 0,
				propTax: 0,
				insurance: 0,
				revIncrease: 0,
				expIncrease: 0,
				appreciation: 0
			}
		};
	},

	render: function() {
		return (
			<div>
				<PropInfoBox
					propInfo={this.state.propInfo}
				/>
				<PurchaseInfoBox 
					purchaseInfo={this.state.purchaseInfo}
				/>
				<RentalInfoBox 
					rentalInfo={this.state.rentalInfo}
				/>
				<ResultsBox 
					purchaseInfo={this.state.purchaseInfo}
					rentalInfo={this.state.rentalInfo}
				/>
			</div>
		);
	}
});

var PropInfoBox = React.createClass({
	render: function() {
		return (
			<div className="propInfoBox">
				<h2>Property Info</h2>
				<form className="propInfoForm">
					<label>
						Report Title
						<input
							type="text"
						/>
					</label>
					<label>
						Street Address
						<input
							type="text"
							placeholder="123 Main St"
						/>
					</label>
					<label>
						City
						<input
							type="text"
							placeholder="Smalltown"
						/>
					</label>
					<label>
						State
						<input
							type="text"
							placeholder="CA"
						/>
					</label>
					<label>
						Zip Code
						<input
							type="text"
							placeholder="12345"
						/>
					</label>
					<label>
						Sales Description
						<textarea />
					</label>
					<label>
						MLS #
						<input
							type="number"
						/>
					</label>
					<label>
						Notes
						<textarea />
					</label>
					<label>
						Picture
						<input 
							type="file"
							accept="image/*"
						/>
					</label>
				</form>
			</div>
		);
	}
});

var PurchaseInfoBox = React.createClass({
	render: function() {
		var totalCost = this.props.purchaseInfo.purchasePrice + this.props.purchaseInfo.closingCost + this.props.purchaseInfo.repairCost;
		var downpaymentAmt = reCalc.downpaymentAmount(this.props.purchaseInfo.purchasePrice, this.props.purchaseInfo.downpayment);
		var loanAmt = reCalc.loanAmount(this.props.purchaseInfo.purchasePrice, downpaymentAmt);
		var loanPayment = reCalc.loanPayment(loanAmt, this.props.purchaseInfo.intRate, this.props.purchaseInfo.loanTerm);

		return (
			<div className="purchaseInfoBox">
				<h2>Purchase Info</h2>
				<form className="propInfoForm">
					<label>
						Purchase Price
						<input
							type="number"
						/>
					</label>
					<label>
						Closing Cost
						<input
							type="number"
						/>
					</label>
					<label>
						Repair Cost
						<input
							type="number"
						/>
					</label>
					<span>Total Cost</span>
					<span>${totalCost}</span>
					<label>
						ARV
						<input
							type="number"
						/>
					</label>
					<h3>Loan Info</h3>
					<label>
						Downpayment (%)
						<input
							type="number"
						/>
					</label>
					<span>Downpayment Amount</span>
					<span>${downpaymentAmt}</span>
					<label>
						Interest Rate
						<input
							type="number"
						/>
					</label>
					<span>Loan Amount</span>
					<span>${loanAmt}</span>
					<label>
						Loan Term (yrs)
						<input
							type="number"
						/>
					</label>
					<span>Loan Payment</span>
					<span>${loanPayment}</span>
				</form>
			</div>
		);
	}
});

var RentalInfoBox = React.createClass({
	render: function() {
		var totalUtil = this.props.rentalInfo.electricity + this.props.rentalInfo.gas + this.props.rentalInfo.water + this.props.rentalInfo.sewer + this.props.rentalInfo.trash + this.props.rentalInfo.other;

		var rents = [];
		this.props.rentalInfo.forEach(function(rent, index) {
			let holder = "Unit " + index;
			rents.push(
				<input
					type="number"
					placeholder={holder}
				/>
			);
		});

		return (
			<div className="rentalInfoBox">
				<h2>Rental Info</h2>
				<form className="propInfoForm">
					<label>
						Number of Units
						<select>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</label>
					<label>
						Monthly Rent
						{rents}
					</label>
					<label>
						Other Income
						<input
							type="number"
						/>
					</label>
					<label>
						Vacancy Rate (%)
						<input
							type="number"
						/>
					</label>
					<h3>Owner Expenses</h3>
					<label>
						Electricity
						<input
							type="number"
						/>
					</label>
					<label>
						Gas
						<input
							type="number"
						/>
					</label>
					<label>
						Water
						<input
							type="number"
						/>
					</label>
					<label>
						Sewer
						<input
							type="number"
						/>
					</label>
					<label>
						Trash
						<input
							type="number"
						/>
					</label>
					<label>
						Other
						<input
							type="number"
						/>
					</label>
					<span>Total Utilities</span>
					<span>$ {totalUtil}</span>
					<label>
						Repairs / Capex (%)
						<input
							type="number"
						/>
					</label>
					<label>
						Property Management (%)
						<input
							type="number"
						/>
					</label>
					<label>
						Property Tax
						<input 
							type="number"
						/>
					</label>
					<label>
						Insurance
						<input 
							type="number"
						/>
					</label>
					<h3>Growth</h3>
					<label>
						Revenue Increase
						<input 
							type="number"
						/>
					</label>
					<label>
						Expense Increase
						<input 
							type="number"
						/>
					</label>
					<label>
						Appreciation
						<input 
							type="number"
						/>
					</label>
					<input
						type="submit"
						value="Calculate"
					/>
				</form>
			</div>
		);
	}
});

var ResultsBox = React.createClass({
	render: function() {
		var totalCost = this.props.purchaseInfo.purchasePrice + this.props.purchaseInfo.closingCost + this.props.purchaseInfo.repairCost;
		var downpaymentAmt = reCalc.downpaymentAmount(this.props.purchaseInfo.purchasePrice, this.props.purchaseInfo.downpayment);
		var cashOutlay = this.props.purchaseInfo.closingCost + this.props.purchaseInfo.repairCost + downpaymentAmt;

		var grossRevMon = reCalc.grossRevenue(this.props.rentalInfo.monthlyRent, this.props.rentalInfo.otherIncome);
		var grossRevAnn = grossRevMon * 12;
		var grossIncMon = reCalc.grossIncome(grossRevMon, this.props.rentalInfo.vacancyRate);
		var grossIncAnn = grossIncMon * 12;

		var expenses = [this.props.rentalInfo.electricity,
						this.props.rentalInfo.gas,
						this.props.rentalInfo.water,
						this.props.rentalInfo.sewer,
						this.props.rentalInfo.trash,
						this.props.rentalInfo.other,
						this.props.rentalInfo.repairs * grossRevMon / 100,
						this.props.rentalInfo.propMgmt * grossIncMon / 100,
						this.props.rentalInfo.propTax / 12,
						this.props.rentalInfo.insurance / 12];
		var expensesMon = reCalc.totalExpenses(expenses);
		var expensesAnn = expensesMon * 12;

		var noi = reCalc.noi(grossIncAnn, expensesAnn);
		var loanAmt = reCalc.loanAmount(this.props.purchaseInfo.purchasePrice, downpaymentAmt);
		var loanPayment = reCalc.loanPayment(loanAmt, this.props.purchaseInfo.intRate, this.props.purchaseInfo.loanTerm);
		var cashFlowMon = reCalc.cashFlow(noi, loanPayment);
		var cashFlowAnn = cashFlowMon * 12;
		var cashROI = reCalc.cashROI(cashFlowAnn, cashOutlay);

		var amortSchedule = reCalc.makeAmortSchedule(loanAmt, this.props.purchaseInfo.intRate, this.props.purchaseInfo.loanTerm);
		var equity = reCalc.equity(amortSchedule, 1);
		var totalEquity = propValue - amortSchedule[1];
		var propValue = this.props.purchaseInfo.arv + reCalc.appreciation(this.props.purchaseInfo.arv, this.props.rentalInfo.appreciation, 1, true);
		var appreciation = this.props.purchaseInfo.arv + reCalc.appreciation(this.props.purchaseInfo.arv, this.props.rentalInfo.appreciation, 1);
		var totalROI = reCalc.totalROI(equity, appreciation, cashFlowAnn, cashOutlay);
		var capRate = reCalc.capRate(this.props.purchaseInfo.purchasePrice, noi);
		var grm = reCalc.grossRentMult(this.props.purchaseInfo.purchasePrice, grossRevAnn);
		var dscr = reCalc.debtSCRation(noi, loanPayment);

		return (
			<div className="resultsBox">
				<h2>Results</h2>
				<table>
					<thead>
						<tr>
							<th>Purchase Price</th>
							<th>Total Cost</th>
							<th>Cash Outlay</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>$ {this.props.purchaseInfo.purchasePrice}</td>
							<td>$ (totalCost}</td>
							<td>$ {cashOutlay}</td>
						</tr>
					</tbody>
				</table>
				<h3>Income</h3>
				<table>
					<tbody>
						<tr>
							<th>Gross Revenue Monthly</th>
							<th>Gross Revenue Annual</th>
						</tr>
						<tr>
							<td>$ {grossRevMon}</td>
							<td>$ {grossRevAnn}</td>
						</tr>
						<tr>
							<th>Gross Income Monthly</th>
							<th>Gross Income Annual</th>
						</tr>
						<tr>
							<td>$ {grossIncMon}</td>
							<td>$ {grossIncAnn}</td>
						</tr>
					</tbody>
				</table>
				<h3>Expenses</h3>
				<table>
					<thead>
						<tr>
							<th>Total Monthly</th>
							<th>Total Annual</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>$ {expensesMon}</td>
							<td>$ {expensesAnn}</td>
						</tr>
					</tbody>
				</table>
				<h3>Key Factors</h3>
				<table>
					<tbody>
						<tr>
							<th>NOI</th>
							<th>Cash Flow Monthly</th>
							<th>Cash Flow Annual</th>
						</tr>
						<tr>
							<td>$ {noi}</td>
							<td>$ {cashFlowMon}</td>
							<td>$ {cashFlowAnn}</td>
						</tr>
						<tr>
							<th>Cash ROI</th>
							<th>Total ROI</th>
							<th>Cap Rate</th>
						</tr>
						<tr>
							<td>$ {cashROI}</td>
							<td>$ {totalROI}</td>
							<td>{capRate}</td>
						</tr>
						<tr>
							<th>GRM</th>
							<th>DSCR</th>
						</tr>
						<tr>
							<td>{grm}</td>
							<td>{dscr}</td>
						</tr>
					</tbody>
				</table>
				<span>Total Equity</span>
				<span>Property Value</span>
				<select>
					<option value="1">Year 1</option>
					<option value="2">Year 2</option>
				</select>
				<span>$ {totalEquity}</span>
				<span>$ {propValue}</span>
			</div>
		);
	}
});

ReactDOM.render(
	<CalculatorBox/>,
	document.getElementById('content')
);