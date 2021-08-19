### Starting the local server

- navigate to local directory
- run <code>yarn install</code>
- run <code>yarn start</code>

### Running the tests

- open one terminal in the directory and run <code>yarn start</code>. Leave the server running.
- open another terminal in the directory and run <code>yarn test</code>

# What I could have done better

## Tests

I believe not all of the tests are working or passing all of the time. This mainly has to do with the way that I am attempting to mock the data in. I used Firebase for a quick and easy backend for this challenge, and hijacking Firebase calls with <code>jest.mock()</code> proved to be not as easy as it is with an axios call or something comparable.
<br><br>With a little more time, I would have liked to create a working mock data pattern to use in the tests.
The way it stands now, the actual development db is being affected by the tests; which is never a best practice.<br><br>
With more time, I would also increase test coverage. I attempted to test each point of user flow (When this button is clicked what happens? Can the user post a reply? Etc.). However, there are other things about the application that could use a test. Such as what happens when the refresh button is clicked? Does the data disappear? This is an actual problem I had during the development of this challenge, and a test would have caught it sooner than I did.

## Styling

I think there are too many forms of styling happening in this application.
With more time, I would refactor where things are styled and why. I believe I would aim to run anything I can style through Chakra UI as a Plan-A (this was the original plan). However, as things came down to the wire, I used a bit of vanilla css in places where it wasn't necessary.
One such unnecessary usage would be when I made the pages desktop responsive. Chakra UI provides a <code>useMediaQuery()</code> hook that I believe could have taken care of all of my responsive design needs.
I would convert everything to be styled through Chakra and React, using SCSS/CSS only as a last resort, for consistency's sake.

## File/Code Organization

I think there are a few spots where I moved something to a common file that really didn't need to be moved (such as a TS interface that is only used once. That could stay in the file where it is used).<br><br>
I don't think I generalized some things enough. For instance, the ReviewItem component and the ReplyCard component are very similar, yet I didn't compartmentalize the things they have in common to be used and recycled. With more time, I would definitely work to make as much code from these two components as DRY as possible.

## State Management

I used a combination of context and prop passing in this challenge. While this is generally what I am most comfortable with in personal projects, I think I could have delegated a few more things to the context store. For instance, the reviewId of a review that is being viewed in detail or replied to is a very important piece of data in this application. Maybe creating a key in the context store for the current active reviewId would be a better practice in a larger application.

# What I am proud of about this challenge

- I used TypeScript to the best of my ability.
- It looks an awful lot like the [Figma link](https://www.figma.com/file/wNV48bZmolsMXguA7afOpZ/Review-Detail-Challenge?node-id=0%3A1) I was provided.
- Everything seems to be functional.
- I used a few cool libraries/tools such as Chakra UI, Firebase, SASS, and Formik.
- I met both of the bonus points requirements: functional programming and responsive design.
- It was fun!
