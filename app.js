const express = require("express");
const app = express();          //uygulama olusturma.
const cors = require("cors");


const products = require("./routes/products");
const home = require("./routes/home");

app.use(express.json());             // gelen veriler json olarak okunacak.

app.use(cors({
    origin: "*",
    methods: ["GET"]
}))

// npm i cors paketi ile bu islemleri ustteki gibi gosterebiliriz. Bu sekilde ugrasmaya gerek kalmaz.
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Methods","GET");
//     next();

// })


app.use("/api/products", products);
app.use("/", home);


app.listen(3000, () => {
    console.log("listening on port 3000");
});