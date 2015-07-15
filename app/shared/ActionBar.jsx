import React, { Component } from 'react';
import { Link } from 'react-router';


export class ActionBar extends Component {
  render() {
    return (<div className="ActionBar">{ this.props.children }</div>);
  }
}

export class Action extends Component {
  render() {
    let actionContent;
    if (this.props.to) {
      actionContent = (<Link {...this.props} />);
    } else {
      actionContent = (<a href='#' {...this.props}></a>)
    }

    return (<div className="Action">{ actionContent }</div>);
  }
}

