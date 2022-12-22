export const poolSchema = {
  name: "poolTable",
  type: "document",
  title: "PoolTable",
  fields: [
    {
      name: "PoolId",
      title: "poolid",
      type: "string",
    },

    {
      name: "PoolOwner",
      title: "poolowner",
      type: "string",
    },
    {
      name: "Token",
      title: "token",
      type: "string",
    },
  ],
};
