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

// New POST endpoint
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

// New GET endpoint
app.get('/api/expenses', async (req, res) => {
  try {

    // Call the Supabase Edge Function for messages
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

// New PUT endpoint
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

// New DELETE endpoint
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


// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});