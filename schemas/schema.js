import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import {poolSchema} from './pool'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([poolSchema]),
})
