import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment, Grid, Image, Progress, Label, Icon } from 'semantic-ui-react';
import {  withRouter } from 'react-router-dom';

const YourAnswerLabel = () => (
    <Label color='darkslategrey' ribbon='right' className="vote">
      <Icon name="checkmark box  outline" size="big" className="compact" />
      <div style={{ float: 'right' }}>
        Your
        <br />
        Vote
      </div>
    </Label>
  );
  
export class Pollresult extends Component {
    render() {

        const {
             optionOnePercentage,
             optionTwoPercentage,
             question, 
             numOfVotes1,
             numOfVotes2,
             numOfUsers,
             userAnswer,
             optionOneAlreadySelected,
             optionTwoAlreadySelected} = this.props;

        return (
      <Segment.Group>
            <Header
                as="h4"
                textAlign="left"
                block
                attached="top"
                content={`${this.props.user.name} asks:`}
            />
          <Grid divided padded>
            <Grid.Row>
                <Grid.Column width={5}>
                    <Image src={this.props.user.avatarURL} circular  />
                </Grid.Column>
                <Grid.Column width={11}>
                    <Header as="h2">Results</Header>
                    <Header as="h5">Would you Rather?</Header>
                    <Segment>
                    {userAnswer === 'optionOne' || optionOneAlreadySelected? <YourAnswerLabel />: null}
                    <Header
                        as="h4"
                        textAlign="left"
                        content={`${question.optionOne.text} :`}
                        />
                      <Progress color="teal" percent={optionOnePercentage} progress>{numOfVotes1} out of {numOfUsers}</Progress>
                    </Segment>
                    <Segment>
                    {userAnswer === 'optionTwo' || optionTwoAlreadySelected ? <YourAnswerLabel />: null}
                    <Header
                        as="h4"
                        textAlign="left"
                        content={`${question.optionTwo.text} :`}
                        />
                         <Progress color="teal" percent={optionTwoPercentage} progress>{numOfVotes2} out of {numOfUsers}</Progress>
                    </Segment>
              </Grid.Column>
           </Grid.Row>
         </Grid>  
     </Segment.Group>   
        )
    }
}
const mapStateToProps =({questions, users, authedUser},props)=> {
    const questionId = props.match.params.id
    const question = questions[questionId]
    const numOfVotes1 = question.optionOne.votes.length
    const numOfVotes2 = question.optionTwo.votes.length
    const numOfUsers = Object.keys(users).length
    const optionOnePercentage = Math.floor((numOfVotes1/numOfUsers)*100)
    const optionTwoPercentage = Math.floor((numOfVotes2/numOfUsers)*100)
    const user = users[authedUser]
    const optionOneAlreadySelected = question.optionOne.votes.includes(user.id)
    const optionTwoAlreadySelected = question.optionTwo.votes.includes(user.id)



    return {
        user,
        optionOnePercentage,
        optionTwoPercentage,
        question,
        numOfUsers,
        numOfVotes1,
        numOfVotes2, 
        optionOneAlreadySelected,
        optionTwoAlreadySelected

    }
}

export default withRouter(connect(mapStateToProps) (Pollresult))

