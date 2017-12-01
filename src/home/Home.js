import React from 'react';
import './Home.css';

import PostingRow from './PostingRow.js'
import SubscriptionsDropdown from './SubscriptionsDropdown.js'

let NUM_POSTS = 20;

class Home extends React.Component {
    constructor(props) {
        super(props);

        let subscriptions = this.getSubscriptions();
        let data = []; // data could have been a hash table but using arrays here so we can use the map function in rendering
        for (let subreddit of subscriptions) {
            data.push({
                subreddit: subreddit,
                posts: []
            });
        }

        this.state = {
            data: data,
        }

        this.onSubscriptionAdd = this.onSubscriptionAdd.bind(this);
        this.onSubscriptionRemove = this.onSubscriptionRemove.bind(this);
    }

    render() {
        return (
            <div className="home">
                <div className='header'>
                    <SubscriptionsDropdown
                        subscriptions={this.getSubscriptions()}
                        onSubscriptionAdd={this.onSubscriptionAdd}
                        onSubscriptionRemove={this.onSubscriptionRemove}
                    />
                    <h1 className='header-logo'>baconator</h1>
                </div>

                { this.renderPosts() }

            </div>
        );
    }

    renderPosts() {
        return this.state.data.map((obj) => {
                let subreddit = obj.subreddit;
                return obj.posts.map((post, index) =>
                    <PostingRow
                        key={index}
                        ups={post.ups}
                        thumbnail={post.thumbnail}
                        title={post.title}
                        url={post.url}
                        subreddit={subreddit}
                    />
                );
            });
    }

    // returns array of subreddits subscribed to e.g. ['news', 'cats']
    getSubscriptions() {
        let subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
        if (!subscriptions || subscriptions.length < 1) {
            localStorage.setItem('subscriptions', JSON.stringify(['news']));
        }
        return subscriptions;
    }

    async onSubscriptionAdd(newSubreddit) {
        let subsriptions = this.getSubscriptions();
        if (subsriptions.indexOf(newSubreddit) !== -1) {
            alert('Already subscribed to ' + newSubreddit);
            return;
        }
        subsriptions.push(newSubreddit);
        localStorage.setItem('subscriptions', JSON.stringify(subsriptions));

        // update state obj to fetch posts for new subreddit
        let data = this.state.data;
        let posts = await this.fetchJSONFromSubreddit(newSubreddit);
        data.push({
            subreddit: newSubreddit,
            posts: posts
        });

        this.setState({data: data});
    }

    onSubscriptionRemove(subreddit) {
        let subscriptions = this.getSubscriptions();
        subscriptions.splice(subscriptions.indexOf(subreddit), 1);
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

        // update state obj to remove posts for removed subreddit
        let data = this.state.data;
        for (let index in data) {
            let obj = data[index];
            if (obj.subreddit === subreddit) {
                data.splice(index, 1);
            }
        }

        this.setState({data: data});
    }

    async componentDidMount() {
        // fetch all initial posts
        let data = this.state.data;
        for (let obj of data) {
            obj.posts = await this.fetchJSONFromSubreddit(obj.subreddit);
        }

        this.setState({ data: data });
    }

    async fetchJSONFromSubreddit(subreddit) {
        return fetch('https://www.reddit.com/r/' + subreddit + '/top.json?limit=' + NUM_POSTS).then((res) => res.json()).then((resJson) => this.filterJSON(resJson));
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
        return filteredJSON;
    }
}

export default Home;
