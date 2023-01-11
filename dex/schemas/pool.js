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
      name: "PoolAddress",
      title: "pooladdress",
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
    defineField({
      name: "LpAddress",
      title: "lpaddress",
      type: "string",
    }),
    defineField({
      name: "TokenReserve",
      title: "tokenreserve",
      type: "string",
    }),
    defineField({
      name: "TokenPair",
      title: "tokenpair",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
