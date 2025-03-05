const { getExpenses, postExpense, updateExpense, deleteExpense } = require('./main');

beforeEach(() => {
  document.body.innerHTML = `
    <div id="user-feedback"></div>
    <div id="expenses-container"></div>
    <input id="description" value="" />
    <input id="amount" value="" />
    <select id="category">
      <option value="General">General</option>
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Work">Work</option>
      <option value="Bills">Bills</option>
    </select>
  `;

  localStorage.setItem('userId', '12345');
  global.alert = jest.fn();
});

global.fetch = jest.fn();

describe('getExpenses', () => {
  test('should fetch and render expenses', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, description: 'Test Expense', category: 'Food',  amount: 100, date_added: '2021-01-01', user_id: 12345 }],
    });

    await getExpenses('12345');

    expect(document.getElementById('expenses-container').innerHTML).toContain('Test Expense');
  });
});

describe('postExpense', () => {
  test('should post a new expense', async () => {
    document.getElementById("description").value = "New Expense";
    document.getElementById("amount").value = "50";
    document.getElementById("category").value = "Food";

    fetch.mockResolvedValueOnce({ ok: true });

    await postExpense();

    expect(fetch).toHaveBeenCalledWith('/api/new_expense', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        description: "New Expense",
        category: "Food",
        amount: 50,
        user_id: '12345'
      }),
    }));
  });
});

describe('updateExpense', () => {
  test('should call update_expense api with values from the edit form', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    document.body.innerHTML += `
      <div id="expense-tile-1" class="expense-tile">
        <input class="edit-description" value="Updated Expense" />
        <input class="edit-amount" value="150" />
        <select class="edit-category">
          <option value="Food" selected>Food</option>
        </select>
      </div>
    `;

    await updateExpense(1, );
    expect(fetch).toHaveBeenCalledWith('/api/update_expense', expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        description: "Updated Expense",
        amount: 150,
        category: "Food"
      }),
    }));
  });
});

describe('deleteExpense', () => {
  test('should delete an expense', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await deleteExpense(1);

    expect(fetch).toHaveBeenCalledWith('/api/delete_expense', expect.objectContaining({
      method: 'DELETE',
      body: JSON.stringify({ id: 1 }),
    }));
  });
});