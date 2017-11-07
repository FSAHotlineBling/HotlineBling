const router = require('express').Router()
// const { Category, ProductCategory } = require('../db/models')
const db = require('../db')
const Category = db.models.category
const ProductCategory = db.models.productCategory
const { isAdmin } = require('../middleware')
module.exports = router


router.get('/', (req, res, next) => {
    Category.findAll()
        .then(categories => res.json(categories))
        .catch(next)
})

// router.post('/', isAdmin,(req, res, next) => {
//     console.log('LOOKING FOR REQ BODY',  req.body)
//     Category.findOrCreate({
//         where: {
//             value: req.body.value,
//             category: req.body.category
//         }
//     })
//         .then((product) => {
//             res.status(201).json(product);
//         })
//         .catch(next);
// });

router.post('/', isAdmin, (req, res, next) => {
    console.log('LOOKING FOR REQ BODY',  req.body)
    let newCategory = Category.build(req.body)
    console.log('Looking for new cat****', newCategory)
    newCategory.save()
    .then(() =>{
        res.sendStatus(201);
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Category.findById(id)
        .then(category => res.json(category))
        .catch(next)
})

router.post('/add', isAdmin,(req, res, next) => {
    ProductCategory.create(req.body)
        .then(() => {
            res.sendStatus(201)
        })
        .catch(next);
});

router.delete('/:productId/:categoryId', isAdmin, (req, res, next) => {
    ProductCategory.destroy({
        where: {
            productId: req.params.productId,
            categoryId: req.params.categoryId
        }
    })
        .then(() => {
            res.sendStatus(201)
        })
        .catch(next);
})
