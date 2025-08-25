const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes=require('./routes/authRouts.js');
const todoRoutes=require('./routes/todoRoutes.js');

dotenv.config();

const app = express();
app.use(cors({origin:'https://todo-rho-gilt-82.vercel.app', credentials :true}));

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/todo' , todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));