import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import query from './query';

const addUser = gql`
  mutation makeUser($name: String!) {
    makeUser(name: $name) {
      id,
      name,
      car {
        make
      }
    }
  }
`;

export default class AddUser extends Component {
  state = {
    name: ''
  };

  nameChanged = ({ target: { value }}) => {
    this.setState({ name: value });
  }

  resetFields = () => {
    this.setState({ name: '' });
  }

  render() {
    return (
      <Mutation mutation={addUser} refetchQueries={[{
        query: query
      }]} awaitRefetchQueries={true}>
      {( makeUser, { loading, error }) => (
        <form
          onSubmit={evt => {
            evt.preventDefault();
            makeUser({
              variables: {
                name: this.state.name
              }
            });
            this.resetFields();
          }}
        >
          <label>
            <span>Name</span>
            <input
              type="text"
              value={this.state.name}
              onChange={this.nameChanged}
            />
          </label>
          <div>
            <button>Add User</button>
          </div>
          {loading && <p>Adding usering...</p>}
          {error && <p>Error!</p>}
        </form>
      )}
    </Mutation>
    );
  }
}