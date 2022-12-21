export const poolSchema = {
  name: 'poolTable',
  type: 'document',
  title: 'PoolTable',
  fields: [
    {
      name: 'PoolTitle',
      title: 'pooltitle',
      type: 'string',
    },
    {
      name: 'PoolId',
      title: 'poolId',
      type: 'string',
    },

    {
      name: 'PoolOwner',
      title: 'owner',
      type: 'string',
    },
  ],
}
