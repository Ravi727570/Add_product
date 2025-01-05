document.addEventListener('DOMContentLoaded', function () {
    // Initialize expenses array from local storage or create a new array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    // Function to render expenses in the list and display total price
    function renderExpenses() {
        const userList = document.getElementById('userList');
        const totalElement = document.getElementById('totalPrice');
        userList.innerHTML = ''; // Clear the list
        let totalPrice = 0;
        expenses.forEach((expense, index) => {
            const listItem = document.createElement('li');
            // Check if Description is a valid URL
            const isValidUrl = (str) => {
                try {
                    new URL(str);
                    return true;
                } catch (_) {
                    return false;
                }
            };
            let descriptionContent;
            if (isValidUrl(expense.Description)) {
                // Create a clickable hyperlink if Description is a URL
                descriptionContent = document.createElement('a');
                descriptionContent.href = expense.Description;
                descriptionContent.textContent = expense.Description;
                descriptionContent.target = '_blank';
            } else {
                descriptionContent = document.createTextNode(expense.Description);
            }
            listItem.textContent = `${expense.ExpenseAmount} - `;
            listItem.appendChild(descriptionContent);
            // Delete button
            const deleteButton = document.createElement('input');
            deleteButton.type = 'button';
            deleteButton.value = 'Delete Product';
            deleteButton.onclick = () => {
                expenses.splice(index, 1); // Remove the expense
                localStorage.setItem('expenses', JSON.stringify(expenses));
                renderExpenses(); // Re-render the list
            };
            listItem.appendChild(deleteButton);
            userList.appendChild(listItem);
            // Update total price
            totalPrice += parseFloat(expense.ExpenseAmount) || 0;
        });
        // Display total price
        totalElement.textContent = `Total Value Worth of Products: Rs ${totalPrice.toFixed()}`;
    }
    // Function to handle expense form submission
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent form default action
        const expenseAmount = document.getElementById('ExpenseAmount').value.trim();
        const description = document.getElementById('Description').value.trim();

        if (expenseAmount && description) {
            // Create a new expense object
            const newExpense = {
                ExpenseAmount: expenseAmount,
                Description: description,
            };
            expenses.push(newExpense); // Add to the expenses array
            localStorage.setItem('expenses', JSON.stringify(expenses)); // Save to local storage
            renderExpenses(); // Re-render the list
            // Clear the form fields
            document.getElementById('ExpenseAmount').value = '';
            document.getElementById('Description').value = '';
        }
    }
    // Initial render of expenses
    renderExpenses();
    // Attach the expense form submission handler
    document.querySelector('form').addEventListener('submit', handleFormSubmit);
});
