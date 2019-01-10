import React, {Component} from 'react';
import './Home.css';
import update from 'immutability-helper'; // ES6
import {Grid, Jumbotron} from 'react-bootstrap';
import AppBar from "./AppBar";
import SearchBar from "./SearchBar";
import PipelineBar from './PipelineBar';
import PipelineList from "./PipelineList";
import data from "../data/data";
import queryString from 'query-string';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Snackbar from 'material-ui/Snackbar';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBar: null,
            openTip: false,
            completed: 100,
            pipelines: []
        };
    }


    // only 1 time before render
    componentWillMount() {
        const query = queryString.parse(this.props.location.search);
        data.mySearchBar.q = query.q ? query.q : '';
        if (data.mySearchBar.tags) {
            data.mySearchBar.tags.forEach(tag => {
                if (query[tag.name] === 'true' || query[tag.name] === 'false') {
                    tag.checked = query[tag.name] === 'true' ? true : false;
                }
            });
        }
        this.setState({
            'searchBar': data.mySearchBar
        });
    }

    // only 1 time after render, like document is ready
    componentDidMount() {
        this.search();
    }

    // do not set state here, will trigger update again and endless looping
    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    // clean something
    componentWillUnmount() {
    }

    handleChange = (name, value) => {
        console.log(name, value);

        const query = queryString.parse(this.props.location.search);
        const searchBar = this.state.searchBar;

        if ('q' === name) {
            query.q = value;
            // 1.setState handles simple situation
            // 2.immutability-helper can handle nested value with preState, this.state is readonly
            // 3.or you can shallow copy with Object.assign(target, source);
            this.setState((preState) => update(preState, {
                searchBar: {q: {$set: value}}
            }));
        } else if (searchBar.tags) {
            // 4.deep copy
            const draftSearchBar = JSON.parse(JSON.stringify(searchBar));
            draftSearchBar.tags.forEach(tag => {
                if (tag.name === name) {
                    tag.checked = value;
                    query[tag.name] = value ? true : undefined;
                }
            });
            this.setState({searchBar: draftSearchBar});
        }

        this.props.history.push('/?' + queryString.stringify(query));

        this.search();
    }

    handleClear = () => {
        const searchBar = this.state.searchBar;
        searchBar.q = '';
        if (searchBar.tags) {
            searchBar.tags.forEach(tag => tag.checked = false);
        }
        this.props.history.push('/');
        this.setState({
            'searchBar': searchBar
        });

        this.search();
    }

    getComponentCounter(pipeline, components){
        let componentCounter = {};
        if (pipeline.components) {
            for (let componentId in pipeline.components) {
                let component = null;
                components.forEach(c => {
                    if (c.id.toString() === componentId) {
                        component = c;
                        return;
                    }
                });
                componentCounter[component.type] = componentCounter[component.type] ? componentCounter[component.type] + 1 : 1;
            }
        }
        return componentCounter;
    }

    search() {
        this.setState({completed: 20});

        // ensure state is updated whenever you use it
        // update state in a callback or return state directly
        let pipelines = null;
        this.setState((state) => {
            pipelines = data.pipelines.filter((pipeline) => {
                const q = this.state.searchBar.q.toLowerCase();
                let isValid = false;
                if (q === '') {
                    isValid = true;
                } else if (pipeline.name.toLowerCase().indexOf(q) > -1 ||
                    pipeline.author.indexOf(q) > -1 ||
                    pipeline.desc.toLowerCase().indexOf(q) > -1) {
                    isValid = true;
                }
                let missingTag = false;
                if (state.searchBar.tags) {
                    missingTag = state.searchBar.tags.some(tag => {
                        if (tag.checked && (!pipeline.tags || !pipeline.tags.includes(tag.name))) {
                            return true;
                        }
                        return null;
                    });
                }
                if (isValid && !missingTag) {
                    // add componentType counter
                    pipeline.componentCounter = this.getComponentCounter(pipeline, data.components);
                    return pipeline;
                }
                return null;
            });
            // simulate aync
            setTimeout(() => {
                this.setState({pipelines: pipelines, completed: state.completed + 20});
            }, 0);
        });
    }


    // do not set state here
    render() {
        return (
            <div className="Home">
                {/*need a  single wrapper*/}
                <AppBar/>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    open={this.state.openTip}
                    onClose={() => {
                        this.setState({openTip: false});
                    }}
                    message={'Not implemented yet.'}
                />

                <Jumbotron style={{marginBottom: '0px', borderBottom: '1px #e1e4e8 solid'}}>
                    <Grid>
                        <h1>Welcome to PipelineHub</h1>
                        <p>
                            <Button
                                variant="fab" color="primary"
                                onClick={() => {
                                    this.setState({openTip: true});
                                }}>
                                <AddIcon/>
                            </Button>
                        </p>
                    </Grid>
                </Jumbotron>
                <PipelineBar completed={this.state.completed} count={this.state.pipelines.length}>
                    <SearchBar data={this.state.searchBar} handleChange={this.handleChange}
                               handleClear={this.handleClear}/>
                </PipelineBar>
                <PipelineList data={this.state.pipelines} componentTypes={data.componentTypes}
                              showAuthor={true}/>
            </div>
        );
    }
}

export default Home;