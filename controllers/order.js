const asyncHandler = require("../middleware/async");
const axios = require("axios");
const Orders = require("../model/Orders");
const { randomBytes } = require("crypto");

exports.createOrder = asyncHandler(async (req, res, next) => {
  const { productName, productDetail, quantity, userID } = req.body;

  var orderState = "create";

  // Check for  product id
  const productOrder = await Product.findById(req.params.id);

  if (!productOrder) {
    return next(
      new Error(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  const orderObj = {
    product_title: productName,
    details: productDetail,
    price: productOrder.price,
    size: quantity,
    productID: req.params.id,
    state: orderState,
    user: userID,
  };

  const order = await Orders.create(orderObj);

  var postdata = {
    type: "OrderCreated",
    data: order,
  };

  //event bus
  axios.post("http://localhost:8005/eventbus/events/postEvent", postdata);

  res.status(200).json({
    data: order,
  });
});

exports.cancelOrder = asyncHandler(async (req, res, next) => {
  const order = await Orders.findById(req.params.id);

  if (!order) {
    return next(new Error(`Order not found with id of ${req.params.id}`, 404));
  }

  var postdata = {
    type: "OrderCancel",
    data: order,
  };

  //event bus
  axios.post("http://localhost:8005/eventbus/events/postEvent", postdata);

  //order.remove();
  res.status(200).json({ success: true, data: {} });
});

exports.checkOrder = asyncHandler(async (req, res, next) => {
  const order = await Orders.findById(req.params.id);

  if (!order) {
    return next(new Error(`Order not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: order });
});

exports.postPayment = asyncHandler(async (req, res, next) => {
  const { type, data } = req.body;

  if (type === "OrderConfirmed") {
    res.status(200).json({
      status: "Sucess",
      data: { data },
    });
  }

  if (type === "OrderRemoved") {
    res.status(200).json({
      status: "Sucess",
      data: { data },
    });
  }
});

// exports.declinedorder = asyncHandler(async (req, res, next) => {
//   // app.post('/events', (req,res) => {
//   const { type, datalist } = req.body;

//   //handleEvent(type, datalist);

//   //   console.log(posts);
//   res.status(200).json({
//     status: "Success",
//     data: { datalist },
//   });
// });
