
# use JSX

- install nodejs

- install JSX preprocessor

        mkdir simple && cd simple
        npm init -y
        npm install babel-cli@6 babel-preset-react-app@3
        mkdir src

- start watcher

        npx babel --watch src --out-dir . --presets react-app/prod 

  watcher preprocesses src/xxx.js suitable for browser into root folder
  
  more details for babel - https://babeljs.io/docs/en/babel-cli/

