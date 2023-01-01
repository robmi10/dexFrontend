import { defineField, defineType } from "sanity";
export default defineType({
  name: "liquidityTable",
  type: "document",
  title: "LiquidityTable",
  fields: [
    defineField({
      name: "LiquidityOwner",
      title: "liquidityowner",
      type: "string",
    }),
    defineField({
      name: "LiquidityId",
      title: "liquidityid",
      type: "string",
    }),
    defineField({
      name: "Token",
      title: "token",
      type: "string",
    }),
    defineField({
      name: "Amount",
      title: "amount",
      type: "string",
    }),
  ],
});
