import React from 'react';
import './Home.css';

import PostingRow from './PostingRow.js'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    render() {
        return (
            <div className="home">
                {this.state.posts.map((post, index) =>
                    <PostingRow ups={post.ups} thumbnail={post.thumbnail} title={post.title} subreddit={post.subreddit} url={post.url}/>
                )}
            </div>
        );
    }

    componentDidMount() {
        fetch('https://www.reddit.com/r/todayilearned/top.json?limit=10').then((res) => res.json()).then((resJson) => this.filterJSON(resJson));
    }

    filterJSON(json) {
        let posts = json.data.children;
        let filteredJSON = [];
        for (let post in posts) {
            let postInfo = posts[post].data;
            filteredJSON.push({
                title: postInfo.title,
                ups: postInfo.ups,
                url: postInfo.url,
                thumbnail: postInfo.thumbnail,
                subreddit: postInfo.subreddit
            });
        }

        this.setState({ posts: filteredJSON });
    }
}

export default Home;
