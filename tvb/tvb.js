TVB = function(app){
    // grammar
    const T_VALUE = 't-value';
    const T_CLICK = 't-click';

    // proxy of data
    let proxy = undefined;
    const handler = {
        get: function(data, prop) {
            return data[prop];     
        },
        set: function (data, prop, value) {
            // console.log('set ' + prop + '=' + value);
            // sync to all
            let elementList = document.querySelectorAll(app.el+ ' ' + '[' + T_VALUE + '="' + prop + '"]');
            elementList.forEach(e => {
                e.value = value;
            });
            return Reflect.set(...arguments);
        }
    };
    if(app.data){
        proxy = new Proxy(app.data, handler);
    }

    // lifecycle hook
    if(typeof(app.created) === 'function'){
        app.created.bind(proxy)();
    }
    
    // value init & listen
    let valueList = document.querySelectorAll(app.el+ ' ' + '[' + T_VALUE + ']');
    // console.log(T_VALUE + '=', valueList);

    valueList.forEach(e => {
        // console.log('e=', e);
        let prop = e.getAttribute(T_VALUE);
        // console.log('prop=' + prop);
        e.value = proxy[prop];
        e.onkeyup = function () {
            // console.log('keyup=' + this.value);
            proxy[prop] = this.value;
        }
    });

    // event init & listen
    let clickList = document.querySelectorAll(app.el+ ' ' + '[' + T_CLICK + ']');
    // console.log(T_CLICK + ' clickList=', clickList);

    clickList.forEach(e => {
        // console.log('e=', e);
        let prop = e.getAttribute(T_CLICK);
        // console.log('prop=' + prop);

        let fn = app.methods[prop];
        if(fn){
            // copy fn body and set proxy as this 
            e.onclick = fn.bind(proxy);
        } else {
            fn = new Function(prop);
            e.onclick = fn.bind(proxy);
        }
    });

    // lifecycle hook
    if(typeof(app.mounted) === 'function'){
        app.mounted.bind(proxy)();
    }

    return proxy;
};

// usage
var data = {
    name: 'kyle',
    age: 0,
};

var proxy = new TVB({
    el: '#app',
    data: data,
    methods: {
        fnClick: function(){
            console.log('fnClick');
            this.age++;
        }
    },
    created: function () {
        console.log('created age=' + this.age)
    },
    mounted: function () {
        console.log('mounted age=' + this.age)
    }
});


// proxy change -> data change, not vice-versa
proxy.name = 'kz';
console.log('data.name=' + data.name);

// deep object binding
// webpack template loader / component
// {{ message }}, t-if t-for


