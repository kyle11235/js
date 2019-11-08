const data = {
    mySearchBar: {
        q: '',
        tags: [{
            name: 'official',
            checked: false
        },
            {
                name: 'live',
                checked: false
            }]
    },
    componentTypes: [
        'code',
        'build',
        'server'
    ],
    components: [
        {
            id: 1,
            type: 'code',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'DevCS',
            shared: true,
            desc: 'aaa aaa code repository - http://alm.aaa.com/aaa' +
            '<ul><li>Login to xxx.</li>' +
            '<li>Add the desired entitlements to the cart and checkout.</li>' +
            '<li>Enter an appropriate justification text and click Submit.</li>' +
            '<li>Once request is approved you can start to use it.</li></ul>' +
            'Limitation: aaa'
        },
        {
            id: 2,
            type: 'build',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'hudson',
            shared: true,
            desc: 'aaa xxx hudson build server - http://hudsonci.aaa.com/hudson/aaa/' +
            '<li>Select \'Request Access\' (Request for Self)</li>' +
            '<li>In \'Request Access, select the \'Entitlement\' radio button and search for the ALM entitlement "aaa".</li>' +
            '<li>Enter an appropriate justification text and click Submit.</li>' +
            '<li>Once request is approved you can start to use it.</li></ul>' +
            'Limitation: aaa'
        },
        {
            id: 3,
            type: 'code',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'Full-featured-xxx',
            shared: true,
            desc: 'This is not ready yet, we will have it in future.'
        },   
        {
            id: 5,
            type: 'server',
            author: 'aaa',
            pipeline: 'KM',
            name: 'xxx',
            shared: true,
            desc: 'Please contact aaa aaa@aaa.com for access.' +
            '<br/>Limitation: reserved for aaa KM project.' +
            '<br/>Contact aaa@aaa.com for access.'
        },
        {
            id: 6,
            type: 'server',
            author: 'aaa',
            pipeline: 'KM',
            name: 'DBCS_001',
            shared: true,
            desc: 'Please contact aaa aaa@aaa.com for access.' +
            '<br/>Limitation: reserved for aaa KM project.' +
            '<br/>Contact aaa@aaa.com for access.'
        },
        {
            id: 7,
            type: 'server',
            author: 'aaa',
            pipeline: 'KM',
            name: 'xxx001',
            shared: true,
            desc: 'Please contact aaa aaa@aaa.com for access.' +
            '<br/>Limitation: reserved for aaa xx project.' +
            '<br/>Contact aaa@aaa.com for access.'
        },
        {
            id: 8,
            type: 'code',
            author: 'aaa',
            pipeline: 'KM',
            name: 'xx-on-cloud',
            shared: true,
            desc: 'Only xx storage but accessible from public cloud. URL is https://aaa.aaa.com/aaa-aaa14282/#projects/devops.' +
            '<br/>Limitation: reserved for aaa x project.' +
            '<br/>Contact aaa@aaa.com for access.'

        },
        {
            id: 10,
            type: 'server',
            author: 'aaa',
            pipeline: 'KM',
            name: 'DEVOPS',
            shared: true,
            desc: 'A compute x server with docker installed.' +
            '<br/>Limitation: reserved for aaa KM project.' +
            '<br/>Contact aaa@aaa.com for access.'
        },
        {
            id: 11,
            type: 'server',
            author: 'aaa',
            pipeline: 'KM',
            name: 'DEVOPS002',
            shared: true,
            desc: 'An x compute server with docker installed.' +
            '<br/>Limitation: reserved for aaa KM project.' +
            '<br/>Contact aaa@aaa.com for access.'
        },
        {
            id: 12,
            type: 'server',
            author: 'aaa',
            pipeline: 'KM',
            name: 'xxx',
            shared: true,
            desc: 'An x compute server with x installed.' +
            '<br/>Limitation: reserved for aaa KM project.' +
            '<br/>Contact aaa@aaa.com for access.'
        },
        {
            id: 13,
            type: 'server',
            author: 'aaa',
            pipeline: 'provision-VM-baked-demo',
            name: 'provision-server_001',
            shared: false,
            desc: 'Not ready yet.'
        },
        {
            id: 14,
            type: 'code',
            author: 'aaa',
            pipeline: 'provision-k8s-by-terraform',
            name: 'Github-x',
            shared: true,
            desc: 'https://github.com/x/terraform-kubernetes-installer'
        },
        {
            id: 15,
            type: 'server',
            author: 'aaa',
            pipeline: 'iPhone11',
            name: 'iphone11',
            shared: true,
            desc: 'Contact me if you are in shenzhen.'
        },
        {
            id: 16,
            type: 'build',
            author: 'aaa',
            pipeline: 'KM',
            name: 'hudson',
            shared: true,
            desc: 'hudson on public cloud - http://aaa/hudson/' +
            '<br/>Limitation: reserved for aaa KM project.' +
            '<br/>Contact aaa@aaa.com for access.'
        },
        {
            id: 17,
            type: 'server',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'x',
            shared: true,
            desc: 'xxx-aaa15243 - Please contact aaa a@aaa.com for access.'
        },
        {
            id: 18,
            type: 'server',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'shared_env',
            shared: true,
            desc: 'xxx-aaa14379 - Please contact aaa a@aaa.com for access.'
        },
        {
            id: 19,
            type: 'server',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'xxxxxx',
            shared: true,
            desc: 'xxx-aaa14613 - Please contact aaa aaa asd team for access.'
        },
        {
            id: 20,
            type: 'server',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'BigData_Analysis',
            shared: true,
            desc: 'xxx-aaa14281 - Please contact aaa aaa asd team for access.'
        },
        {
            id: 21,
            type: 'server',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'as',
            shared: true,
            desc: 'xxx-aaa13906 - Please contact aaa aaa asd team for access.'
        },
        {
            id: 22,
            type: 'server',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'asdasd',
            shared: true,
            desc: 'xxx-aaa14402 - Please contact aaa a@aaa.com for access.'
        },
        {
            id: 23,
            type: 'server',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'asdasd',
            shared: true,
            desc: 'xxx-aaa14651 - Please contact aaa aaa asd & System Team for access.'
        },
		{
            id: 24,
            type: 'server',
            author: 'aaa',
            pipeline: 'Pool',
            name: 'MCasdasdS',
            shared: true,
            desc: 'xxx-aaa14197 - Please contact aaa a@aaa.com for access.'
        }
    ],
    pipelines: [
        {
            'id': 1,
            'name': 'Pool',
            'author': 'aaa',
            'desc': 'aaa available code repository/xasdass for daily asd.',
            'tags': [
                'official'
            ],
            components: {
                1: '',
                2: '',
                3: '',
                17: '',
                18: '',
                19: '',
                20: '',
                21: '',
                22: '',
                23: '',
				24: ''
            }
        },
        {
            'id': 3,
            'name': 'KM',
            'author': 'aaa',
            'desc': 'Pre-provisioned long-term OCI Compute/DBCS/Weblogic/SOACS/OBCS prepared for aaa KM live demos.',
            'tags': [
                'official',
                'live'
            ],
            components: {
                5: '',
                6: '',
                7: '',
                10: '',
                11: '',
                12: ''
            }
        },
        {
            'id': 4,
            'name': 'dxbank',
            'author': 'aaa',
            'desc': 'A complete pipeline (DevCS + hudson + Docker) supporting a mobile app built by JET/ACCS/MCS',
            'tags': [
                'live'
            ],
            components: {
                8: 'https://aaa@aaa.aaa.com/aaa-aaa14282/s/aaa-aaa14282_devops_23853/scm/dxbank.git' +
                '<br/>https://aaa@aaa.aaa.com/aaa-aaa14282/s/aaa-aaa14282_devops_23853/scm/dxbank_backend.git',
                16: 'http://aaa/hudson/job/dxbank/',
                10: 'http://aaa:9002/dxbank/'
            }
        },
        {
            'id': 5,
            'name': 'cloudservice',
            'author': 'aaa',
            'desc': 'A complete pipeline (DevCS + hudson + Docker) supporting a java app to manage DBCS instances.',
            'tags': [
                'live'
            ],
            components: {
                8: 'https://aaa@aaa.aaa.com/aaa-aaa14282/s/aaa-aaa14282_devops_23853/scm/cloudservice.git',
                16: 'http://aaa/hudson/job/cloudservice/',
                10: 'http://aaa:9102/cloudservice/'
            }
        },
        {
            'id': 6,
            'name': 'new-doccs',
            'author': 'aaa',
            'desc': 'Customized CECS portal supported by a complete pipeline (DevCS + hudson + Docker).',
            'tags': [
                'live'
            ],
            components: {
                8: 'https://aaa@aaa.aaa.com/aaa-aaa14282/s/aaa-aaa14282_devops_23853/scm/newdoccs.git',
                16: 'http://aaa/hudson/job/newdoccs/',
                10: 'http://aaa:9005/'
            }
        },
        {
            'id': 7,
            'name': 'mdv',
            'author': 'aaa',
            'desc': 'mobile digital visualization supported by a complete pipeline (DevCS + hudson + Docker).',
            'tags': [
                'live'
            ],
            components: {
                8: 'https://aaa@aaa.aaa.com/aaa-aaa14282/s/aaa-aaa14282_devops_23853/scm/mdv.git',
                16: 'http://aaa:9004/',
                10: ''
            }
        },
        {
            'id': 8,
            'name': 'deploy-DBCS-by-PSM',
            'author': 'hysun.he',
            'desc': 'The provisioning template is stored in git repository, use it to setup your dedicated DBCS.',
            components: {
                3: ''
            }
        },
        {
            'id': 9,
            'name': 'provision-VM-baked-demo',
            'author': 'aaa',
            'desc': 'Provision an OCI compute instance based on a clean VM image or a custom VM image with aaa baked demo.',
            'tags': [
                'official',
                'live'
            ],
            components: {
                3: '',
                13: ''
            }
        },
        {
            'id': 10,
            'name': 'provision-k8s-by-terraform',
            'author': 'aaa',
            'desc': 'You will need a build server with terraform installed and an OCI compute server',
            'tags': [
                'official'
            ],
            components: {
                14: ''
            }
        },
        {
            'id': 11,
            'name': 'iPhone11',
            'author': 'aaa',
            'desc': 'You need iPhone11 to verify your app? Come to me if you are in shenzhen.(This is a scenario how people can contribute to this pipelineHub community)',
            components: {
                15: ''
            }
        }
    ]
};

export default data;