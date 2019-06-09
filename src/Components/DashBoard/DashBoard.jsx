import React, { Component } from "react";
import axios from 'axios'

class DashBoard extends Component {
  constructor(props) {
      super(props);
      this.state = {
        checking: 2300,
        savings: 5500,
        withdrawAmt: 0,
        depositAmt: 0,
        accType: true,
        expense_type: "",
        expense_amount: "",
        expense_date: "",
        expenses: [],
        newExpense: {}
    };
  }

  handleWithdraw = () => {
    if(this.state.accType === "checking") {
      this.setState({
        checking: this.state.checking - this.state.withdrawAmt,
      })
    }
    else if(this.state.accType === "savings") {
      this.setState({
        savings: this.state.savings - this.state.withdrawAmt
      })
    }
  }
  
  handleDeposit = () => {
    if(this.state.accType === "checking") {
      this.setState({
        checking: this.state.checking + +this.state.depositAmt,
      })
    }
    else if(this.state.accType === "savings") {
      this.setState({
        savings: this.state.savings + +this.state.depositAmt
      })
    }
  }
  handleRadio(prop, val) {
    this.setState({
      [prop]: val,
      accType: prop
    });
}

handleDropDownExpenses = (e) => {
  this.setState({
    expense_type: e.target.value
  });
}

handleExpenseInput(prop, val) {
  this.setState({
    [prop]: val
  })
}

addExpense = async expense => {
  await axios.post('/api/newExpense', expense).then(res => {
    this.setState({
      expenses: res.data
    })
  }).catch(err => console.log(err))
}

handleAddExp = async () => {
  let { expense_type, expense_amount, expense_date } = this.state
  let expense = { expense_type, expense_amount, expense_date}
  await this.addExpense(expense)
}


render() {
  let expenseList = this.state.expenses.map(expense => {
    return <span>{expense.expense_type}</span>
  })
  console.log(this.state.expenses)
    return (
      <div>
        <h4>Checking Account: ${this.state.checking}</h4>
        <h4>Savings Account: ${this.state.savings}</h4>

        Checking<input type="radio" name="accType" onChange={() => this.handleRadio("checking", this.state.checking)} value={this.state.accType}/>
        Savings<input type="radio" name="accType" onChange={() => this.handleRadio("savings", this.state.savings)} value={this.state.accType}/>

        <input type="number" onChange={e => this.setState({ withdrawAmt: e.target.value})} value={this.state.withdrawAmt} placeholder="Amount to Withdraw"/><button onClick={this.handleWithdraw}>Withdraw Amount</button>

        <input type="number" onChange={e => this.setState({ depositAmt: e.target.value})} value={this.state.depositAmt} placeholder="Amount to deposit"/><button onClick={this.handleDeposit}>Deposit Amount</button>

        <div>
          <h4>Expenses</h4>
          <select onChange={this.handleDropDownExpenses} value={this.state.expense_type}>
            <option>Choose Type</option>
            <option>Equipment</option>
            <option>Rent</option>
            <option>Utilities</option>
            <option>Meals</option>
            <option>Misc</option>
          </select>
          <input type="number" name="expense_amount" onChange={e => this.handleExpenseInput("expense_amount", e.target.value)} value={this.state.expense_amount}/>
          <input type="date" name="expense_date" onChange={e => this.handleExpenseInput("expense_date", e.target.value)} value={this.state.expense_date}/>
          <button onClick={this.handleAddExp}>Add Expense</button>
          {expenseList}
        </div>
      </div>

    );
  }
}

export default DashBoard;
