import React, { Component } from 'react';

import { getProfile } from '../services/auth';

class Profile extends Component {

  state = {
    profile: {}
  }

  componentDidMount() {
    getProfile(data => {
      console.log('data', data);
      this.setState({
        id: data.sub,
        email: data.name,
        role: data.role,
        imageUrl: data.picture
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.imageUrl && <img src={this.state.imageUrl} />}
        <h2>{this.state.email}</h2>
        <p>{this.state.role}</p>
      </div>
    )
  }
}

export default Profile;
