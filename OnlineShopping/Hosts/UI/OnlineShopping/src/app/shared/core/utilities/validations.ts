import {
  isNil, not, isEmpty, anyPass,
} from 'ramda';

/**
 * Determines if the parameter is not usable.
 * If the parameter value is any of the following it
 * is not useable.
 *
 * Null, Undefined, NaN, [], '', {}
 */
export const notUsable = anyPass([isNil, isEmpty]);

/**
 * Determines if the parameter is usable.
 * If the parameter value is not any of the following it
 * is useable.
 *
 * Null, Undefined, NaN, [], '', {}
 */
export const isUsable = (value: any): boolean => not(notUsable(value));
