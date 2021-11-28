const balance = document.querySelector('#bank-balance');

let isLoanTaken = false;
let currentBalance = parseInt(balance.innerText);

const loanButton = document.querySelector('#loan-button');
const outstandingBal = document.querySelector('#outstanding');
const returnLoanButton = document.querySelector('#return-loan-button');

const toggle = () => {
    outstandingBal.classList.toggle('toggle');
    returnLoanButton.classList.toggle('toggle');
    loanButton.classList.toggle('toggle');
}

const loanBalance = document.querySelector('#loan-balance');

let totalBalance = currentBalance;
console.log(totalBalance);

loanButton.addEventListener('click', () => {
    if (!isLoanTaken) {
        let loan = parseInt(prompt('Enter amount for loan'));
        while (!loan) {
            loan = parseInt(prompt('Enter amount for loan'));
        }
        if (loan >= currentBalance) {
            alert('Loan amount cannot be more than twice of Bank balance');
        }
        else {
            alert('Loan Granted');
            toggle();
            loanBalance.innerText = `${loan} INR`;
            totalBalance = currentBalance + loan;
            console.log(totalBalance, currentBalance);
            isLoanTaken = true;
        }
    }
    else {
        alert('Repay previous loan')
    }
});

const bankButton = document.querySelector('#bank-button');
const pay = document.querySelector('#pay');

bankButton.addEventListener('click', () => {
    let transferAmount = parseInt(pay.innerText);
    if (!isLoanTaken) {
        currentBalance += transferAmount;
        totalBalance += transferAmount;
        console.log(totalBalance, currentBalance);
    }
    else {
        let loan = parseInt(loanBalance.innerText);
        let deduct = ((transferAmount * 10) / 100);
        transferAmount -= deduct;
        currentBalance += transferAmount;
        console.log(totalBalance, currentBalance);
        loan -= deduct;
        totalBalance = currentBalance + loan;
        console.log(totalBalance, currentBalance);
        loanBalance.innerText = `${loan} INR`;
        if (loan <= 0) {
            isLoanTaken = false;
            toggle();
            loanBalance.innerText = `0 INR`;
        }
    }
    balance.innerText = `${currentBalance} INR`;
    pay.innerText = `0 INR`;
    sum = 0;
});

returnLoanButton.addEventListener('click', () => {
    let returnAmount = parseInt(pay.innerText);
    let loan = parseInt(loanBalance.innerText);
    loan -= returnAmount;
    loanBalance.innerText = `${loan} INR`;
    pay.innerText = `0 INR`;
    sum = 0;

    if (loan <= 0) {
        toggle();
        isLoanTaken = false;
        loanBalance.innerText = `0 INR`;
        totalBalance = currentBalance;
        console.log(totalBalance, currentBalance);
    } else {
        totalBalance = currentBalance + loan;
        console.log(totalBalance, currentBalance);
    }

})

const workButton = document.querySelector('#work-button');

let sum = 0;
add = () => {
    return sum += 100;
};

workButton.addEventListener('click', () => {
    pay.innerText = `${add()} INR`;
});

const dropdown = document.querySelector('#laptop-dropdown');

const featureList = document.querySelector('#specs');

const desc = document.querySelector('#desc');

const price = document.querySelector('#price');

const buyCard = document.querySelector('#buy--card');

const pricing = document.querySelector('#pricing');

fetch('https://noroff-komputer-store-api.herokuapp.com/computers')
    .then(res => {
        return res.json();
    }).then(data => {
        for (let dat of data) {
            const createOption = document.createElement('option');
            createOption.innerText = dat.title;
            console.log(createOption.innerText);
            dropdown.append(createOption);
            createOption.addEventListener('click', () => {
                buyCard.classList.remove('toggle');
                console.log(dat.specs);
                featureList.innerHTML = "Specs: ";
                for (let spec of dat.specs) {
                    const createSpecs = document.createElement('li');
                    createSpecs.innerText = spec;
                    featureList.append(createSpecs);
                }
                desc.innerText = dat.description;
                price.innerText = `${dat.price}`;
                pricing.classList.remove('toggle');
            })
        }
    });

const buyButton = document.querySelector('#buy-button');

buyButton.addEventListener('click', () => {
    if (price.innerText === '') {
        alert('Select a laptop first');
    }
    else if (totalBalance >= parseInt(price.innerText) && currentBalance !== 0) {
        alert('Successfully purchased');
        console.log(totalBalance, currentBalance);
        totalBalance -= parseInt(price.innerText);
        if (parseInt(loanBalance.innerText)) {
            currentBalance = currentBalance + parseInt(loanBalance.innerText) - parseInt(price.innerText);
            balance.innerText = `${currentBalance} INR`;
        } else {
            currentBalance -= parseInt(price.innerText);
            balance.innerText = `${currentBalance} INR`;
        }
        console.log(totalBalance, currentBalance);
    }
    else {
        alert('Earn More! Work More!');
    }
});