# Bodhi UI

# Get Started

## Requirements
Node version greater than 8.6.0
Yarn

## Steps
1. Installing Packages & Dependencies:
`yarn`
it will download all the necessary packages and dependencies in to node_modules folder.

2. Start the app
`yarn start`
After the compiled process completed successfully, it will show success commands & redirect to the http://localhost:3000/ of your browser where you will find the login screen of the  app.

3. To create an Optimized Product Build of the isomorphic app. you will need need to do is to run build command in you terminal root directory of the app.
`yarn build`

# Development

## Prepare Database data

### Importing 
1. use `which mongo` find mongo install directory, in which you will also find a mongorestore executable.

2.  `mongorestore --db <dbname> topics.json`
bodhi-ui use "bodhiapi" as <dbname>, if you use another name you need to go to bodhi-graphql/src/db/index.js to update it.
This command will create a table with file name 'topics' in database <dbname>.

### Exporting
1. Use `which mongo` find mongo install directory, in which you will also find a mongodump executable.

2.`mongodump --db bodhiapi --collection <colleciton_name> --out - > <output_path>/<filename>.bson`
Note that filename is best to be same as collection name for the ease of importing.


## Coding

### Javascript formatter
We use eslint to validate and format javascript code.

npm run lint:fix <path/to/code>
e.g. npm run lint:fix ./app/components/ImageButton/

The actually command run is eslint --fix -- "<path/to/code>". Some basic rules can be auto-fixed and the eslint --fix command will print out non-fixables which need mannual repair. 

The complete rule settings are in
http://eslint.org/docs/rules/

## Responsive Layout

There are 2 ways to achieve responsive layout
1. Using React layout in js, for example use medium={4} to set column width and showOnlyFor={Breakpoints.SMALL} to set visible option on different devices
  <Row>
    <Column small={6} medium={4}>
      <Callout color={Colors.SECONDARY}>
        <Block showOnlyFor={Breakpoints.SMALL}>On a small screen, I have gutters!</Block>
        <Block showOnlyFor={Breakpoints.MEDIUM}>On a medium screen, I have gutters!</Block>
        <Block showFor={Breakpoints.LARGE}>On a large screen, I have no gutters!</Block>
      </Callout>
    </Column>
 </Row>

 2. Using Sass mixin defined in app/containers/app/index.scss. Media query variables are defined with the same value as those in Foundation. Usage example:
 .some-class{
     @include breakpoint(small) {
        height: 20%;
    }
     @include breakpoint(medium) {
        height: 40%;
    }
 }

## Localization
npm run extract-intl (not tested yet)

# Known Bugs
