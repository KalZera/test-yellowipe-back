## functional Requirements
  - [x] the user should be register yourself;
  - [x] the user should be authenticate;
  - [x] the user should be show your feed;
  - [x] the user should be add a post in your feed;
  - [-] the user should be follow other user (optional);
  - [x] the user should be able to edit your post;
  - [x] the post should be only in text;
  - [-] the post could have images (optional);

## non-functional Requirements
  - [-] the user will be registered on clerk platform;
  - [x] the post will be saved in a postgreSQL database;
  - [x] the information will be saved using prisma;
  - [x] the user should be authenticated with JWT Token;

## business rules 
  - [x] users can not edit posts from another user;
  - [x] users should not be able to register with same email;
  - [x] users should not be create an empty post
  - [x] users should not be update a post with other author
  - [x] users should not be update a post with new empty value
  - [x] users should be view a list of posts
  
