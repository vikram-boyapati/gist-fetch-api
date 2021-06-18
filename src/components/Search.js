import React, { Component } from 'react';
import styled from 'styled-components'

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event && event.preventDefault();
        console.log(event.target.gistUser.value);
        const username = event.target.gistUser.value;
        this.props.fetchGists(username);
    }


    render() {
        return (
            <Wrapper>
              <InputBox>
              <form className="input-form" onSubmit={this.handleSubmit}>
                  <input className="input-box" type="text" name="gistUser" id="gistUser" autoComplete="off" placeholder="Insert username to search public gists" />
                  <inpit type="submit" name="submitGistUser" id="submitGistUser" value="Search" />
              </form>
              </InputBox>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 100%;
`;

