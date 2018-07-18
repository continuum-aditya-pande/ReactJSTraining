import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const Display = (props) => (<input type='text' id = 'numberInput' value={props.expression} onInput = {props.onInput}/>);

class Button extends React.Component {
  constructor(props) {
    super(props);
    
    this.onClick = this.onClick.bind(this);
  }
  
  onClick() {
    this.props.onButtonPress(this.props.text);
  }
  
  
  render() {
    if(this.props.text === '+'|| this.props.text === '-'||this.props.text === '/'||this.props.text === '*')
      return <button onClick={this.onClick} class="buttonOps">{this.props.text}</button>;  
    
    else if(this.props.text === 'Del' || this.props.text === 'CA')
      return <button onClick={this.onClick} class="buttonCancel">{this.props.text}</button>;
      
    else 
      return <button onClick={this.onClick} class="button">{this.props.text}</button>;  
 }
}

class App extends React.Component {
  constructor () {
    super();
    
    this.state = {
      expression: '',
      }
    
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onEqualPress  = this.onEqualPress.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onClearAll = this.onClearAll.bind(this);
    //this.handleChange = this.handleChange.bind(this)
  }

  //REGEX for checking keyboard input
  // checking(data) {
  //   var x = data//document.calculator.answer.value;
  //   document.getElementById("problemWithInputMessage").innerHTML="";
  //     var regexNumbers = /[0-9]+$/;                       //Regular Expression for the numbers
  //     var regexSigns = new RegExp(/[\+\-\/\*]+$/g);       //Regular Expression for the Special Signs
  
  //     if(x.match(regexSigns) || x.match(regexNumbers)) {  //checking for Numbers and the Special allowed signs
  //         return true;
  //     }
  //     else {
  //       //document.getElementById("problemWithInputMessage").innerHTML="You can only input numbers and the following signs + - * /";
  //       x = x.substring(0, x.length - 1); //Deleting the last symbol if it is not allowed
  //       document.calculator.answer.value = x;
  //       return false;
  //     }
  // }

  onButtonPress(text) {
    
    this.setState((prev) => ({expression: prev.expression + text}));
  
  }

  // handleChange(e){
    
  //   let length = e.target.value.length;
  //   let input = e.target.value.charAt(length-1)
  //   //this.checking(input)
  //   this.setState((prev) => ({expression: prev.expression + input}));
  // }
  
  onEqualPress() {
    let exp = this.state.expression;
    
    for(let i = 0; i < exp.length; i++){
      
      if(exp.charAt(i) === '+'||exp.charAt(i)==='-'||exp.charAt(i)==='/'||exp.charAt(i)==='/'){
        if(exp.charAt(i+1) === '+'||exp.charAt(i+1)==='-'||exp.charAt(i+1)==='*'||exp.charAt(i+1)==='/'){
          
          alert(exp.charAt(i)+''+exp.charAt(i+1))
          this.setState({expression: 'Invalid Operation'})
          return
        }
      }
    }
    const result = eval(this.state.expression);
    
    this.setState({expression: result.toString()});
    
  }
  
  onClear() {
    this.setState((prev) => ({
      expression: prev.expression.length <= 1 ? '' : prev.expression.slice(0, -1)}));
  }

  onClearAll() {
   this.setState({
      expression: ''
    });
  } 
  
  render() {
    
    return (
      <div>
        <Display expression={this.state.expression} onInput = {this.checking}/>
        <br/>
        <Button text="1" onButtonPress={this.onButtonPress}/>
        <Button text="2" onButtonPress={this.onButtonPress}/>
        <Button text="3" onButtonPress={this.onButtonPress}/>
        <Button text="+" onButtonPress={this.onButtonPress}/>
        <br/>
        <Button text="4" onButtonPress={this.onButtonPress}/>
        <Button text="5" onButtonPress={this.onButtonPress}/>
        <Button text="6" onButtonPress={this.onButtonPress}/>
        <Button text="-" onButtonPress={this.onButtonPress}/>
        <br/>
        <Button text="7" onButtonPress={this.onButtonPress}/>
        <Button text="8" onButtonPress={this.onButtonPress}/>
        <Button text="9" onButtonPress={this.onButtonPress}/>
        <Button text="*" onButtonPress={this.onButtonPress}/>
        <br/>
        <Button text="(" onButtonPress={this.onButtonPress}/>
        <Button text="0" onButtonPress={this.onButtonPress}/>
        <Button text=")" onButtonPress={this.onButtonPress}/>
        <Button text="/" onButtonPress={this.onButtonPress}/>
        <br/>
        <Button text="." onButtonPress={this.onButtonPress}/>
        <Button text="=" onButtonPress={this.onEqualPress}/>
        <Button text="Del" onButtonPress={this.onClear}/>
        <Button text="CA" onButtonPress={this.onClearAll}/>
        
      </div>
    )
  }
  componentDidMount(){

    var el = document.getElementById('numberInput')
    if(el !== null){
    el.addEventListener("click", e => {
      alert('Caret at:',el)
    })
  }
    
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
