const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const dbConnection = require('./configs/db');

const app = express();
dbConnection();


app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(4000, () => console.log('Server running on port 4000'));
