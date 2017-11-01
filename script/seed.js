const Models = require('../server/db/models');
const Category = Models.Category;
const Product = Models.Product;
const Order = Models.Order;
const User = Models.User;
const Review = Models.Review;
const ProductOrder = Models.ProductOrder;
const ProductCategory = Models.ProductCategory;
const db = require('../server/db/');

const categories = [
    { value: 'Black', category: 'color'}, //1
    { value: 'Gray', category: 'color'}, //2
    { value: 'White', category: 'color'}, //3
    { value: 'Blue', category: 'color'}, //4
    { value: 'Red', category: 'color'},  //5
    { value: 'Blackberry', category: 'brand'},  //6
    { value: 'IBM', category: 'brand'},  //7
    { value: 'Nokia', category: 'brand'},  //8
    { value: 'Motorola', category: 'brand'},  //9
    { value: 'CellStart', category: 'brand'}, //10
    { value: 'Palm', category: 'brand'}, //11
    { value: 'Samsung', category: 'brand'},  //12
    { value: '1993', category: 'year'},  //13
    { value: '1994', category: 'year'}, //14
    { value: '1995', category: 'year'}, //15
    { value: '1996', category: 'year'}, //16
    { value: '1997', category: 'year'}, //17
    { value: '1998', category: 'year'}, //18
    { value: '1999', category: 'year'}, //19
    { value: '1992', category: 'year'}, //20
    { value: '1983', category: 'year'}, //21
    { value: 'Siemens', category: 'brand'}, //22
    { value: '1989', category: 'year'}, //23
];

const products = [
    { name: 'IBM Simon Personal Communicator', description: 'Cell phone, PDA, and Fax machine!', price: '299', quantityAvailable: '5', imageUrl: 'http://images.complex.com/complex/image/upload/c_limit,w_680/f_auto,fl_lossy,pg_1,q_auto/c_limit,w_680/kwojp854hn8b0velxzb4.jpg'},
    { name: 'Motorola StarTAC', description: 'Bold, yet simplistic, flip phone.', price: '199', quantityAvailable: '3', imageUrl: 'http://images.complex.com/complex/image/upload/c_limit,w_680/f_auto,fl_lossy,pg_1,q_auto/c_limit,w_680/y4qlwuotvdszkjkok5k4.jpg'},
    { name: 'Motorola DynaTAC 800X', description: 'First commercial mobile phone ever produced!', price: '349', quantityAvailable: '8', imageUrl: 'http://images.complex.com/complex/image/upload/c_limit,w_680/f_auto,fl_lossy,pg_1,q_auto/c_limit,w_680/k9toczdgjdizgkkxxvex.jpg'},
    { name: 'Nokia 8810', description: 'Tiny size makes it irresistably easy to pocket, use and, of course, show off!', price: '229', quantityAvailable: '2', imageUrl: 'http://images.complex.com/complex/image/upload/c_limit,w_680/f_auto,fl_lossy,pg_1,q_auto/c_limit,w_680/jfpltrbs3afpyjfblxtb.jpg'},
    { name: 'Siemens S10', description: 'First-ever commercial color-screen cellular—displaying up to six lines of info in four colors (white, red, green, and blue)', price: '419', quantityAvailable: '0', imageUrl: 'http://images.complex.com/complex/image/upload/c_limit,w_680/f_auto,fl_lossy,pg_1,q_auto/c_limit,w_680/hoqkslii6nfcfv09u4uc.jpg'},
    { name: 'Nokia 9000 Communicator', description: 'Cutting-edge design that carried the look of a regular phone and flipped open to disclose a secondary screen and QWERTY keyboard to accommodate emails and SMS', price: '299', quantityAvailable: '5', imageUrl: 'http://images.complex.com/complex/image/upload/c_limit,w_680/f_auto,fl_lossy,pg_1,q_auto/c_limit,w_680/xsbb0kuqylh0ah8y88gr.jpg'},
    { name: 'Motorola Microtac 9800X', description: 'The first truly portable phone!', price: '379', quantityAvailable: '12', imageUrl: 'https://netdna.webdesignerdepot.com/uploads/cellphone_design/dkmb86g_392fhn6j9hb_b.jpg'},
    { name: 'NOKIA 1011', description: 'Cell phone, PDA, and Fax machine!', price: '189', quantityAvailable: '4', imageUrl: 'https://netdna.webdesignerdepot.com/uploads/cellphone_design/dkmb86g_420cxnstvcw_b.jpg'},
    { name: 'NOKIA 9110I', description: 'Lightweight precursor to the smartphone.', price: '279', quantityAvailable: '24', imageUrl: 'https://netdna.webdesignerdepot.com/uploads/cellphone_design/dkmb86g_399gwsthwch_b.jpg'},
    { name: 'NOKIA 8210', description: 'Fantastic phone with customizable design', price: '349', quantityAvailable: '0', imageUrl: 'https://netdna.webdesignerdepot.com/uploads/cellphone_design/dkmb86g_488q5g3q3gc_b.jpg'},
];

const productCat = [
  {productId: 1, categoryId: 1},
  {productId: 1, categoryId: 9},
  {productId: 1, categoryId: 14},
  {productId: 2, categoryId: 1},
  {productId: 2, categoryId: 6},
  {productId: 2, categoryId: 16},
  {productId: 3, categoryId: 3},
  {productId: 3, categoryId: 9},
  {productId: 3, categoryId: 21},
  {productId: 4, categoryId: 2},
  {productId: 4, categoryId: 8},
  {productId: 4, categoryId: 18},
  {productId: 5, categoryId: 2},
  {productId: 5, categoryId: 17},
  {productId: 5, categoryId: 22},
  {productId: 6, categoryId: 2},
  {productId: 6, categoryId: 8},
  {productId: 6, categoryId: 16},
  {productId: 7, categoryId: 1},
  {productId: 7, categoryId: 9},
  {productId: 7, categoryId: 23},
  {productId: 8, categoryId: 2},
  {productId: 8, categoryId: 8},
  {productId: 8, categoryId: 14},
  {productId: 9, categoryId: 2},
  {productId: 9, categoryId: 8},
  {productId: 9, categoryId: 18},
  {productId: 10, categoryId: 5},
  {productId: 10, categoryId: 8},
  {productId: 10, categoryId: 18},
]

const reviews = [
  {title: 'BEST PHONE EVER, OMG!!', reviewText: 'This phone is, like, the greatest thing Ive ever owned!! Its so great!!', stars: 5, productId: 1, userId: 1},
  {title: 'WORST PHONE EVER, OMG!!', reviewText: "This phone is, like, the worst thing I've ever owned!! It's so bad!!", stars: 1, productId: 2, userId: 2},
  {title: 'Meh...', reviewText: 'Not good, not great. It is what it is', stars: 3, productId: 3, userId: 2},
  {title: 'Da Bomb Dot Com!', reviewText: 'I love this phone so much!', stars: 5, productId: 4, userId: 2},
  {title: 'Innovation At Its Best', reviewText: 'Ive never seen anything like it!', stars: 1, productId: 4, userId: 2},
  {title: 'Poor Battery Life', reviewText: 'Great phone, but the battery only last for 4 hours.', stars: 3, productId: 7, userId: 3},
  {title: 'Poor Reception', reviewText: 'I cant hear anyone when they are talking because the reception is so bad', stars: 2, productId: 7, userId: 5},
  {title: 'Cool Phone', reviewText: 'Really cool phone! I love texting from it!', stars: 4, productId: 8, userId: 2},
  {title: 'Cutting Edge', reviewText: 'I get so much attention from my friends because I am the only one with such a cool, new phone!', stars: 2, productId: 8, userId: 1},
  {title: 'Great!', reviewText: 'Best phone Ive every owned!', stars: 5, productId: 8, userId: 4},
]

const users = [
  {email: 'johndoe@yahoo.com', password: '123', isAdmin: false, name: 'John Doe', username: 'jdoe' },
  {email: 'mikeadams@yahoo.com', password: '123', isAdmin: false, name: 'Mike Adams', username: 'madams' },
  {email: 'angelabennet@yahoo.com', password: '123', isAdmin: false, name: 'Angela Bennet', username: 'abennet' },
  {email: 'serenawillians@yahoo.com', password: '123', isAdmin: false, name: 'Serena Williams', username: 'swilliams' },
  {email: 'scottiepippen@yahoo.com', password: '123', isAdmin: false, name: 'Scottie Pippen', username: 'spippen' },
  {email: 'admin@yahoo.com', password: '123', isAdmin: true, name: 'Admin User', username: 'admin' }
]

const orders = [
  {address: '123 Main St', city: 'Chicago', state: 'IL', zip: '60610', email: 'johndoe@yahoo.com', status: 'created', userId: '1'},
  {address: '123 State St', city: 'Chicago', state: 'IL', zip: '60610', email: 'mikeadams@yahoo.com', status: 'created', userId: '2'},
  {address: '123 Michigan Ave', city: 'Chicago', state: 'IL', zip: '60610', email: 'angelabennet@yahoo.com', status: 'created', userId: '3'},
  {address: '123 Green St', city: 'Chicago', state: 'IL', zip: '60610', email: 'serenawillians@yahoo.com', status: 'created', userId: '4'},
  {address: '123 Wells St', city: 'Chicago', state: 'IL', zip: '60610', email: 'scottiepippen@yahoo.com', status: 'created', userId: '5'},
  {address: '123 Wells St', city: 'Chicago', state: 'IL', zip: '60610', email: 'scottiepippen@yahoo.com', status: 'delivered', userId: '5'},
  {address: '123 Main St', city: 'Chicago', state: 'IL', zip: '60610', email: 'johndoe@yahoo.com', status: 'processing', userId: '1'},
  {address: '123 Ohio St', city: 'Chicago', state: 'IL', zip: '60610', email: 'mikeadams@yahoo.com', status: 'cancelled', userId: '2'},
  {address: '123 James St', city: 'Chicago', state: 'IL', zip: '60610', email: 'angelabennet@yahoo.com', status: 'completed', userId: '3'},
  {address: '123 Adams St', city: 'Chicago', state: 'IL', zip: '60610', email: 'angelabennet@yahoo.com', status: 'delivered', userId: '3'},
  {address: '123 Wells St', city: 'Chicago', state: 'IL', zip: '60610', email: 'scottiepippen@yahoo.com', status: 'completed', userId: '5'},
  {address: '123 LaSalle Ave', city: 'Chicago', state: 'IL', zip: '60610', email: 'johndoe@yahoo.com', status: 'delivered', userId: '1'},
]

const productOrder = [
  {productId: 1, orderId: 1, quantity: 1},
  {productId: 2, orderId: 2, quantity: 1},
  {productId: 3, orderId: 2, quantity: 2},
  {productId: 4, orderId: 3, quantity: 1},
  {productId: 5, orderId: 3, quantity: 1},
  {productId: 6, orderId: 3, quantity: 1},
  {productId: 7, orderId: 4, quantity: 1},
  {productId: 8, orderId: 5, quantity: 1},
  {productId: 9, orderId: 6, quantity: 1},
  {productId: 1, orderId: 6, quantity: 1},
  {productId: 2, orderId: 7, quantity: 1},
  {productId: 3, orderId: 7, quantity: 1},
  {productId: 4, orderId: 8, quantity: 7},
  {productId: 5, orderId: 9, quantity: 1},
  {productId: 6, orderId: 10, quantity: 1},
  {productId: 7, orderId: 11, quantity: 1},
  {productId: 8, orderId: 12, quantity: 1}
]

const seedData = () =>
  Promise.all(categories.map(category =>
    Category.create(category))
  )
.then(() =>
  Promise.all(products.map(product =>
    Product.create(product))
))
.then(() =>
Promise.all(productCat.map(pc =>
  ProductCategory.create(pc))
))
.then(() =>
Promise.all(users.map(user =>
  User.create(user))
))
.then(() =>
Promise.all(reviews.map(review =>
  Review.create(review))
))
.then(() =>
Promise.all(orders.map(order =>
  Order.create(order))
))
.then(() =>
Promise.all(productOrder.map(po =>
  ProductOrder.create(po))
));

const runSeed = () => {
db.sync({ force: true })
  .then(() => {
    console.log('DB Seeding Ran!');
    return seedData();
  })
  .catch(err => {
    console.log('Seed error', err);
  })
  .then(() => {
    db.close();
    return null;
  });
};

runSeed();
