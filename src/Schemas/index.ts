import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { UserType } from "./TypeDefs/UserType";

import usersList from "./../../MOCK_DATA.json";

import { IUser } from "../IUser";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return usersList;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, { firstName, lastName, email, password }: IUser) {
        const user = {
          id: usersList.length + 1,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };

        usersList.push(user);

        return user;
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation });
