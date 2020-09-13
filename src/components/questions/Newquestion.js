import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { handleAddNewQuestion } from '../../actions/questions';



class Newquestion extends Component {

    state = {
        isSubmit: false,
        isLoading: false,
        option1: '',
        option2: ''
      };

      handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
      };

      handleSubmit = (e) => {
        e.preventDefault();
        const {option1, option2} = this.state
        const {dispatch} = this.props
        dispatch(handleAddNewQuestion(option1, option2))
        this.setState(() => ({
            isSubmitted: true,
            isLoading: true,
            option1: '',
            option2: ''
            
        }))
    }

  render() {
    const {option1, option2, isSubmitted, isLoading} = this.state;

    if (isSubmitted === true) {
        return <Redirect to='/'/>
    }

    return (
        <Segment.Group>
        <Header as="h3" textAlign="left" block attached="top">
          Create a New Poll
        </Header>
        <Grid padded>
          <Grid.Column>{isLoading && (
              <Dimmer active inverted>
                <Loader content="Updating" />
              </Dimmer>
            )}
            <p>Complete the question:</p>
            <p>
              <strong>Would you rather...</strong>
            </p>
            <Form onSubmit={this.handleSubmit} >
              <Form.Input
                id="option1"
                placeholder="Enter option one text here..."
                value={option1}
               onChange={this.handleChange}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id="option2"
                placeholder="Enter option two text here..."
                value={option2}
               onChange={this.handleChange}
                required
              />
              <Form.Button color="teal" size="tiny" fluid >
                Submit
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
     
    );
  }
}


export default connect()(Newquestion);

