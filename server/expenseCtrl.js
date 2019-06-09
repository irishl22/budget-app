module.exports = {
  getExpenses: async (req, res) => {
    const db = req.app.get('db')
    let response = await
    db.get_expenses()
    return res.status(200).send(response)
},
  newExpense: async (req, res) => {
    const { expense_type, expense_amount, expense_date} = req.body
    const db = req.app.get('db')
    let response = await
    db.new_expense( [expense_type, expense_amount, expense_date] )
    return res.status(200).send(response)
  }
}