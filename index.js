const core = require('@actions/core');
const glob = require('@actions/glob');
const ics = require('ics')
const yaml = require('js-yaml');
const fs   = require('fs');

async function run() {
  try {
    core.info(`Starting script at ${(new Date()).toTimeString()}`);

    const glob_string = core.getInput('glob');
    core.info(`Glob is: ${glob_string}`);

    // See: https://github.com/actions/toolkit/tree/main/packages/glob#patterns    
    const globber = await glob.create(glob_string)
    const paths = await globber.glob()

    core.info(`Paths are ${paths}`);
    for (const path of paths) {
      core.info(`Reading in path: ${path}`);
      const doc = yaml.load(fs.readFileSync(path, 'utf8'));
      if (!doc.hasOwnProperty('events')) {
        core.setFailed(`FAIL: YAML document at ${path} doesn't have key
          'events' at the topmost level, but rather looks like: ${doc}`);
        return;
      }
      
      core.info(`Iterating over the ${doc['events'].length} event(s) found in ${path}`);
      events = [];
      for (const event of doc['events']) {
        events.push({
          title: event['title'] ?? 'Untitled event',
          description: event['description'] ?? '',
          start: event['start'],
          end: event['end'],
        });
      }

      core.info(`Creating calendar from events found in ${path}`);
      const { error, calendar } = ics.createEvents(events);
      if (error) {
        core.setFailed(`FAIL: Couldn't create .ics file from events found in ${path}. Error message from dependency [ics](https://www.npmjs.com/package/ics): ${JSON.stringify(error)}`);
        return
      }
      ics_path = path.replace(".yaml", ".ics");
      core.info(`Saving calendar to disc at ${ics_path}`);
      writeFileSync(ics_path, calendar);
      core.info(`Wrote calendar to ${ics_path}:\n${calendar}`);
    }
    core.info(`Ending script at ${(new Date()).toTimeString()}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
