import React from 'react';
import './SubscriptionsDropdown.css';

class SubscriptionsDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            newSubreddit: ''
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onAddNewChange = this.onAddNewChange.bind(this);
        this.onSubredditAdd = this.onSubredditAdd.bind(this);
        this.onSubredditRemove = this.onSubredditRemove.bind(this);
    }

    renderSubreddit(subreddit) {
        return (
            <div key={subreddit}>
                {subreddit}
                <button onClick={() => this.onSubredditRemove(subreddit)}>X</button>
                <hr/>
            </div>
        );
    }

    render() {
        return (
            <div className="subs-dropdown">
                <button onClick={this.toggleDropdown}>My subreddits</button>

                {this.state.opened &&
                    <div>
                        <input value={this.state.newSubreddit} placeholder='Add subreddit' onChange={this.onAddNewChange} />
                        <button onClick={this.onSubredditAdd}>Add</button>
                        {this.props.subscriptions.map(subreddit => this.renderSubreddit(subreddit))}
                    </div>
                }
            </div>
        );
    }

    onAddNewChange(e) {
        this.setState({newSubreddit: e.target.value});
    }

    onSubredditAdd() {
        this.props.onSubscriptionAdd(this.state.newSubreddit);
        this.setState({newSubreddit: ''});
    }

    onSubredditRemove(subreddit) {
        this.props.onSubscriptionRemove(subreddit);
        this.setState({newSubreddit: ''});
    }

    toggleDropdown() {
        this.setState((prevState) => {
            return { opened: !prevState.opened}
        });
    }
}

export default SubscriptionsDropdown;
