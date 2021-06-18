import React, { Component } from 'react';
import * as gistService from '../services/gistService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCodeBranch, faComment, faStar } from '@fortawesome/fontawesome-free-solid'

export default class Gist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      forks: 0,
      stars: 0,
      forks_users: []
    }
  }

  componentDidMount() {
    const that = this;
    gistService.listForks(this.props.gistId).then((forksData) => {
      const forks = forksData.data.length;
      that.setState({
        forks
      });
      if (forks) {
        const forks_users = forksData.data.map(f => {
          return { login: f.owner.login, avatar: f.owner.avatar_url, url: f.forks_url }
        }).slice(0, 3);
        that.setState({
          forks_users: forks_users
        });
      }
    }).catch((err) => {
      console.error(err);
    });

  }

  render() {
    let forks_users;
    if (this.state.forks_users.length) {
      forks_users = this.state.forks_users.map((fuser, index) => {
        return (
          <li key={index}>
            <a href={fuser.url} target="_blank" rel="noreferrer">
              <img className="avatar" src={fuser.avatar} width="50" height="50" alt="" />
              <h3>{fuser.login}</h3>
            </a>
          </li>
        )
      })
    }
    return (
      <div className="stats_forks">
        <ul className="stats">
          <li><FontAwesomeIcon icon={faCode} /> &nbsp;{this.props.files} files</li>
          <li><FontAwesomeIcon icon={faCodeBranch} />&nbsp;{this.state.forks} forks</li>
          <li><FontAwesomeIcon icon={faComment} />&nbsp;{this.props.comments} comments</li>
          <li><FontAwesomeIcon icon={faStar} />&nbsp;{this.state.stars} stars</li>
        </ul>
        <ul className="forks">
          {forks_users}
        </ul>
      </div>
    )
  }
}
