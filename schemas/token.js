import { defineField, defineType } from "sanity";
export default defineType({
  name: "TokenTable",
  type: "document",
  title: "TokenTable",
  fields: [
    defineField({
      name: "Token",
      title: "token",
      type: "string",
    }),
    defineField({
      name: "TokenId",
      title: "tokenid",
      type: "number",
    }),
    defineField({
      name: "TokenImage",
      title: "tokenimage",
      type: "image",
    }),
    defineField({
      name: "TokenStatus",
      title: "tokenstatus",
      type: "number",
    }),
  ],
});
