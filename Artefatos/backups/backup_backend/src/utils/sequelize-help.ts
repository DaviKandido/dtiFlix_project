/**
 * Used to define a set of properties on an object.
 * Example:
 * const filter = {
 *  where: {
 *  ...defineIf(true, { c: query.c })
 *  },
 * };
 * @param {boolean} cond test
 * @param  {object} props object containing the set o properties to be inserted if cond is true
 * @returns
 */
function defineIf(cond: boolean, props: object) {
  return cond ? props : {};
}

/**
 * Used to insert an element in an array.
 * Example:
 * const filter = {
 *  include: [
 *    {
 *      association: 'Objects'
 *    },
 *    ...insertIf({
 *      association: 'Not to include'
 *    })
 *  ]
 * };
 * @param {*} cond test
 * @param  {...any} elem array element to be inserted if cond is true
 * @returns
 */
function insertIf(cond: boolean, ...elem: any[]) {
  return cond ? elem : [];
}

/**
 * Used to define a set of properties on an object.
 * Example:
 * const filter = {
 *  where: {
 *  ...defineIf(true, { c: query.c }, {c: query.b})
 *  },
 * };
 * @param {boolean} cond test
 * @param  {object} propsIf object containing the set o properties to be inserted if cond is true
 * @param  {object} propsElse object containing the set o properties to be inserted if cond is false
 * @returns
 */
function defineIfElse(cond: boolean, propsIf: object, propsElse: object) {
  return cond ? propsIf : propsElse;
}


module.exports = {
  defineIf,
  insertIf,
  defineIfElse
};