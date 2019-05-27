# Trainee courses API  :coffee:

Let's go to practice a little!

The following project consists in building a simple web service for practice the concepts that you have saw as part of the trainee program.

## Requirements

#### Entities

1. Two entities **Users** and **Courses**.
2. The users must contain an identifier (email), a role, a password (must be encrypted) and a unique course id.
3. The roles for the user are _user_ and _admin_
4. The course must have a name.

#### Bussiness rules

1. Only the **admin** can create, edit, and delete users of any kind.
2. Only the **admin** can create, edit and delete courses.
3. The normal users can see a list of the users that are in the same course.

#### Security

1. Users of a any kind must be logged to do any request.
2. The service implement JWT (**hint**: middleware validation).

#### Extra

1. Should be an endpoint where you can access to the course info of a specific user:

```
GET /users/1/courses -> user with id 1 course info
```

2. Should be an endpoint where you can add many users in one request:

```
POST /users
```

Design of the API endpoint including paths, structure, and format is up to you. Decisions on how to structure the code and what frameworks to use are up to you as well.

## Git flow

There is a project called **trainee-courses-api** in the Ksquare github, inside this you are going to find a branch with your name with the `develop` prefix, e.g `develop/jessica`. That's the destination branch of your PR's.

In ksquare we love the git flow, so please, check it out, and follow it.

#### Pull Requests

Lets implement a PR's system where after you complete each one of the tasks listed below, you make a request for a code review and merge code with your develop branch.

##### Tasks

1. Do Courses API.
2. Do Users API.
3. Implement login.
4. Implement JWT.
5. Implement Middleware validation

## Need help?

If you are having difficulties getting started, confused about the project, or stuck trying to solve a problem, just send us a message in slack or open a issue in the project with the following format: **[Your-name][issue-name]**

## Happy coding! :smile:
