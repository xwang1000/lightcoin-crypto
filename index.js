class Account {
  
  constructor() {
    this.transactions = []
  }

  get balance() {
    return this.transactions.reduce((balance, t) => balance + t.value, 0)
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount
    this.account = account
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date()
      return this.account.addTransaction(this)
    } 

    return console.log('Insufficient funds. Transaction aborted.')
  }

  isAllowed() {
    return this.account.balance + this.value >= 0
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }
}

// DRIVER CODE BELOW
const myAccount = new Account('x')
const t1        = new Withdrawal(20, myAccount)

t1.commit()
console.log('Current balance: ', myAccount.balance)

const t2 = new Deposit(8888888888, myAccount)
t2.commit()
console.log('Current balance: ', myAccount.balance)

const t3 = new Withdrawal(300, myAccount)
t3.commit()
console.log('Current balance: ', myAccount.balance)
