import React, { Component } from 'react';
import {connect} from 'react-redux';
import {  Segment, Header, Grid, Image, Button } from 'semantic-ui-react';
import {  withRouter } from 'react-router-dom';


export class Pollcards extends Component {
  
 handleClick = (e) => {
   const { questionId, history} = this.props;
   history.push({
      pathname:`/questions/${questionId}`,
     state:{ questionId: questionId}
    })
 }

  render() {
      const {user, question, questionStatus} = this.props;
    return (
     <Segment.Group>
        <Header
          as="h5"
          textAlign="left"
          block
          attached="top"
          content={`${user.name} asks:`}
        />
        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={user.avatarURL} circular />
            </Grid.Column>
            <Grid.Column width={11}>
                <Header as="h4" textAlign="left">
                    would you rather
                </Header>
                <p style={{ textAlign: 'left' }}>
                    ....{question.optionOne.text}...
                </p>
                <br/> 
            <Button
                color={`teal`}
                size="tiny"
                fluid
                onClick={this.handleClick}>
               {questionStatus==="unanswered"? "view poll": "view result"}  
            </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

const mapStateToProps = ({users}, props) => {

    const user = users[props.authorName]
    return {
        user
    }

}
export default  withRouter( connect(mapStateToProps) (Pollcards))
