import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import axios from 'axios';
// import App from './App';
import * as serviceWorker from './serviceWorker';


const Header = (props) => (
    <div className ="header">
       <h1 className ="headertext"> Final Project </h1>
    </div>
  )

const QuestionForm = (props) => (
    <div className ="background">
        <div className = "center">{props.questionList} </div>
        <ol className = "questionlist" type="A">
        {props.answers && props.answers.map(ans => <li>{ans}</li>)} 
        </ol>
        <form>
        <input className = "input" onChange = {props.changeHandler} placeholder="Enter the letter of your answer"/>
        <button className = "button" onClick = {props.clickHandler}> Submit! </button> 
        <div className = "score">{props.score} </div>
        </form>
    </div>
  )

  const CommentForm = (props) => (
      <div>
       <input onChange = {props.commentHandler} placeholder="Enter a comment!"/>
        <button className = "button" onClick = {props.commentClick}> Submit! </button> 
        <div className = "comment"> {props.commentList.map(comment => <p>{comment.comment}</p>)} </div>
           <form>
        
        </form> 
    </div>
  )

class App extends Component {
    state = {
        questionDatabase: [
    ],
        questionList: [],
        count: 0,
        input: "",
        score: 0,
        commentInput: "",
        commentList: []
    }
    
    updateInput = (event) => {
        event.preventDefault();
        this.setState({ input: event.target.value});
    }

    randomize = (arr) => {

const randomized = [];
        for (let i=0; i< arr.length && randomized.length<9; i++) {
            let randomQuestion = arr[Math.floor(Math.random() * arr.length)];
           // console.log(randomQuestion)
            if (!randomized.includes(randomQuestion)) {
               randomized.push(randomQuestion)
            }
        }
        return randomized;
    }
    
    handleClick = (event) => {
        event.preventDefault();                 
        if (this.state.input === this.state.questionList[this.state.count].solution){
            this.setState({ score: this.state.score + 1, })
        }
        this.setState({ count: this.state.count + 1,
            input: "" })
    }

    componentDidMount(){
        axios.get('/api/question')
    .then((result) => {
        //console.log(result)
      this.setState({questionDatabase: result.data}, () => this.createQList())
    }).catch(err=> console.log(err))

          
      }
createQList = () => {
    const randomizedArray = this.randomize(this.state.questionDatabase)
    this.setState({questionList: randomizedArray})
}

commentChange = (event) => {
    this.setState({commentInput: event.target.value})
}

commentClick = (event) => {
    event.preventDefault();
    axios.post('/api/comment', {comment: this.state.commentInput})
    .then((result) => {
      console.log("post result", result.data);
      //this.setState({commentList: this.state.commentList.concat(result.data) })

      axios.get('/api/comment')
      .then((result) => {
        const comments = result.data;
        this.setState({commentList: comments})
        console.log("get result", comments)
      }).catch(err=>console.log(err))
      
    }).catch(err=>console.log("post err", err))
  }

    render() {
        //console.log('list',this.state.questionList[this.state.count])
          return (
              <div className="App">
              <Header/> 
              <QuestionForm 
              changeHandler = {this.updateInput}
              questionList = {this.state.questionList[this.state.count] && this.state.questionList[this.state.count].body}
              answers = {this.state.questionList[this.state.count] && this.state.questionList[this.state.count].answers}
              clickHandler = {this.handleClick}
              score = {this.state.score}
              />
              <CommentForm 
              commentHandler = {this.commentChange}
              commentClick = {this.commentClick}
              commentList = {this.state.commentList}
              />
              </div>
          )
      }
  }

  ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
