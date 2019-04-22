import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types'
import './style.css';

export default class Notification extends Component {
  state = {
    saved: true,
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({ saved: false })
    }, 4000);
  }



  render() {
    return (
      <div className={this.state.saved ? 'users__notification-div' : 'users__notification-div hidden'}>
        <Icon className='users__notification-icon users__notification-icon-saved' type="check-circle" />
        <span className='users__notification-msg'>{this.props.notification}</span>
      </div>
    )
  }

}

