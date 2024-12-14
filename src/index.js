const express = require('express');
const cors = require('cors');
const libraryRoutes = require('./routes/libraryRoutes');
const { handleError } = require('./utils/responseHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/library', libraryRoutes);

app.get('/', (req, res) => {
  res.json("Welcome to the Online Library System API");
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  return handleError(res, err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});