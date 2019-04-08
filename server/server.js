const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3001;

app.use(express.static(publicPath));

// Find Notifications API
const FIND_NOTIFICATION_END_POINT = '/api/v1/findNotification';
// TODO: Get data to database
app.get(FIND_NOTIFICATION_END_POINT, (req, res) => {
  res.send('Your GET request has been received!');
});
// TODO: Save received data to database
app.post(FIND_NOTIFICATION_END_POINT, (req, res) => {
  res.send('Your POST request has been received!');
});

// Application
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
