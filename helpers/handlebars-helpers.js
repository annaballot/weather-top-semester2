/*
 * Handlebars Helpers
 */

export const handlebarsHelpers = {
  //checks if a and b are equal and returns true if so
  eq: function (a, b) {
    return a === b;
  },

  //checks if a is greater than 0 and returns true if so
  gt0: function (a) {
    return a > 0;
  },
};
