# nodeTwitter
a basic node API with the basic functionality of twitter including : accounts,posts, following and liking

=> to make the application work in you computer you have to populate the config2.js file 
   located in the config folder.
   
   ```
   module.exports = {
    PORT:process.env.PORT || 'PORT',
    MONGO_URI:process.env.MONGO_URI || 'MONGO_URI',
    JWT_KEY: process.env.JWT_KEY || 'JWT_KEY'
   }
   ```
   PORT = change this for the default port you want the code to listen ex:3000  
   MONGO_URI = change this to the connectiong string from the mongodb you are using  
   JWT_KEY = change this for the key you want to use to encrypt the passwords  


=> all responses from the api follow the same model:
  ```
  {
    status:
    status_message:
    data:
  }
  ```

  -status: 'ok' or 'error'  
  -status_message: a quick message to summarize the response. ex: 'error creating new user'  
  -data: the data of the response usually in JSON format   

=> End Points 

Base URL:

the base url for all others is 

http://localhost:PORT/api

-------------------------------------------
Title: Get own account

URL: /account

Method: GET

Authentication: jwt 

URL params:

Body Params:

Reponse:
```
{
    "status": "ok",
    "status_message": "user that made the request identified",
    "data": {
        "posts": [],
        "following": [],
        "followers": [],
        "_id": "5c12fa398305ff130313ccc4",
        "username": "arthur",
        "password": "$2a$10$Sfd60YSXFVb0qB4TArBxB.rOAGKm0osdN8a4V.a/GptOhEWa5Pb7C",
        "__v": 0
    }
}
```

-------------------------------------------
-------------------------------------------
Title: Signup

URL: /account/signup

Method: POST

Authentication:  

URL params:

Body Params:
```
{
   "username":"example"
   "password":"123"
}
```

Reponse:
```
{
    "status": "ok",
    "status_message": "account created",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmYWVrdHdpdHRlciIsInN1YiI6IjVjMTMwNjhkOGI5MGZmMTg1ZWZkNDViYyIsImlhdCI6MTU0NDc1MDczNDQwMywiZXhwIjoxNTQ0ODM3MTM0NDAzfQ.27jsOkws5hAGmiuHNId6x7CeXphD8mVMHqfeBzKeTqc"   
}
```
! the data is the jwt

-------------------------------------------
-------------------------------------------
Title: Signin

URL: /account/signin

Method: POST

Authentication:  

URL params:

Body Params:
```
{
   "username":"example"
   "password":"123"
}
```

Reponse:
```
{
    "status": "ok",
    "status_message": "account authenticated",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmYWVrdHdpdHRlciIsInN1YiI6IjVjMTMwNjhkOGI5MGZmMTg1ZWZkNDViYyIsImlhdCI6MTU0NDc1MDgwNjY4OCwiZXhwIjoxNTQ0ODM3MjA2Njg4fQ.KvpDiPdXN3g0XIFSloDT5LgxzT-pXSeUN1M5D7SWcJ8"
}
```
! the data is the jwt

-------------------------------------------
-------------------------------------------
Title: test authentication 

URL: /account/test

Method: GET

Authentication:  jwt

URL params:

Body Params:

Reponse:
```
{
    "status": "ok",
    "status_message": "authenticated",
    "data": null
}
```

-------------------------------------------
-------------------------------------------
Title: create new post

URL: /post

Method: POST

Authentication:  jwt

URL params:

Body Params:
```
{
	"text":"testestes"
}
```

Reponse:
```
{
    "status": "ok",
    "status_message": "post created sucessfuly",
    "data": {
        "date": "2018-12-14T01:30:37.710Z",
        "text": "testestes",
        "author": "5c13068d8b90ff185efd45bc",
        "likes": []
    }
}
```

-------------------------------------------
-------------------------------------------
Title: get all posts of a user

URL: /post/:id

Method: GET

Authentication:  

URL params:
```
:id = 2121232234reejee //user id 
```

Body Params:

Reponse:
```
{
    "status": "ok",
    "status_message": "posts retrieved from user",
    "data": [
        {
            "date": "2018-12-13T23:29:20.817Z",
            "text": "hello my test",
            "author": "5c12eaf0d4c95c0955d23bf9",
            "likes": []
        }
    ]
}
```

-------------------------------------------
-------------------------------------------
Title: edit one post

URL: /post/:id

Method: PUT

Authentication:  jwt 

URL params:
```
:id = 3 //index of the post
```

Body Params:
```
{
	"text":"testestes2"
}
```

Reponse:
```
{
    "status": "ok",
    "status_message": "post edited",
    "data": {
        "date": "2018-12-14T01:30:37.710Z",
        "text": "testestes2",
        "author": "5c13068d8b90ff185efd45bc",
        "likes": []
    }
}
```

-------------------------------------------
-------------------------------------------
Title: delete one post

URL: /post/:id

Method: DELETE

Authentication:  jwt 

URL params:
```
:id = 3 //index of the post
```

Body Params:

Reponse:
```
{
    "status": "ok",
    "status_message": "post deleted",
    "data": null
}
```

-------------------------------------------
-------------------------------------------
Title: get one post

URL: /post/:id/:index

Method:GET

Authentication:  

URL params:
```
:id = e93290432432u93040ri4r //id of the user
:index = 3//index of the post
```

Body Params:

Reponse:
```
{
    "status": "ok",
    "status_message": "post retrieved from user",
    "data": {
        "date": "2018-12-13T23:29:20.817Z",
        "text": "hello my test",
        "author": "5c12eaf0d4c95c0955d23bf9",
        "likes": []
    }
}
```

-------------------------------------------
-------------------------------------------
Title: get followers

URL: /post/follow

Method: GET

Authentication: jwt 

URL params:

Body Params:

Reponse:
```
{
    "status": "ok",
    "status_message": "following retrived",
    "data": []
}
```

-------------------------------------------
-------------------------------------------
Title: follow

URL: /post/follow

Method: POST

Authentication: jwt 

URL params:

Body Params:
```
{
	"id":"5c12eaf0d4c95c0955d23bf9"
}
```

Reponse:
```
{
    "status": "ok",
    "status_message": "following new account",
    "data": {
        "following": 1
    }
}
```

!following is the new number of followers

-------------------------------------------
-------------------------------------------
Title: unfollow

URL: /post/follow

Method: DELETE

Authentication: jwt 

URL params:

Body Params:
```
{
	"id":"5c12eaf0d4c95c0955d23bf9"
}
```

Reponse:
```
{
    "status": "ok",
    "status_message": "unfollowed",
    "data": null
}
```


-------------------------------------------
-------------------------------------------
Title: like a post 

URL: /post/:id/:index/like

Method: POST

Authentication: jwt 

URL params:

Body Params:

Reponse:
```
{
    "status": "ok",
    "status_message": "post liked",
    "data": null
}
```


-------------------------------------------
-------------------------------------------
Title: dislike a post 

URL: /post/:id/:index/like

Method: DELETE

Authentication: jwt 

URL params:

Body Params:

Reponse:
```
{
    "status": "ok",
    "status_message": "post disliked",
    "data": null
}
```


-------------------------------------------




