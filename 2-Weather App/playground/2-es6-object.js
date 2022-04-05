/***************************************
 * @ Object property shorthand
*/

const name = 'Andrew';
const userAge = 27;

const user = {
    // name: name,
    name, //  shorthand
    age: userAge,
    location: 'Philadelphia'
}

console.log(user);

/***************************************
 * @ Object destructuring
*/

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    // rating: 4.5
}

// const label = product.label;
// const stock = product.stock;

// const { label } = product;
// const { stock } = product;

// const { label, stock } = product;
const { label: productLabel, stock, rating = 5 } = product;


// console.log(label);
console.log(productLabel); // new name
console.log(stock);
console.log(rating); // default value variable

/***************************************
 * @ Function destructuring
 * @ argument destructuring
 * 
*/

// const transaction = (type, myProduct) => {
//     const { label } = myProduct;
// }

const transaction = (type, { label, stock, rating = 5 }) => {
    console.log(type);
    console.log(label);
    console.log(stock);
    console.log(rating); // default value argument

}


transaction('order', product);