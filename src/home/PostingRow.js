import React from 'react';
import './PostingRow.css';

class PostingRow extends React.Component {

    render() {
        return (
            <div className="posting-row">
                <div className='upvotes'>{this.props.ups}</div>
                <a href={this.props.url}>
                    <img src={(this.props.thumbnail.length > 0 && this.props.thumbnail !== 'self') ? this.props.thumbnail : 'https://www.easyguides.com.au/wp-content/uploads/2015/06/Generic-news-icon.png'} alt='thumbnail' />
                </a>
                <a className='post-title' href={this.props.url}>{this.props.title}</a>
                <div className='spacer'/>
                <div className='subreddit'>{'r/' + this.props.subreddit}</div>
            </div>
        );
    }
}

export default PostingRow;
