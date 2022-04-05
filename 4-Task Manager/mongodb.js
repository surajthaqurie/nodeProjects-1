/*********************************
 * CRUD
 * @ C: create
 * @ R: Read
 * @ U: Update
 * @ D: Delete 
*/

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb');


/*********************************************** 
// Generate the own mongodb-ID

 // new is options because Mongodb library has a little defensive programming built in to add.
 // But in general a good idea to add it in ourselves
const id = new ObjectId();
console.log(id);    // new ObjectId("62470eba30231d83f47d6609")
console.log(id.getTimestamp());  // 2022-04-01T14:39:54.000Z
console.log(id.id.length); // 12
console.log(id.toHexString()); // 62470eba30231d83f47d6609
console.log(id.toHexString().length); // 24 
*/




// localhost has known to cause some really strange issues where it slows down our application.
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to Database!');
    }
    // console.log('Connected Correctly!');

    const db = client.db(databaseName);

    /************************************************
    // @ insertOne    
   
        db.collection('users').insertOne({
            // _id: id,
            name: 'Vikram',
            age: 26
        }, (error, result) => {
            if (error) {
                return console.log('Unable to insert user');
            }
            // ops: This contains all the documents that were inserted
            // console.log(result.ops);
            console.log(result);
        });
    
     */

    /************************************************ 
    //  @ insertBulk : In Array
    
        db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        },
        {
            name: 'Gunther',
            age: 27
        }

    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents!');
        }
        console.log(result);
    });
    */

    /**************************************************
    // Challenge: Insert 3 task into a new task collection
    
    //    1. Use insertMany to insert the documents
    //         - description (string), completed (boolean)
    //    2. Setup the callback to handle error or print ops
    //    3. Run the script
    //    4. Refresh the database in Mongo Compass and view data in task collection
   
    db.collection('tasks').insertMany([
            {
                description: 'Read a book',
                completed: false
            },
            {
                description: 'Send mail to the boss',
                completed: true
            },
            {
                description: 'Complete the course',
                completed: false
            }
        ], (error, result) => {
            if (error) {
                return console.log('Unable to insert documents!');
            }
    
            console.log(result);
        });
    */


    /*************************************************
      // @ findOne: if found it returns first one
  
      db.collection('users').findOne({ _id: new ObjectId("62470dcca71caf9d60da57b7") }, (error, user) => {
          if (error) {
              return console.log('Unable to fetch');
          }
          console.log(user);
      });
    */

    /**************************************************
    // @ find: if found, returns value is actually a cursor 
    // @ cursor is not the data, it is a pointer to that data in the database 
    // @ toArray: is going to allow us to get back an array of documents 
    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(users);
    });
 
    db.collection('users').countDocuments({ age: 27 }, (error, users) => {
        console.log(users);
    });
    */

    /**************************************************
        // Challenge: Use find and findOne with tasks
        
        //    1. Use findOne to fetch the last task by its id (print doc to console)
        //    2. Use find to fetch all tasks that are not completed (print docs to console)
        //    3. Test your work!
    
    db.collection('tasks').findOne({ _id: new ObjectId("62470afd68db1cfcbe933c45") }, (error, task) => {
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(task);
    });

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(tasks);
    });
    */

    /*************************************************
     // @ updateOne: if found it update first one
 
    db.collection('users').updateOne({
        _id: new ObjectId("624704f46bfa54280608f469")
    }, {
        $set: {  // this operator allows us to set new values for the fields on our document
            name: 'Mike'
        }
    })
        .then((user) => {
            console.log(user);
        }).catch((error) => {
            console.log(error);
        });

    db.collection('users').updateOne({
        _id: new ObjectId("624704f46bfa54280608f469")
    }, {
        $inc: {
            age: 1
        }
    })
        .then((user) => {
            console.log(user);
        }).catch((error) => {
            console.log(error);
        });
   */

    /**************************************************
    // Challenge: Use updateMany to complete all tasks
    
    //    1. Check the documentation for updateMany
    //    2. Setup the call with the query and the updates
    //    3. Use promise methods to setup the success/error handlers
    //    4. Test your work!
 


    db.collection('tasks').updateMany({
        completed: false

    }, {
        $set: {
            address: true
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);

    });
   */

    /*************************************************
     // @ deleteMany

    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result);

    }).catch((error) => {
        console.log(error);

    });
    */

    /**************************************************
    // Challenge: Use deleteOne to remove a task
        
    //    1. Grab the description for the task you want to remove
    //    2. Setup the call with the query
    //    3. Use promise methods to setup the success/error handlers
    //    4. Test your work!
    

    db.collection('tasks').deleteOne({
        description: 'Read a book'
    }).then((result) => {
        console.log(result);

    }).catch((error) => {
        console.log(error);

    });
    */

});


