# node

https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

- install

        - linux
        cd /u02/app/
        wget https://nodejs.org/download/release/v6.9.5/node-v6.9.5-linux-x64.tar.gz
        wget https://nodejs.org/download/release/v10.16.3/node-v10.16.3-linux-x64.tar.gz
        tar -zxf xxx.gz

        wget https://nodejs.org/dist/v12.13.1/node-v12.13.1-linux-x64.tar.xz
        tar -xf node-v12.13.1-linux-x64.tar.xz

        mv xxx node
        sudo vi /etc/profile
        export NODE_PATH=/u02/app/node
        export PATH=$PATH:$NODE_PATH/bin
        source /etc/profile
        if install new npm, e.g. npm install npm@3.10.10 -g
        
        - mac installer
        - win installer

- create

        - npm init
        - manually create main js according to package.json
        - npm install xx -save to add to package.json

- debug

        - inspect
        node --inspect server.js
        http://127.0.0.1:9229/json/list
        chrome-devtools://devtools/bundled/inspector.htmlxxxxxxxxxxx
        source -> breakpoint

        - node-debug
        npm install -g node-debug
        node-debug path/to/your/script.js
