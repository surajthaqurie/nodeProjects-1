### MongoDB and Promise (Task App)

**mongodb native driver**

- CRUD

  - C: Create
  - R: Read
  - U: Update
  - D: Delete

  **Create**

  post()

  - insertOne()
  - insertMany()

  **Read**

  get()

  - findOne()
  - find() / find({})
  - countDocuments()

  **Update**

  put()

  - updateOne()

    - $set: this operator(modifier) allows us to set new values for the fields on our document
    - $inc: Increments the value of the field by the specified amount

  - updateMany()
    - $set

  **Delete**

delete()

- deleteOne()
- deleteMany()

`remove() is deprecated`

---

### REST APIs and Mongoose

### RESTful APIs

- Representational State Transfer - Application Programming Interface

**API**

- An API is nothing more than a set of tools that allow you to build software applications.

**REST**

- The rest API allows clients such as a Web application to access and manipulate resources using a set of predefine operations.

  - resources: something like a user or a task
  - predefine operations: CRUD

- So these predefine operations are going to allow a client like Web app to go through the process of creating a frontend.

- Representational: getting and working with representations of our data. So the data is stored in the database.

- State Transfer: The server, it's stateless. The state has been transferred from the server to the client

So each request from the client, such as a request from a web application, contains everything needed for the server to actually process that request.

`The requests are going to be made via HTTP requests.`

### Mongoose: [https://mongoosejs.com/docs/guide.html]

- For modeling the data of database
- Mongoose uses the Mongodb module behind the scenes

**Create**

post()

- .save();

**Read**

get()

- find({}) / find()
- findById()
- findOne(): for query multiple filed

**Update**

patch(): patch the http method which is design for updating an existing resources

- findByIdAndUpdate()

**Delete**

delete()

- findByIdAndDelete()
- .delete()
- findOneAndDelete(): for query multiple filed
- deleteMany()

---

**API Authentication And Security**

**Sorting, Pagination and Filtering**

**File Upload (multer)**

- Handle Express Errors

- Serving up files

- Auto-Cropping and Image Formatting (sharp)

**Sending Emails (sendGrid)**

**Environment Variables (env-cmd)**

- To do with security
- To do with customized ability

---

**Testing**

Why test?

- Saves time
- Creates reliable software
- Gives Flexibility to developer
  - Refactoring
  - Collaborating
  - Profiling
- Peace of mind

**SuperTest**

- HTTP assertions made easy via superagent.

**Jest**

Testing framework

Jest Setup and Teardown (life cycle)

- beforeEach()
- afterEach()
- beforeAll()
- afterAll()

Mocking Libraries

- To figure out to mocking NPM modules
- The process of mocking is the process of replacing the real function that run with functions with you create when we're running in a test environment.

- Folder name: `_mocks__`

---

```
"scripts": {
  // jest: automatically watches all .test file
  // --watchAll: similar as nodemon
  // --runInBand: run test in series, no overlap or chance of conflict
   "test": "jest --watchAll --runInBand"
  },
// Jest config: to setup testEnvironment
"jest": {
    "testEnvironment": "node"
},
```

---

```
Note: convert binary image data to actual image in html
<img src="data:image/jpg;base64,binary_data>

Google dns: 8.8.8.8, 8.8.4.4
```
