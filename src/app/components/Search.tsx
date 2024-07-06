import React, { Component } from 'react';
import { StateI } from '../types/interface';
import { api } from '../api/api';

class Search extends Component<object, StateI> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchAnimals();
  }

  fetchAnimals = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await api.search({
        body: {
          pageNumber: 0,
          pageSize: 10,
          name: 'cat',
          earthAnimal: true,
        },
        endPoint: 'animal/search',
      });

      if (!response) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      this.setState({ data: response.animals, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ loading: false, error: error.message });
      } else {
        this.setState({ loading: false, error: 'An unknown error occurred' });
      }
    }
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <div>
        <h1>Animal Search</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {data.map((animal) => (
            <li key={animal.uid}>
              {animal.name} - Earth Animal: {animal.earthAnimal ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;
