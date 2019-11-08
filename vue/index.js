var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
// app.message = 'hi'

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'v-bind ' + new Date().toLocaleString()
    }
})

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
})

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'v-for' },
            { text: 'xxx' },
            { text: 'xxx' }
        ]
    }
})

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'v-model'
    }
})  


Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}, <input v-model="todo.text"></li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: 'Vue.component' },
            { id: 1, text: 'v-bind' },
            { id: 2, text: 'xxx' }
        ]
    }
})
// app7.groceryList[2].text = 'xxx'
