const core = require('@actions/core');
const glob = require('@actions/glob');

async function run() {
  try {
    core.info(`Starting script`);
    core.info((new Date()).toTimeString());

    const glob_string = core.getInput('glob');
    core.info(`Glob is: ${glob_string}`);

    // See: https://github.com/actions/toolkit/tree/main/packages/glob#patterns    
    const globber = await glob.create(glob_string)
    const files = await globber.glob()

    core.info(`Files are ${files}`);

    core.info((new Date()).toTimeString());
    core.info(`Ending script`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
