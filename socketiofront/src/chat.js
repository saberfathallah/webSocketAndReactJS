
import React from "react";
import io from "socket.io-client";

class Chat extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: []
    };

    this.socket = io('localhost:8080');

    this.socket.on('recieve_message', function(data){
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({messages: [...this.state.messages, data]});
    };

    this.sendMessage = e => {
      e.preventDefault();
      this.socket.emit('send_message', {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({message: ''});
      }
    }

    render(){
      return (
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Chat</div>
                  <div className="messages">
                    {this.state.messages.map(message => (<div>{message.author}: {message.message}</div>))}
                  </div>
                </div>
                <div className="card-footer">
                  <input style={{ marginBottom: '5px' }} type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                  <input style={{ marginBottom: '5px' }} type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                  <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Chat;