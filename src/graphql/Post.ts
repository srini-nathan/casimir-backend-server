import { enumType, inputObjectType, objectType } from 'nexus'

export const Post = objectType({
  name: "Post",
  description: 'This is a description of a Post',
  definition(t) {
    t.nonNull.id("id")
    t.nonNull.string("uuid")
    t.nonNull.field("author", { type: "User" })
  }
})

export const CreatePostInput = inputObjectType({
  name: "CreatePostInput",
  definition(t) {
    t.nonNull.string("name")
    t.nonNull.id("author")
  }
});

export const PostFilters = inputObjectType({
  name: "PostFilters",
  definition(t) {
    t.nonNull.field("order", { type: "OrderEnum" })
    t.string("search")
  }
});

export const OrderEnum = enumType({
  name: "OrderEnum",
  members: ['ASC','DESC'],
});