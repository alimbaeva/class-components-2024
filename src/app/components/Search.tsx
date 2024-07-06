import React, { Component } from 'react';
import { StateI } from '../types/interface';
import { api } from '../api/api';

class Search extends Component<object, StateI> {
  constructor(props: object) {
    super(props);
    this.state = {
      inputValue: '',
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
          name: this.state.inputValue,
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

  // Input change handler
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  // Function for processing form submission or receiving input value
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.fetchAnimals();
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <div>
        <h1>Animal Search</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Input:
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
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
