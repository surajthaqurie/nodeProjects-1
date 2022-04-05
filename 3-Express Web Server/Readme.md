### Web Server with Express.js (Weather App)

- Routes with data
- Statice web pages
- Dynamic pages with handlebars template(hbs)
- Accessing API from Browser

`nodemon src/app.js -e js,hbs`

**Fetch API (fetch())**:

- Fetch is not part of Javascript. It is a browser based API, which means it's something we can use in all modern browsers
- But it's not accessible in Node.js

**Version Controlling With Git (https://git-scm.com/)**

- A version control allows you to manage the versions of your application over time.

- We can create what are essentially save points along the way for the various versions of our application.

- Revert back to a previous working state of your application. The only version of the project you have is the broken one.

```
git init: initialize git in our project.

    - It has created a new folder '.git', this is where it stores everything that makes up your
      git project.

    - So as we add new files and create new commits, those are going to end up getting stored in
     data structures inside of '.get' this directory is not something we're going to manage
     ourselves.

git status:

    - This is the git command, get status prints, the current status of our setup.

    - We haven't created a commit command, nothing is being tracked.


.gitignore file: it ignores what we want don't wants to track

git add:

    - To add things to that (staging area: they're ready to committed) right here that is 
      get add.

    - git add . : adds every things
    - git add src : only adds src folder

git commit:

    - We have to provide a message with each commit describing what exactly changed or added to
      the project.

    - We do that providing the M flag, followed by our message inside of quotes.

git remote:

    - to show all the remotes.

```

**Setting up SSH Keys**

- SSH stands for Secure Shell and it gives us a means of security communicating with another
  machine

```
ls -a -l ~/.ssh

    ls: list all the files
    -a: makes sure that even hidden files and folder show up
    -l: make the format a bit easier for us to read
    ~/.ssh: Path to folder of which we are trying to print its contents

    ~/: shortcut for your user directory(root)
    .ssh: name of directory

If there is no file in .ssh directory then create new one.

 ssh-keygen -t rsa -b 4096 -C "surajchan68@gmail.com"

 ssh-keygen: Which is going to allow us to generate ssh key pair
 -t: stands for type.

 rsa: There are various protocols we can use, we will be using the very popular and very
 secure RSA protocol.

 -b: stands for bits, we want to specify how many bits for this key

 4096: Most common value

 -C: The last key is Capital c, where we can provide a comment for the key, which you can
 think of as a model and it's common to just use your email address inside of here.

then 'enter' for Enter file in which to save the key : for default
then 'enter' for Enter passphrase: for no passphrase

Now we have to files,

id_rsa: it is secret file, which we're going to keep on our machine and we're never going 
        to share with anyone.

id_rsa.pub: It is a public file and this is something we're going to share with both GitHub
    and Heroku, so can secure the communication between our machine and their servers.

eval "$(ssh-agent -s)":
    - To make sure the program is running
    - It's going to try to start up SSH agent
    - If it's already running, it's going to simply tell us that by printing the process
    ID: Agent pid 23221


ssh-add ~/.ssh/id_rsa: register the private file

ssh -T git@github.com: this is going to test ssh connection to the Github servers

```

**Deployment In Heroku**

```
heroku keys:add
    - it's going to look through our .ssh directory and ask us which keys we want to upload

heroku create weather-application-001
    - Creating heroku application
    - We have to run root of our project
    - then give unique name of application otherwise heroku gives random name

Then it gives two url
    - first heroku app url, this is live url for the app.
    - second heroku git repository.

In order for Heroku to start up our application, we have to tell it which file to run.

So we're specifying the start scrip, telling Heroku how to start up our app and the value is the
command to run in "package.json"

Heroku is going to provide us with a port value that we have to use when our app is 
running on heroku.

Setting up url for heroku (Removing localhost:3000).

Git push -u heroku main/master:
    - To deploy, this is going to push our latest commits up to heroku git remote.

```
