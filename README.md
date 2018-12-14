# nodeTwitter
a basic node API with the basic functionality of twitter including : accounts,posts, following and liking

all responses from the api follow the same model:

{
  status:
  status_message:
  data:
}

-status: 'ok' or 'error'
-status_message: a quick message to summarize the response. ex: 'error creating new user'
-data: the data of the response usually in JSON format 


