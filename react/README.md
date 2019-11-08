
# use JSX

- install nodejs

- install JSX preprocessor

        mkdir simple && cd simple
        npm init -y
        npm install babel-cli@6 babel-preset-react-app@3
        mkdir src

- start watcher

        npm start (add 'npx babel --watch src --out-dir . --presets react-app/prod' into package.json as npm start)

do not wait for watcher to finish, it's watching changes

watcher preprocesses src/xxx.js suitable for browser into root folder

more details for babel - https://babeljs.io/docs/en/babel-cli/

- visit

        serve and visit http://localhost:5000