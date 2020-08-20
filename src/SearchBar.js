import React from "react";
import { Button } from 'react-bootstrap'
import AlgorithmMenu from './AlgorithmMenu'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


class SearchBar extends React.Component{

  constructor(props){
    super(props);


    this.useStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        },
      },
    }));

    this.state = {
      from : "",
      to : "",
      percentage: "100",
      algorithm: "A_STAR_MULTIROUTES",
      elevation: "MIN",
      fromLocationNames: [],
      toLocationNames: [],
      loading:false
    }
  }

  submitHandler = (event) =>{
    event.preventDefault();
    const uri = new URL("http://localhost:8080/search");
    uri.searchParams.append("from", this.state.from);
    uri.searchParams.append("to", this.state.to);
    uri.searchParams.append("algorithm", this.state.algorithm);
    uri.searchParams.append("elemode", this.state.elevation);
    uri.searchParams.append("percentage", this.state.percentage);
    this.setState({loading:true});

    fetch(uri.href)
      .then(response =>  {return response.json()})
      .then(data => {
        this.props.onGetRoute(data);
        this.setState({loading:false});
      })
      .catch(error => alert("something went wrong"))
  }

   requestForOptions = (name, type) => {
    const uri = new URL("http://localhost:8080/autocomplete");
    uri.searchParams.append("name", name);

    fetch(uri.href)
      .then(response => { return response.json()} )
      .then(data =>{
        if(type === "from"){
          this.setState({fromLocationNames: data.values})
        }
        else{
          this.setState({toLocationNames: data.values})
        }
      })
  }

  changeHandler = (event, event_value) =>{
    const name = event.target.id.split("-")[0]
    const value = event_value?  event_value : event.target.value

    this.setState({
      [name]: value,
    }, () => {
      if(name === "from" && this.state.from.length === 2){
          this.requestForOptions(this.state.from, "from")
        }
      else if (name === "from" && this.state.from.length === 0) {
        this.setState({fromLocationNames:[]})
      }
      else if((name === "to" && this.state.to.length === 2)){
        this.requestForOptions(this.state.to, "to")
      }
      else if((name === "to" && this.state.to.length === 0)){
        this.setState({toLocationNames:[]})
      }
      });

  }


  algoMenuSelectHandler = (selection) =>{
    this.setState({[selection.key]:selection.value})
  }

  render(){
    return (

      <form onSubmit={this.submitHandler} className={this.useStyles.root} >
        <div id="search_form">
          <Autocomplete
             freeSolo
             options={this.state.fromLocationNames.map((option) => option.name)}
             id="from"
             onChange={this.changeHandler}
             renderInput={(params) => (
               <TextField
                 {...params}
                 label="Origin"
                 margin="normal"
                 variant="filled"
                 onChange={this.changeHandler}
                 InputProps={{ ...params.InputProps, type: 'from_search' }}
               />
             )}
           />
            <Autocomplete
              freeSolo
              options={this.state.toLocationNames.map((option)=>option.name)}
              id="to"
              onChange={this.changeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  margin="normal"
                  variant="filled"
                  onChange={this.changeHandler}
                  InputProps={{ ...params.InputProps, type: 'to_search'}}
                />
              )}
            />
            <TextField
              label="Shortest Path%"
              margin="normal"
              variant="filled"
              onChange={this.changeHandler}
              id="percentage"
            />
            <AlgorithmMenu onSelect={this.algoMenuSelectHandler}/>
            <div className="pad_top" id="submit_button">
              <Button variant="outline-secondary" type="submit">Search</Button>
            </div>
            <div className="loading_spinner">
              {this.state.loading && <CircularProgress size={60} color="#85929E"/>}
            </div>
        </div>

      </form>
    );
  }
}

export default SearchBar;
