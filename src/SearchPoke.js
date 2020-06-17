import React from 'react'

 class SearchPoke extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {pokemonName: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('TEST SEARCH CLICK! Searching for:' + this.state.value);
        
        event.preventDefault();
    }



    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              <input placeholder="Type Pokemon here" type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Search for Pokemon" />
          </form>
        );
      }
};

export default SearchPoke;