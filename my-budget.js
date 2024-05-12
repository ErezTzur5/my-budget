const dateArray = { month: '', year: '' }
let incomesArray = JSON.parse(localStorage.getItem('incomesArray')) || [];
let expensesArray = JSON.parse(localStorage.getItem('expensesArray')) || [];

window.onload = function () {
    loadDataFromLocalStorage();
    updateBudget();
    updateTotalIncome();
    updateTotalExpenses();
    updateIncomeChart();
    updateExpensesChart();
    updatePresentage();

};


document.querySelector(".current-budget").innerHTML = "-0.00"; function getDate() {
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

    let newIncome = { description: description, amount: amount, operator: '+' };
    // push the new income object into the array
    incomesArray.push(newIncome);
    updateBudget();
    updateIncomeChart();
    updateTotalIncome();
    updatePresentage();


    return incomesArray

}


function getExpenses() {

    var amount = document.getElementById("Value-minus").value;
    var description = document.getElementById("Description-minus").value;
    if (description.trim() === "" || amount.trim() === "") {
        alert("Please fill in both description and value.");
        return;
    }
    let newExpense = { description: description, amount: amount, operator: '-' };
    expensesArray.push(newExpense);
    updateBudget();
    updateExpensesChart();
    updateTotalExpenses();
    updatePresentage();

    return expensesArray;
}


function updateBudget() {

    let totalIncome = incomesArray.reduce((acc, income) => acc + parseFloat(income.amount), 0);
    let totalExpenses = expensesArray.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    let totalBudget = totalIncome - totalExpenses;

    let currentBudgetElement = document.querySelector(".current-budget");
    currentBudgetElement.innerHTML = totalBudget.toFixed(2);
    saveDataToLocalStorage();
}

function updateTotalIncome() {
    let totalIncome = incomesArray.reduce((acc, income) => acc + parseFloat(income.amount), 0);

    let currentBudgetElement = document.querySelector("#income");
    currentBudgetElement.innerHTML = totalIncome.toFixed(2);
    saveDataToLocalStorage();
}

function updateTotalExpenses() {
    let totalIncome = expensesArray.reduce((acc, expenses) => acc + parseFloat(expenses.amount), 0);

    let currentBudgetElement = document.querySelector("#expenses");
    currentBudgetElement.innerHTML = totalIncome.toFixed(2);
    saveDataToLocalStorage();
}


function updateIncomeChart() {
    const container = document.querySelector(".income-div");
    container.innerHTML = "";


    incomesArray.forEach((item, index) => {

        // Create a new paragraph for each item
        const newRow = document.createElement("p");
        newRow.classList.add("income-row");
        newRow.textContent = `${item.description} ${item.amount}`;

        // Create the SVG element
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgElement.setAttribute("width", "20");
        svgElement.setAttribute("height", "20");
        svgElement.setAttribute("class", "bi bi-x-circle-expenses");
        svgElement.setAttribute("viewBox", "0 0 16 16");

        // Create and set the circle for the border
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "8");
        circle.setAttribute("cy", "8");
        circle.setAttribute("r", "7.5");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "green");
        circle.setAttribute("stroke-width", "2");

        // Create and set the path for the SVG (for the X symbol)
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M3.646 3.646a.5.5 0 0 1 .708 0L8 7.293l3.646-3.647a.5.5 0 0 1 .708.708L8.707 8l3.647 3.646a.5.5 0 0 1-.708.708L8 8.707l-3.646 3.647a.5.5 0 0 1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0 1 0-.708z");
        path.setAttribute("fill", "green");

        // Append the circle and path to the SVG element
        svgElement.appendChild(circle);
        svgElement.appendChild(path);

        // Add an onclick event to the SVG
        svgElement.onclick = function () {
            // Remove the parent div element when the SVG is clicked
            newRow.remove();


            // Remove item from incomesArray
            incomesArray.splice(index, 1);



            // Save updated data to localStorage
            saveDataToLocalStorage();
            loadDataFromLocalStorage();
            updateBudget();
            updateTotalIncome();
            updateTotalExpenses();
            updateIncomeChart();
            updateExpensesChart();
            updatePresentage();

        };

        // Append the SVG to the <p> element
        newRow.appendChild(svgElement);

        // Append the <p> element to the container div
        container.appendChild(newRow);
    });
}

function updatePresentage() {
    let percentage = document.getElementById('percentage').innerText;
    let totalExpenses = document.getElementById("expenses").innerText;
    let totalIncome = document.getElementById("income").innerText;
    percentage = totalExpenses / totalIncome * 100;
    document.getElementById('percentage').innerText = percentage.toFixed(2) + '%'

    console.log(percentage.toFixed(2));

}


function updateExpensesChart() {
    const container = document.querySelector(".expenses-div");
    container.innerHTML = "";


    expensesArray.forEach((item, index) => {

        // Create a new paragraph for each item
        const newRow = document.createElement("p");
        newRow.classList.add("expenses-row");
        newRow.textContent = `${item.description} ${item.amount}`;

        // Create the SVG element
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgElement.setAttribute("width", "20");
        svgElement.setAttribute("height", "20");
        svgElement.setAttribute("class", "bi bi-x-circle-expenses");
        svgElement.setAttribute("viewBox", "0 0 16 16");

        // Create and set the circle for the border
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "8");
        circle.setAttribute("cy", "8");
        circle.setAttribute("r", "7.5");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "red");
        circle.setAttribute("stroke-width", "2");

        // Create and set the path for the SVG (for the X symbol)
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M3.646 3.646a.5.5 0 0 1 .708 0L8 7.293l3.646-3.647a.5.5 0 0 1 .708.708L8.707 8l3.647 3.646a.5.5 0 0 1-.708.708L8 8.707l-3.646 3.647a.5.5 0 0 1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0 1 0-.708z");
        path.setAttribute("fill", "red");

        // Append the circle and path to the SVG element
        svgElement.appendChild(circle);
        svgElement.appendChild(path);

        // Add an onclick event to the SVG
        svgElement.onclick = function () {
            // Remove the parent div element when the SVG is clicked
            newRow.remove();

            // Remove item from ExpensessArray
            expensesArray.splice(index, 1);

            // Save updated data to localStorage
            saveDataToLocalStorage();
            saveDataToLocalStorage();
            loadDataFromLocalStorage();
            updateBudget();
            updateTotalIncome();
            updateTotalExpenses();
            updateIncomeChart();
            updateExpensesChart();
            updatePresentage();
        };

        // Append the SVG to the <p> element
        newRow.appendChild(svgElement);

        // Append the <p> element to the container div
        container.appendChild(newRow);
    });
}


function toggleBudgetOperator() {
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');
    let operatorValue = document.getElementById('operatorValue').value;
    console.log(operatorValue);
    if (operatorValue === '+') {
        plus.style.display = "grid";
        minus.style.display = "none";

    } else {
        plus.style.display = "none";
        minus.style.display = "grid";
    }
}

function saveDataToLocalStorage() {
    localStorage.setItem('incomes', JSON.stringify(incomesArray));
    localStorage.setItem('expenses', JSON.stringify(expensesArray));
    // Additionally, you might want to save other data like dateArray

}
function loadDataFromLocalStorage() {
    incomesArray = JSON.parse(localStorage.getItem('incomes')) || [];
    console.log(incomesArray)
    expensesArray = JSON.parse(localStorage.getItem('expenses')) || [];
    // Load other data

}



date = getDate()
