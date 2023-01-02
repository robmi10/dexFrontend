import { defineField, defineType } from "sanity";

export default defineType({
  name: "poolTable",
  type: "document",
  title: "PoolTable",
  fields: [
    defineField({
      name: "PoolId",
      title: "poolid",
      type: "number",
    }),
    defineField({
      name: "PoolOwner",
      title: "poolowner",
      type: "string",
    }),
    defineField({
      name: "Token",
      title: "token",
      type: "string",
    }),
    defineField({
      name: "TokenAmount",
      title: "tokenamount",
      type: "string",
    }),
    defineField({
      name: "EthAmount",
      title: "ethamount",
      type: "string",
    }),
  ],
});
