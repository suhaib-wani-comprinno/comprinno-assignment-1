const laptopsAPI = 'https://noroff-komputer-store-api.herokuapp.com/computers'; //API for laptops
const imagesAPI = 'https://noroff-komputer-store-api.herokuapp.com/'; //API for laptops

const availableBalance = document.querySelector('#availableBalance'); // Available balance at any point

let isLoanTaken = false;

let balanceCard = document.querySelector('#balanceCard');
let currentBalance = parseInt(availableBalance.innerText); //User balance for operations

const outstandingBalanceElement = document.querySelector('#outstandingBalanceElement');  //For toggling the outstanding balance visiblity
const pendingLoanAmount = document.querySelector('#pendingLoanAmount'); //For updating loan pending amount
const totalBalanceElement = document.querySelector('#totalBalanceElement');  //For toggling the total balance visiblity

const getLoanButton = document.querySelector('#getLoanButton');  //For getting a loan

// Function for creating return loan buttons
const returnLoanButton = document.createElement('button');
const createReturnLoanButtonFunction = () =>{
    returnLoanButton.innerText = 'Return Loan';
    returnLoanButton.classList.add('btn', 'btn-lg', 'btn-outline-danger', 'mt-3', 'w-100');
    getLoanButton.insertAdjacentElement('afterend', returnLoanButton);
}

const removeLoanButton = () =>{
    balanceCard.removeChild(returnLoanButton);
}

// Function for toggling visibility and adding classes upon activation
const toggle = () =>{
    outstandingBalanceElement.classList.remove('toggle');
    outstandingBalanceElement.classList.add('d-flex', 'justify-content-between', 'mt-3');
    totalBalanceElement.classList.remove('toggle');
    totalBalanceElement.classList.add('d-flex', 'justify-content-between', 'mt-3');
}
const removeToggle = () => {
    outstandingBalanceElement.classList.add('toggle');
    outstandingBalanceElement.classList.remove('d-flex', 'justify-content-between', 'mt-3');
    totalBalanceElement.classList.add('toggle');
    totalBalanceElement.classList.remove('d-flex', 'justify-content-between', 'mt-3');
}

const totalBalanceDisplay = document.querySelector('#totalBalanceDisplay');
totalBalance = currentBalance;
console.log(totalBalance)
var loanAmount = 0;

getLoanButton.addEventListener('click', () => {
    if (!isLoanTaken) {
        loanAmount = parseInt(prompt('Enter amount for loan'));
        while (!loanAmount) {
            loanAmount = parseInt(prompt('Enter amount for loan'));
        }

        if (loanAmount > (currentBalance * 2)) {
            alert('Loan amount cannot be more than twice of current balance');
        }
        else {
            alert('Loan Granted');
            toggle();
            createReturnLoanButtonFunction();
            pendingLoanAmount.innerText = `${loanAmount} INR`;
            totalBalance += loanAmount;
            totalBalanceDisplay.innerText = `${totalBalance} INR`;
            console.log(totalBalance);
            isLoanTaken = true;
        }
    }
    else {
        alert('Repay previous loan')
    }
})

// For updating Pay in Work card
const payAmount = document.querySelector('#payAmount');

// Creating a function for sum
let sum = 0 ;
const add = () =>{
    return sum += 100
}

//Selecting the work button and adding event listener for increasing pay by 100
const workButton = document.querySelector('#workButton');

workButton.addEventListener('click', () =>{
    payAmount.innerText = `${add()} INR`;
})

const bankButton = document.querySelector('#bankButton');

bankButton.addEventListener('click', () => {

    let transferAmount = parseInt(payAmount.innerText);
    let deductAmount = ((transferAmount * 10) / 100);

    if (!isLoanTaken) {
        currentBalance += transferAmount;
        totalBalance += transferAmount;
        console.log(totalBalance, currentBalance)
    }

    else if(isLoanTaken) {
        if (loanAmount - deductAmount >= 0 ){
        transferAmount -= deductAmount;
        currentBalance += transferAmount;
        loanAmount -= deductAmount;
        totalBalance = currentBalance + loanAmount;
        totalBalanceDisplay.innerText = `${totalBalance} INR`;
        console.log(totalBalance, currentBalance);
        pendingLoanAmount.innerText = `${loanAmount} INR`;
        if (loanAmount <= 0) {
            isLoanTaken = false;
            removeToggle();
            pendingLoanAmount.innerText = `0 INR`;
        }
    }
    }
    availableBalance.innerText = `${currentBalance} INR`;
    payAmount.innerText = `0 INR`;
    sum = 0;
})

const returnLoanFunction = () =>{
    let returnAmount = parseInt(payAmount.innerText);

    if(loanAmount>=returnAmount){
        loanAmount -= returnAmount;
        totalBalance -=returnAmount;
        pendingLoanAmount.innerText = `${loanAmount} INR`;
        totalBalanceDisplay.innerText = `${totalBalance} INR`;
        payAmount.innerText = `0 INR`;
        sum = 0;
    }

    else if(returnAmount > loanAmount){
        returnAmount -= loanAmount;
        totalBalance -= loanAmount;
        loanAmount = 0;
        payAmount.innerText = `${returnAmount} INR`;
    }

    if(loanAmount===0){
        removeLoanButton();
        removeToggle();
        alert('Loan Repaid');
        isLoanTaken = false;
    }
}

returnLoanButton.addEventListener('click', returnLoanFunction);

const dropdown = document.querySelector('#laptopDropdown');

const featureList = document.querySelector('#specs');

const buyCard = document.querySelector('#buyCard');

const desc = document.querySelector('#desc');

const price = document.querySelector('#price');


const pricing = document.querySelector('#pricing');

const createImage = document.createElement('img');
createImage.classList.add('img');
const temp = document.querySelector('#temp');
fetch(laptopsAPI)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        for (let dat of data) {
            const createOption = document.createElement('option');
            createOption.innerText = dat.title;
            dropdown.append(createOption);
            createOption.addEventListener('click', () => {               
                featureList.innerText = "Specs: ";
                if(dat.id===5){
                    createImage.setAttribute('src', `${imagesAPI}assets/images/${dat.id}.png`);
                }
                else{
                    createImage.setAttribute('src', `${imagesAPI}${dat.image}`);
                }
                document.querySelector('#imageHolder').append(createImage);
                for (let spec of dat.specs) {
                    const createSpecs = document.createElement('li');
                    createSpecs.innerText = spec;
                    featureList.append(createSpecs);
                }
                buyCard.classList.remove('toggle');
                temp.classList.add('d-flex', 'justify-content-around', 'w-100', 'align-items-center');
                console.log(`${imagesAPI}${dat.image}`);
                desc.innerText = dat.description;
                price.innerText = `${dat.price}`;
                pricing.classList.remove('toggle');
            })
        }
    })
    .catch(e =>{
        alert('Error', e);
    })

// const buyButton = document.querySelector('#buy-button');

// buyButton.addEventListener('click', () => {
//         if (totalBalance >= parseInt(price.innerText) && currentBalance !== 0) {
//         alert('Successfully purchased');
//         console.log(totalBalance, currentBalance);
//         totalBalance -= parseInt(price.innerText);
//         balance.innerText = `${currentBalance}`;
//         currentBalance = parseInt(totalBalance) - parseInt(price.innerText);
//             if (parseInt(loanBalance.innerText)) {
//             currentBalance = currentBalance + parseInt(loanBalance.innerText) - parseInt(price.innerText);
//             balance.innerText = `${currentBalance} INR`;
//             } else {
//             currentBalance -= parseInt(price.innerText);
//             console.log(currentBalance);
//             balance.innerText = `${currentBalance} INR`;
//         }
//         console.log(totalBalance, currentBalance);
//     }
//     else {
//         alert('Insufficient Balance! Work more!');
//     }
// });