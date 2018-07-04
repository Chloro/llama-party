import React from 'react'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {news: []}
        this.news = []
    }
    componentWillMount() {
      socket.on('news', (data) => {
          this.news.push(data)
          this.setState({news: this.news})
          console.log('this.state.news', this.state.news)
          socket.emit('clientSays', 'pong');
      })
    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                {this.state.news.map((newsItem, index) => {return <div key={index}>{newsItem}</div>})}
            </div>
        )
    }
}