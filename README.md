## Hello, and welcome to my small weather app.
It is deployed on netlify.

(please note that I wasn't succesful in posting to the weather stations api, even though
I purchased the subscription. So I created an express server with a mongo db and
deployed it to Railway to simulate the same functionality)

### I haven't seen any wireframes so I designed it on my own
(the search bar design is inspired from accuweather)

### The chosen framework is React because that's what you use.

### Test units as well as end to end tests could be implemented.

### Test units
- can be used on the weather page to make sure that the results are not visible until a response
comes from the backend, at start
- check that the component that displays the results changes, if the weather selection
changes (weather - forecast)
- check that the correct weather endpoint is called depending on the selected weather 
type
- check that the content of the UI results match the data received in the api call 
(need to mock the api call and hard code the response data)
- if a more complicated logic is implemented, and there is an api call in a store action,
check that the apiCall custom method was called and with the right parameters
- test the custom methods in the utils folder, the helper functions 
- test that calling the add station method results in a new weather station appearing in the dom
- test that calling the delete station function removes the correct station
- test that when calling the get stations function, the response data matches the 
list of stations in the dom

### End to end tests
- can be used as redundant tests, that cover mostly the same thing as the unit tests,
that the dom elements exist when clicking a button and they contain the needed info,
as well as other clickable elements, such as the dropdown list and the correct one is
selected
- test website flows, that clicking a button will lead to a specific page and has some specific parametres

### Styles
- I've used jss as the styling option because I find it convenient to have the styles
on the same page as the logic. I find the styles faster. 
- using jss there is no risk of class overlapping, even if the literal name is the same in two
different components, because they get build into different class names
- a bit of downside is the fact that if you need to use multiple class names, writing 
them would occupy some space, or can be moved inside of a function or constant, as extra lines of code

### Make the application fast
- use bundler chunking when building for production, so that the code gets split in
different files, so not all code is shipped when loading a page, but only the code for the visited page
- optimize image sizes, if any
- memoize components / functions that need it (most don't), to reduce nr of component rerendering
- in case of having pages with much larger content, above the fold optimisation can 
be used, which will only initially load the content the appears and fits on the screen.
The rest will be loaded when scrolling. The same technique can be further used
multiple times on the same page if there is a lot to scroll (can be achieved by
using the Intersection Observer and lazy loading)
- can use a CDN for deployment
- run google lighthouse and follow their suggestions

### Easy to extend and maintain
- use constants for values, such as route names, colors etc
- use external methods (like the ones in the utils folder), in order to be able to test them and to reuse them
across the project
- have reusable customizable components (which is on of the main purposes of using a framework such as React)
- I cant specify or articulate the granularity of the components, because making them
too small will lead to having a lot of them, but also having components too big 
would harm the readability and maintainability of those components, so a balance
should be achieved
- not having a component do a lot, because that means that that component will have a lot of logic inside, so its
about balance again
- having tests for most if not all of the components
- document things, with comments inside the code or with readme files that explain
flows, logic (example: read the readme file, understand what happens in the component,
and then when you read the code and comments you will understand it faster)

### Deploy
- can be deployed statically to a service such as Netlify (where this current one is
hosted) or other someting similar (which usually have CDN services)
- on a physical private server
- in a container in a cloud
- setting up CI / CD pipelines, for the tests, for the deployment of the container
image (in case of using this approach) and pipeline for the build process
- I'm don't have a lot of devops experience, even though I'm looking into how things work and still learning. 

### What I could have improved (other than the things mentioned above)
- make the weather card a component
- make the weather stations card a component
- standardize the css, meaning have the default values for padding, margins etc stored in a variable
or external class
- make the navbar on mobile / tablet use a hamburger menu and hidden sidebar, but since it
only has 2 links, I didn't implement it here
- fix some styling
- I always try to improve and fix things, but I have to stop at some point and this is
where I stopped
