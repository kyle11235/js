# node

https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

## debug

- inspect

        node --inspect server.js
        http://127.0.0.1:9229/json/list
        chrome-devtools://devtools/bundled/inspector.htmlxxxxxxxxxxx
        source -> breakpoint

- node-debug

        npm install -g node-debug
        node-debug path/to/your/script.js

## npm

        mac global module path -> /usr/local/lib/node_modules