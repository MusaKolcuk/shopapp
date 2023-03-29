const express = require("express");
const app = express();      //uygulama olusturma.

const products = [
    {id: 1, name: "iphone 12", price: 20000},
    {id: 2, name: "iphone 13", price: 30000},
    {id: 3, name: "iphone 14", price: 40000},
];



app.get("/", (req, res) => {            //sayfaya get methodu ile istek gonderilir.
    res.send(products[0]);
})

app.get("/api/products", (req, res) => {        //gonderilen talep eger /api/products ise butun urun bilgileri getirilir.
    res.send(products);
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})