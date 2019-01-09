import React, { Component } from 'react';
import { Query } from 'react-apollo';
import query from './query';
import AddUser from './AddUser';

export default class User extends Component {
  render() {
    return (
      <div>
        <AddUser />
        <hr />
        <Query query={query}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <div>
              <ul>
              {data.users.map(({ id, name, car }) => {
                const list = <li key={id}>{name}
                  <ul>{car.length !== 0 ? 
                  car.map(( { make, model, colour }) => <li key={`${id}-${make}`}>{make} {model} {colour}</li> ) :
                  <li>No car</li>}</ul>
                </li>
                return list;
              })}
              </ul>
            </div>
          )
        }}
        </Query>
      </div>
    );
  }
}