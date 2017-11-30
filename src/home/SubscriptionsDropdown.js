import React from 'react';
import './SubscriptionsDropdown.css';

class SubscriptionsDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
    }

    renderSubreddit() {

    }

    render() {
        return (
            <div className="subscriptions">
                <input />
                {this.props.subscriptions.}
            </div>
        );
    }
}

export default SubscriptionsDropdown;
