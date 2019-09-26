# npm

- path

        mac global module path -> /usr/local/lib/node_modules

        1.project/node_modules
            npm install packagename will get pkg from path 3,
            and put package under project for it to require('xxx') and run(if you write a module in the project, you need relative path in require('./xxx'))

        2.{npm_path}/node_modules
            npm install -g will get pkg from path 3,\
            and put it here for you run it directly in command line,
            instead of require it in your project,
            for example express-generator
            (if express-generator is installed, you can use it to generate sample express project, for example 'express -create test', here the express is actualy express-generator's command)

        3.{npm_cache_path}/
            this is the place like maven repository, npm will copy pkgs here to your project,
            but you still need internet, because npm need to check something,
            if you want to use latest packages based on your package.json,
            you can use npm update in your project(npm@2.6.1 or later, npm only check top level dependencies).

- package.json

        npm init to create a package.json
        npm install -save to save the dependency and version to it

- publish package

        check https://npmjs.com/package/<package>
        cd mypkg
        npm init
        npm publish
