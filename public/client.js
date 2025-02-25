const renderExpenses = (expenses) => {
  const container = document.getElementById("expensesContainer");
  container.innerHTML = ""; // Clear previous content

  expenses.forEach(expense => {
    const tile = document.createElement("div");
    tile.className = "expense-tile";

    const date = new Date(expense.date).toLocaleDateString(); // TODO EXTRACT DATE / Time to variables to display
    const description = expense.description || "No description";
    const amount = `£${expense.amount.toFixed(2)}`;
    const category = expense.category;

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
};const getExpenses = async () => {
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

const postExpense = async () => {
  const resultElement = document.getElementById("result");
  const description = document.getElementById("description").value.trim();
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!description || amount <= 0) {
    resultElement.textContent = "Please enter valid expense details.";
    return;
  }

  resultElement.textContent = "Adding expense...";

  try {
    const response = await fetch(`/api/new_expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, category, amount }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    await getExpenses();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    resultElement.textContent = "";
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

const editExpense = async (id) => {
  // Implement edit functionality
  console.log(`Edit expense with ID: ${id}`);
};

const deleteExpense = async (id) => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Deleting...";
  console.log(`Delete expense with ID: ${id}`);

  try {
    const response = await fetch(`/api/delete_expense`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    await getExpenses();
    resultElement.textContent = "";
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
}


document.getElementById("getExpenses").addEventListener("click", getExpenses);
document.getElementById("addExpense").addEventListener("click", postExpense);
document.getElementById("showForm").addEventListener("click", () => {
  const form = document.getElementById("expenseForm");
  const button = document.getElementById("showForm");

  form.style.display = form.style.display === "none" ? "block" : "none";
  button.classList.toggle("active", form.style.display === "block");
});

