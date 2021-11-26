// Displaying and storing users bank balance as set by the user, filtering non-numeric input and looping until correct input is submitted.

let bankBalance = parseInt(prompt("Enter your bank balance:"));

const balance = document.querySelector('#bank-balance');
    while(!bankBalance){
        bankBalance = parseInt(prompt("Enter your bank balance in numbers:"));
    }
balance.innerText = `${bankBalance} INR`;
// Until here ^^

let currentBalance = bankBalance;
let temp3 = true;

const loanButton = document.querySelector('#loan-button');
const outstandingBal = document.querySelector('#outstanding');
const loanBalance = document.querySelector('#loan-balance');
const returnLoan = document.querySelector('#return-loan');

 function toggle(){
    outstandingBal.classList.toggle('toggle');
    returnLoan.classList.toggle('toggle');
    loanButton.classList.toggle('toggle');
}

loanButton.addEventListener('click', () => {
    if(temp3){
    let loan = parseInt(prompt('Enter amount for loan'));
        if(loan>=currentBalance){
        alert('Insufficient funds');
    }
    else{
        alert('Loan Granted');
        toggle();
        loanBalance.innerText = `${loan} INR`;
        temp3 = false;
    }
}
else{
    alert('Repay previous loan')
}
});

const bankButton = document.querySelector('#bank-button');
const pay = document.querySelector('#pay');


bankButton.addEventListener('click', () => {
    let transferAmount = parseInt(pay.innerText);
    if(temp3){
    currentBalance += transferAmount;
    }
    else{
        let loan = parseInt(loanBalance.innerText);
        let deduct = ((transferAmount*10)/100);
        transferAmount -= deduct;
        currentBalance+=transferAmount;
        loan -=deduct;
        loanBalance.innerText = `${loan} INR`;
        if(loan <=0){
            temp3 = true;
            toggle();
            loanBalance.innerText = `0 INR`;
        }
    }
    balance.innerText = `${currentBalance} INR`;
    pay.innerText = `0 INR`;
    sum = 0;
});

returnLoan.addEventListener('click', ()=>{
    let returnAmount = parseInt(pay.innerText);
    let loan = parseInt(loanBalance.innerText);

    loan -=returnAmount;
    loanBalance.innerText = `${loan} INR`;
    pay.innerText = `0 INR`;
    sum = 0;

    if(loan<=0){
        toggle();
        temp3 = true;
        loanBalance.innerText = `0 INR`;
    }

})

const workButton = document.querySelector('#work-button');

let sum=0;
add = () =>{
    return sum+=100;
};

workButton.addEventListener('click', () => {
    pay.innerText =`${add()} INR`;
});