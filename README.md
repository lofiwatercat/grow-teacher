# Welcome to grow-teacher

Teachers in public schools need to use their personal finances to make up for the lack of school materials that their students need. It's not right. Although just a stop gap for this issue, [Grow teacher](https://grow-teacher-reactivate-5c018895843f.herokuapp.com/) allows teachers to create posts with a funding goal and equipment checklist. Parents can either make a direct donation or pick up the supplies and give them directly to the teacher, checking that item off from the post adding to the funding goal.
# Technologies

[Grow teacher](https://grow-teacher-reactivate-5c018895843f.herokuapp.com/) is built using the MERN stack. The MERN stack uses:
* Backend: MongoDB, ExpressJS, NodeJS
* Frontend: React, Redux
* Hosting & Server: AWS S3 & Heroku

# features
### User Auth
* Visitors can sign up to be a user or login as a demo user
* Most pages can only be accessed when logged in, or when logged out
* Login errors will display

![](https://github.com/loFiWaterCat/grow-teacher/blob/readme/images/Screen-Recording-2022-10-09-at-9.gif)

### Create, Read, Update, and Delete Post
* Logged in users can create posts with images
* Images attached by a user are saved to the database and stored in an AWS S3 bucket
* All posts are displayed on the post index page and posts created by the logged in user display update and delete options on the post show page

![](https://github.com/loFiWaterCat/grow-teacher/blob/readme/images/ezgif.com-gif-maker.gif)

### Create, Read, Update, and Delete Comment
* Logged in users can comment on posts
* Comments created by the logged in user have update and delete option

### Search Bar
Users can search for posts based on title or username. It was a challenge to add a filter that worked properly with our schema.

![](https://github.com/loFiWaterCat/grow-teacher/blob/main/frontend/src/assets/images/search-code.png)

### Progress Bar
Items' status will contribute to the funding goal of a post. Making the use effect not launch on first render cut down on unnecessary requests.

![](https://github.com/loFiWaterCat/grow-teacher/blob/main/frontend/src/assets/images/progress-bar-code.png)

# Contributors
* [Alan Tran-Kiem](https://github.com/loFiWaterCat) - Team Lead
* [Zuzu Chaoui](https://github.com/zoumus) - Backend Lead
* [Derek Li](https://github.com/deli123) - Frontend Lead

# Future Features
* Upload profile picture
* Implement Replies and Likes CRUD

