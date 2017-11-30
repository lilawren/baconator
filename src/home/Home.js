import React from 'react';
import './Home.css';

import PostingRow from './PostingRow.js'
import SubscriptionsDropdown from './SubscriptionsDropdown.js'

class Home extends React.Component {
    constructor(props) {
        super(props);

        let subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
        if (!subscriptions) {
            localStorage.setItem('subscriptions', JSON.stringify(['news', 'tech']));
        }

        this.state = {
            posts: [],
            subscriptions: subscriptions
        }
    }

    render() {
        return (
            <div className="home">
                <SubscriptionsDropdown subscriptions={this.state.subscriptions} />
                {this.state.posts.map((post, index) =>
                    <PostingRow key={index} ups={post.ups} thumbnail={post.thumbnail} title={post.title} subreddit={post.subreddit} url={post.url}/>
                )}
            </div>
        );
    }

    componentDidMount() {
        fetch('https://www.reddit.com/r/news/top.json?limit=10').then((res) => res.json()).then((resJson) => this.filterJSON(resJson));
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
