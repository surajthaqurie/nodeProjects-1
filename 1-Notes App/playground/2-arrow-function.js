// const square = function (x) {
//     return x * x;
// }

/******************************************************** 
@ Arrow Function : Don't bind their own "this" value
*/

// const square = (x) => {
//     return x * x;
// }

// const square = (x) => x * x;


// console.log(square(3));


// const event = {
//     name: 'Birthday Party',
//     printGuestList: function () {
//         console.log('Guest list for ' + this.name);
//     }
// }

// const event = {
//     name: 'Birthday Party',
//     printGuestList: () => {
//         console.log('Guest list for ' + this.name); // undefined
//     }
// }


// ES6 Method definition
// const event = {
//     name: 'Birthday Party',
//     guestList: ['Andrew', 'Jen', 'Mike'],
//     printGuestList() {
//    const that = this;

//         console.log('Guest list for ' + this.name); // Birthday Party

//         this.guestList.forEach(function (guest) {
//             console.log(guest + ' is attending ' + this.name); // undefined
//             console.log(guest + ' is attending ' + that.name);  // old solution
//         });
//     }
// }

const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {

        console.log('Guest list for ' + this.name); // Birthday Party

        this.guestList.forEach((guest) => { // new solution: using arrow
            console.log(guest + ' is attending ' + this.name);

        });
    }
}


event.printGuestList();