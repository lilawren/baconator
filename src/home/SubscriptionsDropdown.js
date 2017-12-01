import React from 'react';
import './SubscriptionsDropdown.css';

class SubscriptionsDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropped: false,
            newSubreddit: ''
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onAddNewChange = this.onAddNewChange.bind(this);
        this.onSubredditAdd = this.onSubredditAdd.bind(this);
        this.onSubredditRemove = this.onSubredditRemove.bind(this);
        this.onInputKeyUp = this.onInputKeyUp.bind(this);
    }

    renderSubreddit(subreddit) {
        return (
            <div className='subreddit-row' key={subreddit}>
                {subreddit}
                <button onClick={() => this.onSubredditRemove(subreddit)}>X</button>
            </div>
        );
    }

    render() {
        return (
            <div className={"subs-dropdown" + (this.state.dropped ? ' dropped' : '')}>
                <button onClick={this.toggleDropdown}>
                    {this.state.dropped ? <span>&#9660;</span> : <span>&#9650;</span>}
                </button>

                {this.state.dropped &&
                    <div>
                        <input
                            value={this.state.newSubreddit}
                            placeholder='Enter subreddit...'
                            onKeyUp={this.onInputKeyUp}
                            onChange={this.onAddNewChange}
                        />
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

    onInputKeyUp(e) {
        if (e.key === 'Enter') { // enter key
            this.onSubredditAdd();
        }
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
            return { dropped: !prevState.dropped}
        });
    }
}

export default SubscriptionsDropdown;
