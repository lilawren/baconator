import React from 'react';
import './home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {}
    }
  }

  render() {
    return (
      <div className="home">
        {JSON.stringify(this.state.posts)}
      </div>
    );
  }

  componentDidMount() {
    fetch('https://www.reddit.com/r/todayilearned/top.json?limit=10').then((res) => res.json()).then((resJson) => {
      this.setState({posts: resJson})
    });
  }
}

export default Home;
