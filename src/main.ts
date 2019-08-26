import { Timer } from './Timer';
import { createLevel } from './levelFactory';

const FIRST_LEVEL = require('./data/first_level.json');
const SECOND_LEVEL = require('./data/second_level.json');

console.log(FIRST_LEVEL)
async function main() {
  await createLevel(FIRST_LEVEL, async () => {
    await createLevel(SECOND_LEVEL, () => {});
  });
  console.log('page_loaded');
}
main();
