const greeter = (name = 'user', age) => {
    console.log('Hello ' + name);
}

greeter('Andrew');

greeter();



const product = {
    label: 'Red notebook',
    stock: 201
}

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock);
};

// transaction('order', product);
transaction('order'); // order undefined 0