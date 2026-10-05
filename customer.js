const mongoose = require("mongoose");
const { Schema } = mongoose;

main() 
.then(() => console.log("connection successful"))
.catch((err) => console.log(err));

async function main() {
await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
        type: Schema.Types.ObjectId,
        ref: "Order",
    },
    ],
});

Schema.pre("findOneandDelete", async () => {
    console.log("PRE MIDDLEWARE");
})


Schema.Post("findOneandDelete", async() => {
    console.log("POST MIDDLEWARE");
})


const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);


// Functions

const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
}

const addCust = async () => {
    let newCust = new Customer({
        name: "Karan Arjun"
    });


    let newOrder = new Order({
        item: "Pizza",
        price: 250,
    });

    newCust.orders.push(newOrder);
     
    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
};

addCust();

const delCust = async()  =>  {
    let data = await Customer.findByIdAndDelete("6ac3bf7e8a9d656e541fa737");
    console.log(data);
}

delCust();
// findCustomer();

// const addOrders = async () => {
//     let res = await Order.insertMany([
//         { item: "Samosa", price: 12},
//         { item: "Chips", Price: 10},
//         { item: "Chocolate", price: 40},
//     ]);

//     console.log(res);
// };

// addOrders();