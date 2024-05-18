function myProject() {
    saveDataToLocalStorage();
    loadDataFromLocalStorage();
}

const dateArray = { month: '', year: '' }
let incomesArray = JSON.parse(localStorage.getItem('incomesArray')) || [];
let expensesArray = JSON.parse(localStorage.getItem('expensesArray')) || [];


// ensures that the code inside the function will run only after the entire webpage has loaded.
window.onload = function () {
    loadDataFromLocalStorage();
    updateBudget();
    updateTotalIncome();
    updateTotalExpenses();
    updateIncomeChart();
    updateExpensesChart();
    updatePresentage();

};

// getting the month and year data.
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
    h2Welcome.innerHTML = (`Available Budget in ${dateArray.month} ${dateArray.year}:`)


    return dateArray

}


// get the description and amount for incomes.
function getIncome() {


    var amount = document.getElementById("Value").value;
    
    console.log('1',amount);

    const regex = /^[0-9]*$/;
    if (!regex.test(amount)) {
        alert('Invalid amount')
        return;
    }


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
    updateExpensesChart();

    //RESET Values:
    document.getElementById("Value").value = "";
    document.getElementById("Description").value = "";

    return incomesArray

}

// get the description and amount for expenses.
function getExpenses() {

  
    var amount = document.getElementById("Value-minus").value;
    
    console.log('1',amount);

    const regex = /^[0-9]*$/;
    if (!regex.test(amount)) {
        alert('Invalid amount')
        return;
    }

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
    //RESET Values:
    document.getElementById("Value-minus").value = "";
    document.getElementById("Description-minus").value = "";
    return expensesArray;
}

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    var sections = document.getElementsByClassName("section-2");
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.toggle("dark-mode");
    }

    // Toggle the display of sun and moon icons
    var sunIcon = document.querySelector('.sun');
    var moonIcon = document.querySelector('.moon');

    var sunDisplay = getComputedStyle(sunIcon).display;
    var moonDisplay = getComputedStyle(moonIcon).display;

    if (sunDisplay === 'none') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
    
  }

// updating the budget.
function updateBudget() {

    let totalIncome = incomesArray.reduce((acc, income) => acc + parseFloat(income.amount), 0);
    let totalExpenses = expensesArray.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    let totalBudget = totalIncome - totalExpenses;
    if (totalBudget >=0 ) {
        let currentBudgetElement = document.querySelector(".current-budget");
        currentBudgetElement.innerHTML = '+' + totalBudget.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFraction: 2});

        
    }
    else {
        let currentBudgetElement = document.querySelector(".current-budget");
        currentBudgetElement.innerHTML = totalBudget.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFraction: 2});
    }


    saveDataToLocalStorage();
}

// updating the total incomes in their box.
function updateTotalIncome() {
    let totalIncome = incomesArray.reduce((acc, income) => acc + parseFloat(income.amount), 0);

    let currentBudgetElement = document.querySelector("#income");
    currentBudgetElement.innerHTML = '+ ' + totalIncome.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFraction: 2});
    saveDataToLocalStorage();
}
// updating the total expenses in their box.
function updateTotalExpenses() {
    let totalIncome = expensesArray.reduce((acc, expenses) => acc + parseFloat(expenses.amount), 0);

    let currentBudgetElement = document.getElementById("expenses");
    
    currentBudgetElement.innerHTML = '- '+ totalIncome.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFraction: 2});
    saveDataToLocalStorage();
}

// updating the income chart.
function updateIncomeChart() {
    const container = document.querySelector(".income-div");
    container.innerHTML = "";


    incomesArray.forEach((item, index) => {

        

        // Create a new paragraph for each item
        const newRow = document.createElement("p");
        if (index % 2 !== 0) {
            newRow.classList.add("income-row-gray");
        }
        newRow.classList.add("income-row");
        newRow.innerHTML += `<span class="grow">${item.description.charAt(0).toUpperCase() + item.description.slice(1)}</span>`;
        var amountSpan = document.createElement('span');
        var amount = parseFloat(item.amount);
        var formattedAmount = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var formattedWithMinusSign = (amount < 0 ? '+' : '') + formattedAmount;

        amountSpan.textContent = '+' + formattedWithMinusSign;
        amountSpan.classList.add('incomeAmountRow');
        newRow.appendChild(amountSpan);

        // Create the SVG element
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgElement.setAttribute("width", "20");
        svgElement.setAttribute("height", "40");
        svgElement.setAttribute("class", "bi bi-x-circle-expenses");
        svgElement.setAttribute("viewBox", "0 0 16 16");

        // Create and set the circle for the border
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "8");
        circle.setAttribute("cy", "8");
        circle.setAttribute("r", "7.5");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "green");
        circle.setAttribute("stroke-width", "1");

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

// updating the expenses chart it also counts the Presentage for the expenses chart.
function updateExpensesChart() {
    const container = document.querySelector(".expenses-div");
    container.innerHTML = "";
    


    expensesArray.forEach((item, index) => {
        let totalIncome = parseFloat(document.getElementById("income").innerText.replace(/[^\d.-]/g, ''));

        let percentageRow = 0;
        percentageRow = item.amount / totalIncome * 100;
        if (percentageRow === Infinity){
            percentageRow = 0;
        }


        // Create a new paragraph for each item
        const newRow = document.createElement("p");
        if (index % 2 !== 0) {
            newRow.classList.add("income-row-gray");
        }
        newRow.classList.add("expenses-row");
        newRow.innerHTML += `<span class="grow">${item.description.charAt(0).toUpperCase() + item.description.slice(1)}</span>`;

        var amountSpan = document.createElement('span');
        var amount = parseFloat(item.amount);
        var formattedAmount = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var formattedWithMinusSign = (amount < 0 ? '-' : '') + formattedAmount;

        amountSpan.textContent = '-' + formattedWithMinusSign;
        amountSpan.classList.add('expensesAmountRow');
        newRow.appendChild(amountSpan);

        var percentageSpan = document.createElement('span');
        
        percentageSpan.textContent = percentageRow.toFixed(2) + '%';
        percentageSpan.classList.add('presentageRow');
        newRow.appendChild(percentageSpan);


        // Create the SVG element
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgElement.setAttribute("width", "20");
        svgElement.setAttribute("height", "30");
        svgElement.setAttribute("class", "bi bi-x-circle-expenses");
        svgElement.setAttribute("viewBox", "0 0 16 16");

        // Create and set the circle for the border
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "8");
        circle.setAttribute("cy", "8");
        circle.setAttribute("r", "7.5");
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "red");
        circle.setAttribute("stroke-width", "1");

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

// updating the main expenses presentage box.
function updatePresentage() {
    let percentageText = document.getElementById('percentage').innerText;
    let percentageNumber = parseFloat(percentageText);

    if (isNaN(percentageNumber)) {
        // If parsing fails, assign a default value, such as 0.
        percentageNumber = 0;
    }

    let totalExpenses = parseFloat(document.getElementById("expenses").innerText.replace(/[^\d.-]/g, ''));

    let totalIncome = parseFloat(document.getElementById("income").innerText.replace(/[^\d.-]/g, ''));
    
    if (isNaN(totalExpenses)) {
        totalExpenses = 0;
    }

    if (isNaN(totalIncome)) {
        totalIncome = 0;
    }
    
    if (totalIncome === 0) {
        percentageNumber = 0; // to avoid division by zero
    } else {
        percentageNumber = ((totalExpenses / totalIncome) * 100)*-1;
    }
    
    document.getElementById('percentage').innerText = percentageNumber.toFixed(2) + '%';

    
}

// operator change.

function toggleBudgetOperator() {
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');
    let operatorValue = document.getElementById('operatorValue').value;
    
    if (operatorValue === '+') {
        plus.style.display = "grid";
        minus.style.display = "none";

    } else {
        plus.style.display = "none";
        minus.style.display = "grid";
    }
}


//Description and value cssing.

function borderColor(elementId) {
    
    document.getElementById(elementId).style.outline = "none";
    document.getElementById(elementId).style.border = "solid green";
    document.getElementById(elementId).style.borderWidth= "3px";

    if (elementId === 'Description-minus') {
        document.getElementById(elementId).style.outline = "none";
        document.getElementById(elementId).style.border = "solid red";        
        document.getElementById(elementId).style.borderWidth= "3px";
    }
    if (elementId === 'Value-minus') {
        document.getElementById(elementId).style.outline = "none";
        document.getElementById(elementId).style.border = "solid red";        
        document.getElementById(elementId).style.borderWidth= "3px";
    }
   
}

function resetBorder(elementId) {
    document.getElementById(elementId).style.borderColor = "";
    document.getElementById(elementId).style.outline = "none";
    document.getElementById(elementId).style.borderWidth= "1px";
}

//Operator cssing.
function borderValue(operatorValue) {
    if (operatorValue === '+') {
        
        document.getElementById("operatorValue").style.outline = "none";
        document.getElementById("operatorValue").style.border = "solid green";        
        document.getElementById("operatorValue").style.borderWidth= "3px";
    }

    if (operatorValue === '-') {

        document.getElementById("operatorValue").style.outline = "none";
        document.getElementById("operatorValue").style.border = "solid red";        
        document.getElementById("operatorValue").style.borderWidth= "3px";
    }

}

function resetBorderValue(operatorValue) {
    document.getElementById("operatorValue").style.borderColor = "";
    document.getElementById("operatorValue").style.outline = "none";
    document.getElementById("operatorValue").style.borderWidth= "1px";
}

date = getDate()
