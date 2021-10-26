npx create-react-app learn-shogi
cd my-app
npm start

once everything is installed, it will likely say there are several vulerabilities, this is a common situation.
Open up package.json create a new section: 
  "devDependencies": {
  },

from the normal dependencies, take "react-scripts": "4.0.3" and move it to the new devDependencies section, 
there is a package.json already in the github repo if you need an example

to make sure everything is going okay you can, in the directory of the project open command prompt and type 

npm audit --production

this should come up with 0 vulerabilities or issues.