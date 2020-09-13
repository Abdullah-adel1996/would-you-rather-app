import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Form, Radio, Segment, Grid, Image } from 'semantic-ui-react';
import Pollresult from './Pollresult';
import { handleQuestionAnswer } from '../../actions/questions';
import {  withRouter } from 'react-router-dom';


export class Polldetails extends Component {

    state = {
      answer: '',
      showResult: false
    };

    handleChange = (e, {value}) => this.setState({ answer: value });

    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch, question} = this.props
        const {answer} = this.state
        dispatch(handleQuestionAnswer(question.id, answer ))
        this.setState({showResult: true})
    }

    render() {
        console.log(this.props)

        const {questionStatus, user, question } = this.props;
        const {showResult,  answer} = this.state;
        const disabled = answer === ''? true:false;
        let poll = showResult || questionStatus? <Pollresult userAnswer={answer}/>: 
          <Segment.Group>
            <Header
                as="h4"
                textAlign="left"
                block
                attached="top"
                content={`${user.name} asks:`}
            
            />
          <Grid divided padded>
            <Grid.Row>
                <Grid.Column width={5}>
                    <Image src={user.avatarURL} circular/>
                </Grid.Column>
                <Grid.Column width={11}>
                    <Header as="h4">Would you rather</Header>
            
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <Radio
                        label={question.optionOne.text}
                        name="radioGroup"
                        value="optionOne"
                        checked={answer === 'optionOne'}
                        onChange={this.handleChange}
                    />
                    <br/> <br/>
                    <Radio
                        label={question.optionTwo.text}
                        name="radioGroup"
                        value="optionTwo"
                        checked={answer === 'optionTwo'}
                        onChange={this.handleChange}
                    />
                 </Form.Field>
                <br/>
                 <Form.Field>
                    <Button
                        color="teal"
                        size="tiny"
                        fluid
                        disabled={disabled}
                        content="Submit"
                    />
                 </Form.Field>
                </Form >
              </Grid.Column>
           </Grid.Row>
        </Grid>  
     </Segment.Group>
 ;
      
      return (
      <Fragment>
         {poll}
      </Fragment>
        )
    }
}
const mapStateToProps =({questions, users, authedUser},props)=> {
    const questionId = props.match.params.id
    const question = questions[questionId]
    const user = users[authedUser]
    const questionStatus = Object.keys(user.answers).includes(questionId)
    return {
        question,
        user,
        questionStatus
    }
}

export default  withRouter( connect(mapStateToProps) (Polldetails))

