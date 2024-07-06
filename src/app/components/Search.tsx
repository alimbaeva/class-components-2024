import React, { Component } from 'react';
import { StateI } from '../types/interface';
import { api } from '../api/api';
import Results from './Results';

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
    const savedInputValue = localStorage.getItem('inputValue');
    if (savedInputValue) {
      this.setState({ inputValue: savedInputValue }, this.fetchAnimals);
    }
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
    localStorage.setItem('inputValue', this.state.inputValue);
    this.fetchAnimals();
  };

  render(): React.ReactNode {
    const { data, loading, error } = this.state;

    return (
      <section>
        <div className="search-block">
          <form className="search-form" onSubmit={this.handleSubmit}>
            <label htmlFor="inputSearch">Animal:</label>

            <input
              id="inputSearch"
              type="text"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <Results data={data} />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </section>
    );
  }
}

export default Search;
