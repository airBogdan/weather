## Hello, and welcome to my small weather app.

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
type selected
- check that the content of the UI results match the data received in the api call 
(need to mock the api call and hard code the response data)
- if a more complicated logic is implemented, and have an api call in a store action,
check that the apiCall custom method was called and with the right parameters
- test the custom methods in the utils file, one that formats the date and one that
capitalizes each word in a string
- test that calling the add station method results in a new weather station appears
in the dom
- test that calling the delete station function removes the correct station
- test that when calling the get stations function, the response data matches the 
list of stations in the dom

### End to end tests
- can be used as redundant tests, that cover mostly the same thing as the unit tests,
that the dom elements exist when clicking a button and they contain the needed info,
as well as other clickable elements, such as the dropdown list and the correct one is
selected
- etc

### Styles
- I've used jss as the styling option because I find it convenient to have the styles
on the same page as the logic, I find the styles faster. 
- there are no risks of class overlapping, even if the literal name is the same in two
different components, they get build into different class names
- bit of downside is the fact that if you need to use multiple class names, writing 
them would occupy some space, or can be moved inside of a function or constant, as extra code

### Make the application fast
- implement lazy load so that only the code for the accesed page is loaded, not the whole 
website
- use bundler chunking when building for production, so that the code gets split in
different files, so not all code is shipped when loading a page
- optimize image size, if any
- memoize components / functions that need it (most don't)
- in case of having pages with much larger content, above the fold optimisation can 
be used, which will only initially load the content the appears and fits on the screen.
The rest will be loaded when starting to scroll. The same technique can be further used
multiple times on the same page is there is a lot to scroll (can be achieved by
using the Intersection Observer and lazy loading)
- can use a CDN to store the assets
- run google lighthouse and follow their suggestions

### Easy to extend and maintain
- use constants for string values, such as route names, colors etc
- use external methods (like the ones in the utils file: capitalize, format date),
in order to be able to test them and to be reused across the platform
- have reusable customizable components (which is the main purpose of using a
framework such as React)
- I cant specify or articulate the granularity of the components, because making them
too small will lead to having a lot of them, but also having components too big 
would also harm the readability and maintainability of those components, so a balance
should be achieved
- not having a components so much customizable so that one can do 50 things,
because that means that that component will have a lot of logic inside, so its
about balance again
- having tests for most if not all of the components
- document things, with comments inside the code or with readme files that explain
flows, logic (example: read the readme file, understand what happens in the component,
and then when you read the code you will understand it faster)

### Deploy
- can be deployed statically to a service such as Netlify (where this current one is
hosted) or other similar service (which usually have a CDN service)
- on a physical private server
- in a container in a cloud
- setting up CI / CD pipelines, which will run tests, and then that the container
image was deployed (in case of using this approach) and pipeline for the build
- I'm not much of a devops, even though I'm looking into how things work and still 
learning, 

