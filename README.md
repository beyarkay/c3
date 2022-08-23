# c3 - Custom calendar creator

#### Convert APIs to internet calendars with ease

Do you want to create a custom, publicly available calendar? This action will
let you write code to define the events in your calendar, and then take care of
creating a well-formatted `ics` file and actually publishing the calendar to a
permanent URL (via GitHub releases).

For example:
- Write some code to scrape weather data via `requests` and `BeautifulSoup` and
  hook up `c3`. Now you've got an always up-to-date weather report in your
  calendar.
- Write code to scrape movie show times from your local theatre and hook up
  `c3`. Now you always know when the next release is coming out because it's in
  your calendar
- Write code to scrape the upcoming games from your favourite sports team. Now
  you'll never schedule anything for when your game is on because it's in your
  calendar.
- Create your own data source (maybe of your upcoming school deadlines or
  assignment handins), pass that data to `c3`, and then everything's in your
  calendar. You can share the link with your classmates so they enjoy the
  convenience.
- Connect to the Slack API so you get important work events automatically added
  to your calendar.

You get the idea. `c3` allows you to automatically have any kind of event in
your calendar, and always keep it up to date.

## Using this action

The easiest is to use the template repository
[c3-demo](https://github.com/beyarkay/c3-demo). Go to the link, click `Use this
template`.

## Building the action from source

1. Download and setup the repository:

```
git clone https://github.com/beyarkay/c3.git
cd c3
npm install
npm test
```

2. Package and prepare the code

```
npm run prepare
```

3. Publish the changes as a new release

```
git add dist
git checkout -b v1
git commit -v
git push origin v1
```
