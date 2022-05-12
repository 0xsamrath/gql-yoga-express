# GraphQL Yoga with express.js

This example shows how to implement a *GraphQL Yoga server with express** with the following stack:

- [**Graphql Yoga**](https://github.com/dotansimha/graphql-yoga): GraphqQL API
- **[Express](https://github.com/expressjs/express)**: HTTP server for GraphQL APIs 
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)    
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database



### Table of contents

  * **[Getting started](#getting-started)**
  * **[Using the GQL API](#using-the-gql-api)**
    + **[Queries](#queries)**
      - **[Get all posts and comments](#get-all-posts-and-comments)**
      - **[Get all comments and their corresponding posts](#get-all-comments-and-their-corresponding-posts)**
      - **[Get a post by ID](#get-a-post-by-id)**
      - **[Get all comments for a post](#get-all-comments-for-a-post)**
    + **[Mutations](#mutations)**
      - **[Create a post](#create-a-post)**
      - **[Update a post](#update-a-post)**
      - **[Create a comment](#create-a-comment)**
      - **[Delete post](#delete-post)**
      - **[Delete comment](#delete-comment)**



## Getting started

1. Clone this repository locally
   ```
   git clone https://github.com/0xsamrath/gql-yoga-express
   ```

2. Install the required dependencies
   ```shell
   # with npm
   npm install
   
   # with yarn
   yarn add .
   
   # with pnpm
   pnpm install
   ```

3. Create and seed the database

   Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](https://github.com/prisma/prisma-examples/blob/latest/javascript/graphql-sdl-first/prisma/schema.prisma):

   ```
   npx prisma migrate dev --name init
   ```

   When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](https://github.com/0xsamrath/gql-yoga-express/blob/latest/prisma/seed.js) will be executed and your database will be populated with the sample data.

4. Launch your GraphQL server with this command:

   ```
   npm run dev
   ```

   Navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql) in your browser to explore the API of your GraphQL server in a GraphiQL editor.



## Using the GQL API

The declarative type definitions for queries, mutations and models are present in `./src/definition.ts`. Here are some examples of queries and mutations that are already present in our application

### Queries

#### Get all posts and comments

```graphql
{
  posts {
    id
    title
    content
    createdAt
    updatedAt
    comments {
      id
      content
			createdAt
      updatedAt
      postId
    }
  }
}
```



#### Get all comments and their corresponding posts

```graphql
{
  comments {
    id
    content
    createdAt
    updatedAt
    postId
    post {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
}
```



**NOTE: "cl31yu62h0005gexo2hzx14du" is a dummy ID we're using for posts**

#### Get a post by ID

```graphql
{
    post (id: "cl31yu62h0005gexo2hzx14du") {
      id
      title
      content
      createdAt
      updatedAt
    	comments {
        id
        content
        createdAt
      	updatedAt
      }
    }
}
```



#### Get all comments for a post

```graphql
{
  comments (postId: "cl31yu62h0005gexo2hzx14du" ) {
		id
    content
   	createdAt
		updatedAt
  }
}
```



### Mutations

#### Create a post

```graphql
mutation {
	createPost(title:"Some title", content: "Some lengthy content") {
		id
		updatedAt
		createdAt
	}
}
```

#### Update a post

```graphql
mutation {
	updatePost(id: "cl31yu62h0005gexo2hzx14du", title:"Some title", content: "Some lengthy content") {
		id
		title
		content
   }
}
```

#### Create a comment

```graphql
mutation {
	createComment(content: "Some lengthy content") {
		id
		updatedAt
		createdAt
	}
}
```

#### Delete post

```graphql
mutation {
	deletePost(id: "cl31yu62h0005gexo2hzx14du") {
		id
   }
}
```



#### Delete comment

```graphql
mutation {
	deleteComment(id: "cl31yu62h0005gexo2hzx14du") {
		id
   }
}
```



## Scaling your application further

If you want to add more models and more functionality, you'll need to update your prisma schema, migrate it and then update your application code.

If we wanted to add an author element to all posts, this is how we would do it



#### 1. Update prisma

```diff
// ./prisma/schema.prisma
+model Author {
+  id       Int     @default(autoincrement()) @id
+  bio      String?
+  username String?
+  posts    Post[]
+}

model Post {
  id        String @id @default(cuid())
  title     String
  content   String
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
}
```