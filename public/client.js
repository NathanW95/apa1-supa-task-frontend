const renderExpenses = (expenses) => {
  const container = document.getElementById("expensesContainer");
  container.innerHTML = ""; // Clear previous content

  expenses.forEach(expense => {
    const tile = document.createElement("div");
    tile.className = "expense-tile";

    const date = new Date(expense.date).toLocaleDateString();
    const description = expense.description || "No description";
    const amount = expense.amount ? `£${expense.amount.toFixed(2)}` : "N/A";
    const category = expense.category || "Uncategorized";

    tile.innerHTML = `
      <div class="content">
        <div><strong>Description:</strong> ${description}</div>
        <div><strong>Amount:</strong> ${amount}</div>
        <div><strong>Date:</strong> ${date}</div>
        <div><strong>Category:</strong> ${category}</div>
      </div>
      <div class="icons">
        <span class="icon" onclick="editExpense('${expense.id}')">✏️</span>
        <span class="icon" onclick="deleteExpense('${expense.id}')">🗑️</span>
      </div>
    `;

    container.appendChild(tile);
  });
};

const getExpenses = async () => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";

  try {
    const response = await fetch(`/api/expenses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    renderExpenses(data);
    resultElement.textContent = ""; // Clear the loading message
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

const editExpense = (id) => {
  // Implement edit functionality
  console.log(`Edit expense with ID: ${id}`);
};

const deleteExpense = (id) => {
  // Implement delete functionality
  console.log(`Delete expense with ID: ${id}`);
};

document.getElementById("callFunction").addEventListener("click", getExpenses);
