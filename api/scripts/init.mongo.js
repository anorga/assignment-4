/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

     db.products.remove({});
     db.counters.remove({});
     
     const productsDB = [
       {
         id: 1,
         productName: 'All Saints Jacket',
         price: 299,
         category: 'Jacket',
         image: 'https://images.app.goo.gl/7RfsZTYvou19dH9h8',
       },
       {
         id: 2,
         productName: "Levi's Jeans",
         price: 80,
         category: 'Jeans',
         image: 'https://images.app.goo.gl/4ttGud2gy4v7NVzh9',
       },
       {
         id: 3,
         productName: "Cotton Sweater",
         price: 30,
         category: 'Sweaters',
         image: 'https://images.app.goo.gl/Gbd4JdrnGrNDkzrU8',
       },
     ];
     
     db.products.insertMany(productsDB);
     const count = db.products.count();
     print('Inserted', count, 'products');
     db.counters.remove({ _id: 'products' });
     db.counters.insert({ _id: 'products', current: count });
     db.products.createIndex({ id: 1 }, { unique: true });
     db.products.createIndex({ status: 1 });
     db.products.createIndex({ owner: 1 });
     db.products.createIndex({ created: 1 });