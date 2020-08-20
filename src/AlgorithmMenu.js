import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { DropdownButton, Dropdown} from 'react-bootstrap'

class AlgorithmMenu extends React.Component{
  constructor(props){
    super(props);
    this.algorithms = {"A*": "A_STAR","Dijkstra":"Dijkstra", "A* Yen":"A_STAR_YEN",
                      "Dijkstra Yen" : "DIJKSTRA_YEN", "A* Multi-route" : "A_STAR_MULTIROUTES"};
    this.elevationModes = ["MAX", "MIN"];
    this.state = {
      algorithm: "Choose an algorithm",
      elevation: "Choose an elevation mode"
    }
  }

  changeAlgorithm = (eventKey, event) =>{
    this.setState({algorithm:eventKey})
    return this.props.onSelect({key:"algorithm", value:eventKey});
  }

  changeElevationMode =  (eventKey, event) =>{
    this.setState({elevation:eventKey})
    return this.props.onSelect({key:"elevation", value:eventKey});
  }

  render(){
    return(
      <div>
        <b>Algorithm</b>
        <DropdownButton id="dropdown-basic-button" title={this.state.algorithm} variant="outline-secondary">
          <Dropdown.Item eventKey = {this.algorithms["A*"]} onSelect={this.changeAlgorithm} >A*</Dropdown.Item>
          <Dropdown.Item eventKey = {this.algorithms["Dijkstra"]} onSelect={this.changeAlgorithm}>Dijkstra</Dropdown.Item>
          <Dropdown.Item eventKey = {this.algorithms["A* Yen"]} onSelect={this.changeAlgorithm}>A* Yen</Dropdown.Item>
          <Dropdown.Item eventKey = {this.algorithms["Dijkstra Yen"]} onSelect={this.changeAlgorithm}>Dijkstra Yen</Dropdown.Item>
          <Dropdown.Item eventKey = {this.algorithms["A* Multi-route"]} onSelect={this.changeAlgorithm}>A* Multi-route</Dropdown.Item>
        </DropdownButton>
        <div className="pad_top"/>
        <b>Elevation Mode</b>
        <DropdownButton id="dropdown-basic-button" title={this.state.elevation} variant="outline-secondary">
          <Dropdown.Item eventKey = {this.elevationModes[0]} onSelect={this.changeElevationMode}>Max</Dropdown.Item>
          <Dropdown.Item eventKey = {this.elevationModes[1]} onSelect={this.changeElevationMode}>Min</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

export default AlgorithmMenu;
