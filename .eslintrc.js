/* Crosstyan Version ESLint based on 
   https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base  

   - no semi. (I hate semi)
   - @typescript-eslint
   - no import (sometime this brings bugs) especially in Vue
   - no node (not everyone running node)
   - less strict but still warn you. 
   - just my personal taste

   Last one in extends properties has highest priority
   I'm using TypeScript so @typescript-eslint is required
*/

module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "./eslint/crosstyan.eslint",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  rules: {
    "no-console": "off"
  }
}