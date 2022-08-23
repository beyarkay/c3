const core = require('@actions/core');
const glob = require('@actions/glob');
const ics = require('ics')
const yaml = require('js-yaml');
const fs = require('fs');

async function run() {
  try {
    core.info(`Starting script at ${(new Date()).toTimeString()}`);

    const glob_string = core.getInput('glob');
    core.info(`Glob is: ${glob_string}`);

    // See: https://github.com/actions/toolkit/tree/main/packages/glob#patterns    
    const globber = await glob.create(glob_string)
    const paths = await globber.glob()

    core.info(`Paths are ${paths}`);
    let ics_paths = [];
    for (const path of paths) {
      console.log(`::group::Path ${path}`)
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
        console.log(`::group::Event ${event['title']}`);
        core.info(`Parsing event: ${JSON.stringify(event)}`);
        if (!(event['start'] instanceof Date)) {
          core.setFailed(`FAIL: event['start'] is '${event['start']} which is not a date.'`);
          return;
        }
        events.push({
          title: event['title'] ?? 'Untitled event',
          description: event['description'] ?? '',
          start: isoStringToDateList(event['start'].toISOString()),
          end: isoStringToDateList(event['end'].toISOString()),
        });
        console.log(`::endgroup::`);
      }

      core.info(`Creating calendar from events found in ${path}: ${JSON.stringify(events)}`);
      const { error, value } = ics.createEvents(events);
      if (error) {
        core.setFailed(`FAIL: Couldn't create .ics file from events found in ${path}. Error message from dependency [ics](https://www.npmjs.com/package/ics): ${JSON.stringify(error)}`);
        return
      }
      ics_path = path.replace(".yaml", ".ics");
      core.info(`Saving calendar to ${ics_path}:\n${value}`);
      fs.writeFileSync(ics_path, value);
      core.info(`Wrote calendar to ${ics_path}`);
      ics_paths.push(ics_path);
      console.log("::endgroup::");
    }
    let ics_paths_str = ics_paths.join(',')
    console.log('::set-output name=file-paths::ics_paths_str');
    core.info(`Ending script at ${(new Date()).toTimeString()}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

function isoStringToDateList(s) {
  // Create a date 'list' in the format expected by
  // https://github.com/adamgibbons/ics:
  // [year, month, date, hours, minutes, seconds]
  return s.split(/\D+/).map(d => Number(d)).slice(0, 6);
}

run();
