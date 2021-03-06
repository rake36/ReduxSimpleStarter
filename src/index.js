// ES6
// 1 component per file!

import _ from 'lodash';
import React, { Component } from 'react';          // core component stuff
import ReactDOM from 'react-dom';   // dom manipulation stuff

// npm install --save youtube-api-search
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import Config from './components/config';

const API_KEY = Config().API_KEY;  // Read from /src/components/config.js not included in source code

// 1. Create a new component

// const: ES2016 - immutable/constant

// no quotes?? it's ok => JSX - looks like html, but is really javascript

// This is a type, not an instance
// function() => () ES6 syntax, which changes semantics of 'this'

// functional form of App
// const App = () => {
//     return (
//     <div>
//         <SearchBar />
//     </div>
//     );
// };

// We would rather have class form of App so we can keep track of state
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('algorithms');
    }

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            // console.log(videos);
            this.setState({
                videos: videos,
                selectedVideo: videos[0] // set to first video we retrieve
            });
            // this.setState({ videos });  // can do this if key and object are the same spelling
        });
    }

    render() {

        // every 300ms
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChanged={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                    videos={this.state.videos}
                />
            </div>
        );
    }
}

// 2. inject this component into the DOM
// querySelector does not seem to apply to all elements...
ReactDOM.render(<App />, document.querySelector('.container'));

