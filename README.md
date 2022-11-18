## Linkedin profiles:
Yago: https://www.linkedin.com/in/yago-ponce-8a7807255/
Helena: https://www.linkedin.com/in/helena-saborit-bolea-5b6444b9/

Whatcha Cookin' app

Description
This is an social web app where you can create recipes, search for recipes by ingredients, as well as add friends and view their recipes

As a anon you can
Signup with username, email and password
Home page, with a Random recipe and link to:
Recipe searh -> to find different recipes by name
Users search -> to find other users
¿Que tienes en tu nevera? -> to find recipes with 1, 2 or 3 ingredients

As USER you can
Login with email and password
    Recipe searh -> to find different recipes by name
        Recipe Details -> to see all details of one recipe
            Comment -> you can comment every recipe, and delete your comments
    Users search -> to find other users
        Add/Delete -> to add or delete a user as a friend
        User profile -> to see the users profile details
    ¿Que tienes en tu nevera? -> to find recipes with 1, 2 or 3 ingredients 
Logout to close yous session

Client / Frontend
React Router Routes (React App)


## React Router Routes (React App)
| Path                      | Component                      | Permissions  | Behavior                                                     |
| ------------------------- | --------------------           | -----------  | ------------------------------------------------------------ |
| `/`                       | HomePage                       | public `<Route>`            | Home page                                        |
| `/signup`                 | SignupPage                     | public  `<Route>`    | Signup form
| `/login`                  | LoginPage                      | public  `<Route>`     | Login form navigate to user profile after validate crdentials       |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout                             |
| `/find-friends`           | NavBar (Friends), HomePage     | public   `<Route>`  | Shows a list of all users, and a form to search by name               |
| `/recipes-list`           | RecipeList     | public   `<Route>`   | Shows a list of all recipes, and a form to search by name            |
| `/recipes/:recipeId/details`| RecipeDetails Page          | user only `<PrivateRoute>`  | Shows one recipe details and the relacionate ments                                  |
| `/recipe-add`             | RecipeAdd                     | user only  `<PrivateRoute>` | Form to add recipes                                           |
| `/recipes/:recipeId/edit` | EditRecipe                    | user only `<PrivateRoute>`  | Edit your own recipe s                                    |
| `/profile/my-profile`           | MyProfile      | user only `<PrivateRoute>`  | Show own profile added                                     |
| `/profile/:profileId/edit`                | ProfileEdit                    | user only `<PrivateRoute>`  | Edit your own profile                                 |
| `/profile/:userId/details` | FriendProfile                | user only  `<PrivateRoute>` | Check others profile                           |
| `/error`              | Error          | public  `<Route>` | Shows error page                                |
| `/not-found`             | NotFound              |public  `<Route>` | Shows not found error page                                      |

Services
Auth Service

auth.login(user)
auth.signup(user)
auth.logout()
auth.me()
Backlog Service

backlog.filter(type, status) // for different types of media and if they are done or not
backlog.detail(id)
backlog.add(id)
backlog.delete(id)
backlog.update(id)
External API

Server / Backend
Models
User model
{
    username: {type: String, required: true,},
    role: {type: String, default: "user"},
    description: String,
    image: {type: String, default:"https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/AvatarDefault_gdhinf.png" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, },
    password: {type: String, required: true},
    tag: [ { type: String, enum: tag} ],
    friends: [ { type: Schema.Types.ObjectId,ref: "User", default: [] }],
    favourites: [ {type: Schema.Types.ObjectId,ref: "Recipe"}],
  },
  {
    timestamps: true,
  }
);

Comment model
  username: {type: Schema.Types.ObjectId, ref: "User"}, 
  recipe: {type: Schema.Types.ObjectId, ref: "Recipe", type: String },
  comment: String,});

Recipe model
  name: {type: String,required: true},
  tag: [ {type: String, enum: tag}],
  createdBy: { type: Schema.Types.ObjectId,ref: "User",},
  description: String, steps: String, 
  image: {type: String, default:"https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/RecetaDefault_lxygod.png",},
  typeOfFood: [{type: String, enum: typeOfFood, }],
  ingredients: String,
});


API Endpoints (backend routes)





## API Endpoints (backend routes)
CRUD OF PROFILE ROUTES
| HTTP Method | URL                                   | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------------           | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/api/profile/list    `                |                | 200            | 404          | Search all users information           |
| GET         | `/api/profile/my-profile`             |       | 200            | 404          | Return the logged user information |
| GET         | `/api/profile/:userId/details`                 |          | 200            | 401          | Return one user information    |
| GET         | `/api/profile/search-friend`                |                      | 200            | 400          | Return a list of users by name search                                           |
| PATCH       | `/api/profile/:userId/edit`                 | { username, email, tag, friends, favourites, description }   |                | 400           | Update profile's changes user                                               |
| PATCH       | `/api/profile/:userId/add-friend`   |              |                | 400          | Add users as friend
| PATCH       | `/api/profile/:userId/un-friend/films`              |                              |                |              | Detele user as friend                                           |
| DELETE      | `/api/profile/:userId/delete-profile`              |                              |                |              | delete profile user                                         |
| GET         | `api/profile/friends`                        |                              | 200            | 400          | Return information of all friends of one user                                       |
| GET         | `api/profile/my-fav-recipes`                 |                              | 200            | 400          | Return information of all favourites recipes of the user logged                                                |
| GET         | `/api/profile/:friendId/fav-recipes`                 |                              | 200            | 400          | Return information of all favourites recipes of the other users                                            |
| GET         | `/api/profile/tag`                |                              |                | 400          | Shows tags of recipes                                        |

CRUD OF RECIPES ROUTES
| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/api/recipes/random-recipe`      |                | 200            | 404          | shows one random recipeinformation           |
| GET        | `/api/recipes/recipes-list`                |       | 200            | 404          | shows a list of all recipesinformation |
| GET       | `/api/recipes/:recipeId/details`                 |          | 200            | 401          | shows detailed recipes|
| GET        | `/api/recipes/tag`                |                      | 200            | 400          | shows tag in recipes                                           |
| GET     | `/api/recipes/type-of-food`                 |    |                | 400          | shows typeOfFood in recipes                                               |
| PATCH        | `/api/recipes/:recipeId/edit`   | { name, tag, description, steps, typeOfFood, ingredients }             |                | 400          | Edit specific recipe
| POST        | `/api/recipes/create`             |                              |                |              | receives details from new recipe in FE and creates new recipe in DB                                           |
| DELETE         | `/api/recipes/:recipeId/delete`              |                              |                |              | delete specific recipe                                         |
| PATCH         | `/api/recipes/:recipeId/fav-recipe`                        |                              | 200            | 400          | Add recipe to fav                                       |
| PATCH         | `/api/recipes/:recipeId/delete-fav`                 |                              | 200            | 400          | Remove recipe from fav                                                |
| GET     | `/api/recipes/:recipeId/ingredients`                 |                              | 200            | 400          |  Populate the ingredients of one recipe                                            |                                       |
| GET         | `api/recipes/ingredients-list`                |                              |                | 400          | Shows a list of all recipes by ingredients


CRUD OF COMMENT ROUTES
| HTTP Method | URL                                   | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------------           | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST       | `/api/comment/:recipeId/create`                | { comment }               | 200            | 404          | Receives details from new comment in FE and creates new comment in DB           |
| GET         | `/api/comment/recipes-list`             |       | 200            | 404          | Shows a list of all recipes name + image + tags |
| DELETE        | `//api/comment/:commentId/delete`                 |          | 200            | 401          | Delete specific comment    |


CRUD OF ADMIN ROUTES
| HTTP Method | URL                                   | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------------           | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| PATCH        | `/api/admin/profile/:userId/edit`                | { username, role, image, email, tag }               | 200            | 404          | Edits and updates any profile          |
| DELETE         | `/api/admin/profile/:userId/delete-profile`             |       | 200            | 404          | Return the logged user information |
| PATCH         | `/api/admin/recipes/:recipeId/edit`                 |          | 200            | 401          | Return one user information    |
| GET         | `/api/profile/search-friend`                |                      | 200            | 400          | Return a list of users by name search                                           |
| PATCH       | `/api/profile/:userId/edit`                 | { username, email, tag, friends, favourites, description }   |                | 400           | Update profile's changes user                                               |
| PATCH       | `/api/profile/:userId/add-friend`   |              |                | 400          | Add users as friend
| PATCH       | `/api/profile/:userId/un-friend/films`              |                              |                |              | Detele user as friend                                           |
| DELETE      | `/api/profile/:userId/delete-profile`              |                              |                |              | delete profile user                                         |
| GET         | `api/profile/friends`                        |                              | 200            | 400          | Return information of all friends of one user                                       |
| GET         | `api/profile/my-fav-recipes`                 |                              | 200            | 400          | Return information of all favourites recipes of the user logged                                                |
| GET         | `/api/profile/:friendId/fav-recipes`                 |                              | 200            | 400          | Return information of all favourites recipes of the other users                                            |
| GET         | `/api/profile/tag`                |                              |                | 400          | Shows tags of recipes                                        |



Links

Git
The url to your repository and to your deployed project

Client repository Link
https://github.com/Helsinky91/whatcha-cookin-app-client

Server repository Link
https://github.com/Helsinky91/whatcha-cookin-app-server

Deployed App Link
https://whatcha-cookin.netlify.app/

Slides
https://docs.google.com/presentation/d/17JehB2dCu1F7wqTj_kxrSB1O9_WkHzdaXs_K1hlDfMo/edit#slide=id.p

