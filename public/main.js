document.addEventListener('DOMContentLoaded', () => {
  const user_id = localStorage.getItem('userId');
  const sortingOptions = document.getElementById('sorting-options');
  const showFormButton = document.getElementById('show-form');

  if (!user_id) {
    console.error('User ID not found in local storage');

    window.location.href = '/index.html';
    return;
  }

  if (user_id === '5') {    // BONUS FEATURE: Admin user can see all users expenses
    getAllExpenses();
    sortingOptions.style.display = 'none';
    showFormButton.style.display = 'none';
  }
  else {
    getExpenses(user_id);
  }

  document.getElementById("show-form").addEventListener("click", () => {
      const form = document.getElementById("expense-form");
      const button = document.getElementById("show-form");

      form.style.display = form.style.display === "none" ? "block" : "none";
      button.classList.toggle("active", form.style.display === "block");
  });

  document.getElementById("add-expense").addEventListener("click", postExpense);
  document.getElementById("sort-by").addEventListener("change", sortExpenses);
  document.getElementById("sort-order").addEventListener("change", sortExpenses);
  document.getElementById("sign-out").addEventListener("click", localStorage.clear);
});

const renderExpenses = (expenses) => {
  const container = document.getElementById("expenses-container");
  container.innerHTML = "";

  expenses.forEach(expense => {
    const tile = document.createElement("div");
    tile.className = "expense-tile";
    tile.id = `expense-tile-${expense.id}`;

    const date = new Date(expense.date_added).toLocaleDateString();
    const description = expense.description;
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
        <span class="icon delete-icon" onclick="deleteExpense('${expense.id}')">🗑️</span>
          <span class="icon save-icon" onclick="updateExpense('${expense.id}')" style="display: none;">✅</span>
        <span class="icon cancel-icon" onclick="cancelEditMode('${expense.id}')" style="display: none;">❌</span>
      </div>
      <div class="date"><strong>Date:</strong> ${date}</div>
    `;

    container.appendChild(tile);
  });
};

const getExpenses = async (user_id) => {
  const userFeedback = document.getElementById("user-feedback");
  userFeedback.textContent = "Getting expenses...";
  try {
    const response = await fetch(`/api/expenses?user_id=${user_id}`, {
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
    clearUserFeedback()

  } catch (error) {
    userFeedback.textContent = `Error: ${error.message}`;
  }
};

const getAllExpenses = async () => {
  const userFeedback = document.getElementById("user-feedback");
  userFeedback.textContent = "Getting expenses...";
  try {
    const response = await fetch(`/api/all_expenses`, {
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
    clearUserFeedback()

  } catch (error) {
    userFeedback.textContent = `Error: ${error.message}`;
  }
};

const sortExpenses = async () => {
  const user_id = localStorage.getItem('userId');
  const userFeedback = document.getElementById("user-feedback");
  const sortBy = document.getElementById("sort-by").value;
  const sortOrder = document.getElementById("sort-order").value;

  userFeedback.textContent = "sorting expenses...";

  try {
    const response = await fetch(`/api/sort_expenses?user_id=${user_id}&sort_by=${sortBy}&sort_order=${sortOrder}`, {
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
    clearUserFeedback()

  } catch (error) {
    userFeedback.textContent = `Error: ${error.message}`;
  }
};

const postExpense = async () => {
  const user_id = localStorage.getItem('userId');
  const userFeedback = document.getElementById("user-feedback");
  const description = document.getElementById("description").value.trim();
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!description || !amount || amount <= 0) {
    userFeedback.textContent = "Please enter valid expense details.";
    return;
  }

  userFeedback.textContent = "Adding expense...";

  try {
    const response = await fetch(`/api/new_expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, category, amount, user_id }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    await getExpenses(user_id);

    resetSortingDropdowns()
    resetExpenseFormInputFields()
    clearUserFeedback()

  } catch (error) {
    userFeedback.textContent = `Error: ${error.message}`;
  }
};

const updateExpense = async (id) => {
  const user_id = localStorage.getItem('userId');
  const tile = document.getElementById(`expense-tile-${id}`);
  const description = tile.querySelector(".edit-description").value.trim();
  const amount = parseFloat(tile.querySelector(".edit-amount").value);
  const category = tile.querySelector(".edit-category").value;


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

    await getExpenses(user_id);

    resetSortingDropdowns()

  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};

const deleteExpense = async (id) => {
  const user_id = localStorage.getItem('userId');
  const userFeedback = document.getElementById("user-feedback");
  userFeedback.textContent = "Deleting...";

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

    await getExpenses(user_id);

    resetSortingDropdowns()
    clearUserFeedback()

  } catch (error) {
    userFeedback.textContent = `Error: ${error.message}`;
  }
}

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
  const deleteIcon = tile.querySelector(".delete-icon");
  const saveIcon = tile.querySelector(".save-icon");
  const cancelIcon = tile.querySelector(".cancel-icon");

  if (isEditing) {
    descriptionDiv.style.display = "none";
    amountDiv.style.display = "none";
    categoryDiv.style.display = "none";

    descriptionInput.style.display = "block";
    amountInput.style.display = "block";
    categorySelect.style.display = "block";

    editIcon.style.display = "none";
    deleteIcon.style.display = "none";
    saveIcon.style.display = "inline";
    cancelIcon.style.display = "inline";
  } else {
    descriptionDiv.style.display = "block";
    amountDiv.style.display = "block";
    categoryDiv.style.display = "block";

    descriptionInput.style.display = "none";
    amountInput.style.display = "none";
    categorySelect.style.display = "none";

    editIcon.style.display = "inline";
    deleteIcon.style.display = "inline";
    saveIcon.style.display = "none";
    cancelIcon.style.display = "none";
  }
};

const cancelEditMode = (id) => {
  const tile = document.getElementById(`expense-tile-${id}`);

  const descriptionDiv = tile.querySelector(".description");
  const amountDiv = tile.querySelector(".amount");
  const categoryDiv = tile.querySelector(".category");

  const descriptionInput = tile.querySelector(".edit-description");
  const amountInput = tile.querySelector(".edit-amount");
  const categorySelect = tile.querySelector(".edit-category");

  descriptionInput.value = descriptionDiv.textContent.trim();
  amountInput.value = parseFloat(amountDiv.textContent.replace('£', ''));
  categorySelect.value = categoryDiv.textContent.trim();

  toggleEditMode(id);
};

const resetSortingDropdowns = () => {
  document.getElementById("sort-by").selectedIndex = 0;
  document.getElementById("sort-order").selectedIndex = 0;
}

const resetExpenseFormInputFields = () => {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

const clearUserFeedback = () => {
  const userFeedback = document.getElementById("user-feedback");
  userFeedback.textContent = "";
}


module.exports = {
  getExpenses,
  postExpense,
  updateExpense,
  deleteExpense,
}