# Custom calendar creator

#### Convert APIs to internet calendars with ease

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
