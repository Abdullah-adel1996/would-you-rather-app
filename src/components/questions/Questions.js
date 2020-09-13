import React, { Component } from 'react';
import {connect} from 'react-redux';
import Pollcards from './Pollcards';
import { Tab } from 'semantic-ui-react';


export class Questions extends Component {
  
  render() {
    const { answeredQuestions,unansweredQuestions } = this.props;
    return <Tab panes={panes({answeredQuestions, unansweredQuestions })} className="tab" />;
  }
}
const panes = props => {
  return [
    {
      menuItem: 'Unanswered',
      render: () => (
        <Tab.Pane>
          {props.unansweredQuestions.map(question => (
            <Pollcards
              key={question.id}
              questionId={question.id}
              authorName={question.author}
              question={question}
              questionStatus={"unanswered"}

              >
            </Pollcards>
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered',
      render: () => (
        <Tab.Pane>
          {props.answeredQuestions.map(question => (
            <Pollcards
              key={question.id}
              questionId={question.id}
              authorName={question.author}
              question={question}
              questionStatus={"answered"}
            >
            </Pollcards>
          ))}
        </Tab.Pane>
      )
    }
  ];
};

  const mapStateToProps = ({users, authedUser, questions}) => {
   
    const answeredIds = Object.keys(users[authedUser].answers);
    const answeredQuestions = Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    const unansweredQuestions = Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  
    return {
      answeredQuestions,
      unansweredQuestions
    };
    };

export default connect(mapStateToProps)(Questions)
