import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'poolTable',
  type: 'document',
  title: 'PoolTable',
  fields: [
    defineField({
      name: 'PoolId',
      title: 'poolid',
      type: 'string',
    }),
    defineField({
      name: 'PoolOwner',
      title: 'poolowner',
      type: 'string',
    }),
    defineField({
      name: 'Token',
      title: 'token',
      type: 'string',
    }),
  ],
})
