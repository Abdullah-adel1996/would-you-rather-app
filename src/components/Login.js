import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAuthedUser} from "../actions/authedUser"
import { Segment, Grid, Header, Form, Icon} from 'semantic-ui-react';


export class Login extends Component {
 
  state = {
    username:'',
    isLogged: false
}

handleSubmit = (e) => {
  e.preventDefault();
  this.props.dispatch(setAuthedUser(this.state.username))
  this.setState(() => ({isLogged: true}))
}
onChange = (e, { value }) => {
  this.setState({ username:value });
};

getDropdownOptions = () => {
  const { users } = this.props;
    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
}

render() {
    const { isLogged } = this.props;
    const { username } = this.state;
    const disabled = username === '' ? true : false;

   if (isLogged) {
     return <Redirect to = '/'/>
   }
    return (
      <Segment.Group>
        <Header as="h4" block attached="top" textAlign="center">
          <Header.Content>Welcome to the Would You Rather App!</Header.Content>
          <Header.Subheader>Please sign in to continue</Header.Subheader>
       </Header>
       <Grid padded textAlign="center">
      <Grid.Row className="login">
        <Grid.Column width={16}>
          <br />
      <Icon name='question circle' color='grey' size='massive' />
          <br /> <br />
        <Form onSubmit={this.handleSubmit}>

          <Header as="h2" color="teal">
            Sign In
          </Header>
          <Form.Dropdown
            placeholder="Select a Friend"
            fluid
            selection
            scrolling
            options={this.getDropdownOptions()}
            value={username}
            onChange={this.onChange}
            required
          />
          <Form.Button content="Login" color='teal' fluid  disabled={disabled} />
      </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
      </Segment.Group>
    )
  }
}
const mapStateToProps = ({users, authedUser}) => {
    return {
      users: Object.values(users),
      usersname: authedUser
    };}

export default connect(mapStateToProps)(Login)
