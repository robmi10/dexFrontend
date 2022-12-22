export const liquiditySchema = {
  name: "liquidityTable",
  type: "document",
  title: "LiquidityTable",
  fields: [
    {
      name: "LiquidityId",
      title: "liquidityid",
      type: "string",
    },

    {
      name: "LiquidityOwner",
      title: "liquidityowner",
      type: "string",
    },
    {
      name: "Token",
      title: "token",
      type: "string",
    },
    {
      name: "Amount",
      title: "amount",
      type: "string",
    },
  ],
};
