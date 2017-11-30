import React from 'react';
import './SubscriptionsDropdown.css';

class SubscriptionsDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    renderSubreddit(subreddit) {
        return (
            <div key={subreddit}>{subreddit} <hr/></div>
        );
    }

    render() {
        return (
            <div className="subs-dropdown">
                <button onClick={this.toggleDropdown}>My subreddits</button>

                {this.state.opened &&
                    <div>
                        <input />
                        {this.props.subscriptions.map(subreddit => this.renderSubreddit(subreddit))}
                    </div>
                }
            </div>
        );
    }

    toggleDropdown() {
        this.setState((prevState) => {
            return { opened: !prevState.opened}
        });
    }
}

export default SubscriptionsDropdown;
