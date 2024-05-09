const dateArray = {month: '',year: ''}
let incomesArray = []
let expensesArray = []


document.querySelector(".current-budget").innerHTML = "-0.00";function getDate() {
    // Create a new Date object
    var currentDate = new Date();

    // Get the current month (0-11, where 0 is January and 11 is December)
    var currentMonth = currentDate.getMonth();

    // Array of month names
    var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    // set the month name in the dateArray
    dateArray.month = monthNames[currentMonth];

    // set the current year in the dateArray
    dateArray.year = currentDate.getFullYear();

    h2Welcome = document.getElementById("date")
    h2Welcome.innerHTML = (`available budget in ${dateArray.month} ${dateArray.year}:`)


    return dateArray

}

function getIncome() {
    
    var amount = document.getElementById("Value").value;
    var description = document.getElementById("Description").value;
    if (description.trim() === "" || amount.trim() === "") {
        alert("Please fill in both description and value.");
        return;
      }

    let newIncome = { description: description, amount: amount , operator: '+'};
    // push the new income object into the array
    incomesArray.push(newIncome);
    updateBudget();
    updateIncomeChart();


    
    return incomesArray
  
}


function getExpenses() {

    var amount = document.getElementById("Value-minus").value;
    var description = document.getElementById("Description-minus").value;
    if (description.trim() === "" || amount.trim() === "") {
        alert("Please fill in both description and value.");
        return;
      }
    let newExpense = { description: description, amount: amount, operator: '-'};
    expensesArray.push(newExpense);
    updateBudget();
    updateExpensesChart();
    console.log(expensesArray);
    return expensesArray;
}


function updateBudget() {
    let totalIncome = incomesArray.reduce((acc, income) => acc + parseFloat(income.amount), 0);
    let totalExpenses = expensesArray.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    let totalBudget = totalIncome - totalExpenses;

    let currentBudgetElement = document.querySelector(".current-budget");
    currentBudgetElement.innerHTML = totalBudget.toFixed(2);
}


function updateIncomeChart() {
    const container = document.querySelector("#income-list");

    const newDiv = document.createElement("div");
    newDiv.classList.add("income-div");

    const newRow = document.createElement("p");
    newRow.classList.add("income-row");
    incomesArray.forEach(item => {
        newRow.textContent = `${item.description} ${item.amount}`});

    newDiv.appendChild(newRow);

    container.appendChild(newDiv);
}
// updateIncomeChart()
function updateExpensesChart() {
    const container = document.querySelector("#expenses-list");

    const newDiv = document.createElement("div");
    newDiv.classList.add("expenses-div");

    const newRow = document.createElement("p");
    newRow.classList.add("expenses-row");
    expensesArray.forEach(item => {
        newRow.textContent = `${item.description} ${item.amount}`});

    newDiv.appendChild(newRow);

    container.appendChild(newDiv);
}

function toggleBudgetOperator() {
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');
    let operatorValue = document.getElementById('operatorValue').value;
    console.log(operatorValue);
    if (operatorValue ==='+') {
        plus.style.display = "grid";
        minus.style.display = "none";
        
    } else {
        plus.style.display = "none";
        minus.style.display = "grid";
    }
}


date = getDate()
