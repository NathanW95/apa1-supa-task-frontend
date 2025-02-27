const renderExpenses = (expenses) => {
  const container = document.getElementById("expensesContainer");
  container.innerHTML = ""; // Clear previous content

  expenses.forEach(expense => {
    const tile = document.createElement("div");
    tile.className = "expense-tile";
    tile.id = `expense-tile-${expense.id}`;

    const date = new Date(expense.date_added).toLocaleDateString();
    const description = expense.description || "No description";
    const amount = `£${expense.amount.toFixed(2)}`;
    const category = expense.category;

    tile.innerHTML = `
      <div class="content">
        <div class="description"><strong>${description}</strong></div>
        <input class="edit-description" type="text" value="${description}" style="display: none;" />
        
        <div class="amount">${amount}</div>
        <input class="edit-amount" type="number" value="${expense.amount}" style="display: none;" />
        
        <div class="category"><strong>${category}</strong></div>
        <select class="edit-category" style="display: none;">
          <option value="General" ${category === 'General' ? 'selected' : ''}>General</option>
          <option value="Food" ${category === 'Food' ? 'selected' : ''}>Food</option>
          <option value="Transport" ${category === 'Transport' ? 'selected' : ''}>Transport</option>
          <option value="Entertainment" ${category === 'Entertainment' ? 'selected' : ''}>Entertainment</option>
          <option value="Work" ${category === 'Work' ? 'selected' : ''}>Work</option>
          <option value="Bills" ${category === 'Bills' ? 'selected' : ''}>Bills</option>
        </select>
      </div>
      <div class="icons">
        <span class="icon edit-icon" onclick="toggleEditMode('${expense.id}')">✏️</span>
        <span class="icon save-icon" onclick="saveExpense('${expense.id}')" style="display: none;">✔️</span>
        <span class="icon delete-icon" onclick="deleteExpense('${expense.id}')">🗑️</span>
      </div>
      <div class="date"><strong>Date:</strong> ${date}</div>
    `;

    container.appendChild(tile);
  });
};const getExpenses = async () => {  const resultElement = document.getElementById("result");
  resultElement.textContent = "Getting expenses...";
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
    resultElement.textContent = "";
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

const postExpense = async () => {
  const resultElement = document.getElementById("result");
  const description = document.getElementById("description").value.trim();
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!description || !amount || amount <= 0) {
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

const toggleEditMode = (id) => {
  const tile = document.getElementById(`expense-tile-${id}`);
  const isEditing = tile.classList.toggle("editing");

  const descriptionDiv = tile.querySelector(".description");
  const amountDiv = tile.querySelector(".amount");
  const categoryDiv = tile.querySelector(".category");

  const descriptionInput = tile.querySelector(".edit-description");
  const amountInput = tile.querySelector(".edit-amount");
  const categorySelect = tile.querySelector(".edit-category");

  const editIcon = tile.querySelector(".edit-icon");
  const saveIcon = tile.querySelector(".save-icon");
  const deleteIcon = tile.querySelector(".delete-icon");

  if (isEditing) {
    descriptionDiv.style.display = "none";
    amountDiv.style.display = "none";
    categoryDiv.style.display = "none";

    descriptionInput.style.display = "block";
    amountInput.style.display = "block";
    categorySelect.style.display = "block";

    editIcon.style.display = "none";
    saveIcon.style.display = "inline";
    deleteIcon.style.display = "none";
  } else {
    descriptionDiv.style.display = "block";
    amountDiv.style.display = "block";
    categoryDiv.style.display = "block";

    descriptionInput.style.display = "none";
    amountInput.style.display = "none";
    categorySelect.style.display = "none";

    editIcon.style.display = "inline";
    saveIcon.style.display = "none";
    deleteIcon.style.display = "inline";
  }
};

const saveExpense = async (id) => {
  const tile = document.getElementById(`expense-tile-${id}`);
  const description = tile.querySelector(".edit-description").value.trim();
  const amount = parseFloat(tile.querySelector(".edit-amount").value);
  const category = tile.querySelector(".edit-category").value;

  console.log(id, description, amount, category);

  if (!description || amount <= 0 || !category) {
    alert("Please enter valid expense details.");
    return;
  }

  try {
    const response = await fetch(`/api/update_expense`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, description, amount, category }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    await getExpenses();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

const deleteExpense = async (id) => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Deleting...";

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

