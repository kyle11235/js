$TVB = (model => {
    const TVB = 't-bind';
    const handler = {
        get: function(obj, prop) {
            return obj[prop];     
        },
        set: function (obj, prop, value) {
            // listen model
            console.log('set ' + prop + '=' + value);
            // set input
            let elementList = document.querySelectorAll('[' + TVB + '="' + prop + '"]');
            elementList.forEach(e => {
                e.value = value;
            });
            return Reflect.set(...arguments);
        }
    };
    this.p = new Proxy(model, handler);
    
    // t-bind
    let bindList = document.querySelectorAll('[' + TVB + ']');
    console.log('bindList=', bindList);

    bindList.forEach(e => {
        console.log('e=', e);
        let prop = e.getAttribute(TVB);
        console.log('prop=' + prop);
        // init input
        e.value = p[prop];
        // listen input
        e.onkeyup = function () {
            console.log('keyup=' + this.value);
            // set model
            p[prop] = this.value;
        }
    });
    return p;
});

var model = {
    name: 'kyle',
    age: 100,
};

model = $TVB(model);
model.name = 'kz';