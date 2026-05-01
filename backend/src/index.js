const express = require('express');
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./routes/tasks');
const { metricsMiddleware, metricsRoute } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/metrics', metricsRoute);

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
