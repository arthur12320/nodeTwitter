# nodeTwitter
a basic node API with the basic functionality of twitter including : accounts,posts, following and liking

=> to make the application work in you computer you have to populate the config2.js file 
   located in the config folder.
   
   ```
   module.exports = {
    PORT:process.env.PORT || '<PORT>',
    MONGO_URI:process.env.MONGO_URI || '<MONGO_URI>',
    JWT_KEY: process.env.JWT_KEY || '<JWT_KEY>'
   }
   ```
   
   <PORT> = change this for the default port you want the code to listen ex:3000  
   <MONGO_URI> = change this to the connectiong string from the mongodb you are using  
   <JWT_KEY> = change this for the key you want to use to encrypt the passwords  


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


