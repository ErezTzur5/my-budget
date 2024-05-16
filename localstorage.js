// localstorage save function.
function saveDataToLocalStorage() {
    localStorage.setItem('incomes', JSON.stringify(incomesArray));
    localStorage.setItem('expenses', JSON.stringify(expensesArray));
 

}

// localstorage get function.
function loadDataFromLocalStorage() {
    incomesArray = JSON.parse(localStorage.getItem('incomes')) || [];
    expensesArray = JSON.parse(localStorage.getItem('expenses')) || [];
}
