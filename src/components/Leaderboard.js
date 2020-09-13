import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Segment,
    Grid,
    Header,
    Image,
    Label,
    Divider
} from 'semantic-ui-react';


const Colors = ['orange', 'blue', 'olive'];

class Leaderboard extends Component {
  render() {
    const { leaderboardInfo } = this.props;

    return (
        <Fragment>
          {leaderboardInfo.map((user, index)=>(
          <Segment.Group key={user.id}>
            <Label corner="left" icon="trophy" color={Colors[index]}/>
            <Grid divided padded>
              <Grid.Row>
                <Grid.Column width={4} verticalAlign="middle">
                  <Image src={user.avatarURL} circular />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as="h3" textAlign="left">
                    {user.name}
                  </Header>
                  <Grid>
                    <Grid.Column width={12}>Answered questions</Grid.Column>
                    <Grid.Column width={4}>{user.numOfAnswers}</Grid.Column>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid.Column width={12}>Created questions</Grid.Column>
                    <Grid.Column width={4}>{user.numOfQuestions}</Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={4} textAlign="center">
                  <Segment.Group>
                    <Header as="h5" block attached="top" content="Score" />
                    <Segment>
                      <Label circular color="teal" size="big">
                       {user.total} 
                      </Label>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment.Group>
          ))}
      </Fragment>
     
    );
  }
}

function mapStateToProps({ users }) {
    const leaderboardInfo = Object.values(users)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        numOfAnswers: Object.values(user.answers).length,
        numOfQuestions: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
      }))
      .sort((a, b) => a.total - b.total)
      .reverse();
    return {
      leaderboardInfo
    };
  }
  
  export default connect(mapStateToProps)(Leaderboard);


