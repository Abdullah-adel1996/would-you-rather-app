import React, { Component, Fragment } from 'react';
import { Route, Switch, } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Questions from './components/questions/Questions';
import Polldetails from './components/questions/Polldetails';
import Newquestion from './components/questions/Newquestion';
import Leaderboard from './components/Leaderboard';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import * as actionTypes from './actions/shared';

import './App.css'


export class App extends Component {
  componentDidMount() {
    this.props.dispatch(actionTypes.handleInitialData())
  }
 

  render() {
    return (
      <div>
          <LoadingBar/>
       {this.props.authedUser===null?  <Route
              render={() => (
                <ContentGrid>
                  <Login />
               </ContentGrid>
              )}
            />  :(<Fragment>
              <Navbar/>
      <ContentGrid>
        <Switch>
          <Route exact path="/" component={Questions} />
           <Route path="/questions/:id" component={Polldetails} /> 
          <Route  path="/newquestion" component={Newquestion} />
          <Route  path="/leaderboard" component={Leaderboard} />
        </Switch>
      </ContentGrid>
        
      </Fragment>)}
       
        
      </div>

    )
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

const mapStateToProps = ({authedUser}) => {
return {
   authedUser 
}
}

export default connect(mapStateToProps)(App) 
