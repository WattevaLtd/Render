const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// 🟢 Fill in your real values below
const NC_API_URL = https://app.nocodb.com/#/wcawqlqn/;
const NC_API_TOKEN = t3v9PiuroFyeQOPYkVbckRcmCSWLOtWNzHHpoPpb;
const PROJECT = Main;
const TABLE = Workflow;

app.post('/webhook', async (req, res) => {
  const record = req.body?.record;
  if (!record) return res.sendStatus(400);

  const { id, emb, print, dtf } = record;

  const allCompleted =
    emb?.includes('Completed') &&
    print?.includes('Completed') &&
    dtf?.includes('Completed');

  if (allCompleted) {
    await axios.patch(
      `${NC_API_URL}/api/v1/db/data/v1/${PROJECT}/${TABLE}/${id}`,
      { status: 'Completed' },
      { headers: { 'xc-token': NC_API_TOKEN } }
    );
    console.log(`✅ Updated record ${id}`);
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log('🚀 Webhook listening on port 3000'));
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const {
  NC_API_URL,
  NC_API_TOKEN,
  PROJECT,
  TABLE
} = process.env;

app.post('/webhook', async (req, res) => {
  const record = req.body?.record;
  if (!record) return res.status(400).send('No record data');

  const { id, emb, print, dtf } = record;

  const allCompleted =
    String(emb).includes('Completed') &&
    String(print).includes('Completed') &&
    String(dtf).includes('Completed');

  if (allCompleted) {
    try {
      await axios.patch(
        `${NC_API_URL}/api/v1/db/data/v1/${PROJECT}/${TABLE}/${id}`,
        { status: 'Completed' },
        {
          headers: {
            'xc-token': NC_API_TOKEN,
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(`✅ Record ${id} updated to Completed`);
    } catch (error) {
      console.error('❌ Error updating record:', error?.response?.data || error.message);
    }
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
