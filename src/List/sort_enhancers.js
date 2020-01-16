import {compose} from '../core';
import {lcase} from '../string'

export const enhanceSorterAsCaseInsensitive = lcase
export const enhanceSorterAsKeyCaseInsensitive = key=> compose (lcase,prop(key))
