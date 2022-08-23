# Custom calendar creator

#### Convert APIs to internet calendars with ease

## Using this action

Copy paste this code into the file `.github/workflows/create-calendars.yaml`
and then every time you push a change to `create-calendars.py` it will run and
update the calendars. Or alternatively you can trigger it manually.


```yaml
# The name of this workflow
name: My Cool Calendar Creator

# When a push is received to branch `main` that changes `create-calendars.py`,
# run the workflow. Also allow the workflow to be run manually.
on:
  push:
    branches: [ "main" ]
    paths:
      - 'create-calendars.py'
  workflow_dispatch:

jobs:
  create-calendars:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Install pip requirements
      uses: BSFishy/pip-action@v1
      with:
        requirements: requirements.txt

    - name: Create Cool Calendars
      uses: beyarkay/c3@main
      with:
        glob: "calendars/*.yaml"
```


And copy this code to the file `create-calendars.py`
```py
from datetime import datetime, timedelta
import yaml
import os


def main():
    # A list of events to create
    events = [
        {
            "summary": "An event with a start and finish",
            "description": "This event has a start and finish time.",
            "start": datetime.now(),
            "finsh": datetime.now() + timedelta(hours=3),
        },
    ]
    # Create a directory to contain our calendars
    os.makedirs("calendars", exist_ok=True)
    # Write the events list as yaml files into the calendars directory
    with open('calendars/simple-calendar.yaml', 'w') as file:
        yaml.dump(events, file)

if __name__ == "__main__":
    main()
```



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
