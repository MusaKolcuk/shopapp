const express = require("express");
const router = express.Router();
const Joi = require("joi");


const products = [      //daha sonra veri tabani dosyasi olusturulup orada tutulacak.
    { id: 1, name: "iphone 12", price: 20000 },
    { id: 2, name: "iphone 13", price: 30000 },
    { id: 3, name: "iphone 14", price: 40000 }
];


router.get("/", (req, res) => {        //gonderilen talep eger /api/products ise butun urun bilgileri getirilir.
    res.send(products);
});

router.post("/", (req, res) => {
    const { error } =  validateProduct(req.body);

    if(error) {
        return res.status(400).send(result.error.details[0].message);
    }

    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.send(product);
});

router.put("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if(!product) {
        return res.status(404).send("aradığınız ürün bulunamadı.");
    }

    const { error } = validateProduct(req.body);

    if(error) {
        return res.status(400).send(result.error.details[0].message);
    }

    product.name = req.body.name;
    product.price = req.body.price;

    res.send(product);
});

router.delete("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if(!product) {
        return res.status(404).send("aradığınız ürün bulunamadı.");
    }

    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send(product);
});

router.get("/:id", (req, res) => {

    console.log(req.params);
    console.log(req.query);     // req.query ile Url de ? koyup yazmak istediğimiz özelligi mesela urun fiyatini console da yazdirabiliriz.

    const product = products.find(p => p.id == req.params.id);

    if(!product) {
        return res.status(404).send("aradığınız ürün bulunamadı.");
    }
    res.send(product);
});

function validateProduct(product) {
    const schema = new Joi.object({
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().required()
    });

    return schema.validate(product);
}


module.exports  = router;