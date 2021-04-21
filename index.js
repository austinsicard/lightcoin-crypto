class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }


  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }
  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >=0);
  }

}

// DRIVER CODE BELOW
const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log("---")

console.log('Attempting to withdraw $5 should fail');
const t1 = new Withdrawal(5.00, myAccount);
console.log('Commit:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log("---")

console.log('Depositing 100.00');
const t2 = new Deposit(100.00, myAccount);
console.log('Commit:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log("---")

console.log('Withdrawal for 100.00 should work');
const t3 = new Withdrawal(100.00, myAccount);
console.log('Commit:', t3.commit());
console.log('Account Balance: ', myAccount.balance);

console.log("---")

console.log('Account Transaction History: ', myAccount.transactions);
