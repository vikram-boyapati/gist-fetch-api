import React, { Component } from 'react';

/* import all required components */
import Search from './components/Search';
import GistList from './components/GistList';

import ToggleDisplay from 'react-toggle-display';

import './App.css';
import * as gistService from './services/gistService';


class App extends Component {
  constructor(props) {
      super(props);
      this.fetchGists = this.fetchGists.bind(this);
      this.state = {
        info: '',
        gists: [],
        isLoading: true
      }
  }

  fetchGists(username) {
    
    this.setState({
      isLoading: true
    });

    gistService.getGistForUser(username)
      .then(res => {
        //early detection of any response which is not 200
        if (res.status && res.status !== 200) {
          this.setState({
            isLoading: false,
            info: 'Request failed with status code ' + res.status
          });
          return;
        }

        const gists = res.data;
        const info = gists.length ? username : 'Request failed with status code 404';

        //update state with the fetched gists
        this.setState({
          isLoading: false,
          info,
          gists
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          isLoading: false,
          gists: [],
          info: err.message
        });
      })
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search fetchGists={this.fetchGists} />
        </header>
        <main className="App-intro">
          <ToggleDisplay show={!!this.state.info}>
            <section className="head">
              Request to fetch all public gists for user: <strong>{this.state.info}</strong>
            </section>
          </ToggleDisplay>

          <ToggleDisplay show={!!this.state.gists.length}>
            <section className="body">
              <GistList gists={this.state.gists} />
            </section>
          </ToggleDisplay>
        </main>
        {this.state.isLoading && <div id="ui-blocker"></div>}
      </div>
    );
  }
}

export default App;
