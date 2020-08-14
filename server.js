const { ApolloServer, gql } = require("apollo-server");

const todos = [
  { task: "Task 1", completed: false },
  { task: "Task 2", completed: true },
];

// The GraphQL schema
const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }
  type Query {
    getTodos: [Todo]
  }
  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getTodos: () => todos,
  },
  Mutation: {
    addTodo: (_, { task, completed }) => {
      const todo = { task: task, completed: completed };
      todos.push(todo);
      return todo;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
