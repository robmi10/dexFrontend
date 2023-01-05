import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'liquidityTable',
  type: 'document',
  title: 'LiquidityTable',
  fields: [
    defineField({
      name: 'LiquidityOwner',
      title: 'liquidityowner',
      type: 'string',
    }),
    defineField({
      name: 'LiquidityId',
      title: 'liquidityid',
      type: 'number',
    }),
    defineField({
      name: 'PoolAddress',
      title: 'pooladdress',
      type: 'string',
    }),
    defineField({
      name: 'StakeAmount',
      title: 'stakeamount',
      type: 'string',
    }),
  ],
})
