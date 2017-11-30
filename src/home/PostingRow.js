import React from 'react';
import './PostingRow.css';

class PostingRow extends React.Component {

    render() {
        return (
            <div className="posting-row">
                {this.props.ups}
                <img src={this.props.thumbnail} />
                <a href={this.props.url}>{this.props.title}</a>
                {this.props.subreddit}
                <hr/>
            </div>
        );
    }
}

export default PostingRow;
