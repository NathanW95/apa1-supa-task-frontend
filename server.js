// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// // MESSAGES
// POST endpoint
// // CAN DELETE
// app.post('/api/new_message', async (req, res) => {
//   try {
//
//     // Call the Supabase Edge Function for messages
//     const response = await fetch(`${SUPABASE_URL}/functions/v1/messages`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
//       },
//       body: JSON.stringify(req.body)
//     });
//
//     if (!response.ok) {
//       throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
//     }
//
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('GET request error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });
//
// // GET endpoint
// // CAN DELETE
// app.get('/api/messages', async (req, res) => {
//   try {
//
//     // Call the Supabase Edge Function for messages
//     const response = await fetch(`${SUPABASE_URL}/functions/v1/messages`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
//       }
//     });
//
//     if (!response.ok) {
//       throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
//     }
//
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('GET request error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });


// GET endpoint EXPENSES
app.get('/api/expenses', async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost:3000');
    const userId = url.searchParams.get('user_id');

    // Call the Supabase Edge Function for messages
    const response = await fetch(`${SUPABASE_URL}/functions/v1/expenses?user_id=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('GET request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint ALL EXPENSES
app.get('/api/all_expenses', async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/expenses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('GET request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET endpoint SORT EXPENSES
app.get('/api/sort_expenses', async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost:3000');
    const userId = url.searchParams.get('user_id');
    const sortBy = url.searchParams.get('sort_by');
    const sortOrder = url.searchParams.get('sort_order');

    // Call the Supabase Edge Function for messages
    const response = await fetch(`${SUPABASE_URL}/functions/v1/expenses?user_id=${userId}&sort_by=${sortBy}&sort_order=${sortOrder}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('GET request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint EXPENSES
app.post('/api/new_expense', async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/expenses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('POST request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT endpoint EXPENSES
app.put('/api/update_expense', async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/expenses`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('PUT request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE endpoint EXPENSES
app.delete('/api/delete_expense', async (req, res) => {
  try {
    const { id } = req.body;
    const response = await fetch(`${SUPABASE_URL}/functions/v1/expenses/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('DELETE request error:', error);
    res.status(500).json({ error: error.message });
  }
});


// POST endpoint create USERS
app.post('/api/create_user', async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('POST request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint LOGIN (USERS)
app.post('/api/login', async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/login`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('POST request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});