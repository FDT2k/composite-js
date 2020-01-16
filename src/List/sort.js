import {ensureCopy} from './index';
import {curry,compose,identity} from '../core'

import {sorterAscending,sorterDescending} from './sorting'
import * as __unsafe__ from './unsafe'

import * as enhancers from './sort_enhancers'

// SortFunction -> List -> List
export const safeSort = curry((sortFN,list)=> compose(__unsafe__.sort(sortFN), ensureCopy)(list))


// Sorter -> Enhancer -> List -> List
/**
 * Create a search function with a sorting function and an enhancer
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */

export const makeSort = curry( (sorter,enhancer,list) =>  safeSort(sorter(enhancer),list) )


export const sortAscending  = makeSort(sorterAscending)
export const sortDescending = makeSort(sorterDescending)


export const sort_ci = sortAscending(enhancers.enhanceSorterAsCaseInsensitive)
export const sort_cs = sortAscending(identity);
