import React, { Component } from "react";
import "./index.css";
import axios from 'axios';

export default class MovieList extends Component {

  constructor(props){
    super(props);
    this.state ={ 
      value : '',
      list : [],
      showList: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.value !== '' && this.state.value !== null){
      axios.get(`https://jsonmock.hackerrank.com/api/movies?Year=${this.state.value}`)
          .then(res => {
              const moviesList =res.data;
              this.setState({ list: moviesList.data });
          })
      this.setState({showList: true});
      }
  }
  renderMovieList(){
    if(this.state.list.length > 0){
      return this.state.list.map((movies,index) => {
        return <li className="slide-up-fade-in py-10" key={index}>{movies.Title}</li>
      });
    }else{
      return <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div>
    }
  
  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input" value={this.state.value} onChange={this.handleChange}/>
          <button className="" data-testid="submit-button" onClick={this.handleSubmit}>Search</button>
        </section>
        
        <ul className="mt-50 styled" data-testid="movieList">
          {this.state.showList ? this.renderMovieList() : null}
        </ul>
      </div>
    );
  }
}
