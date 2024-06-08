const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routers/user');
const authRoute = require('./routers/auth');
const productRoute = require('./routers/product');
const cartRoute = require('./routers/cart');
const orderRoute = require('./routers/orders');
const cors = require('cors');
dotenv.config();

app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connection Successful'))
  .catch((err) => console.log(err));

app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

app.listen(process.env.PORT || 5002, () => {
  console.log(`Backend server is running ${process.env.PORT}`);
});

// app.get("/api/test",()=>{
//   console.log("test is successful!");
// })
