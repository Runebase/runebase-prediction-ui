import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Done, DoneAll, Clear } from '@material-ui/icons';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export class TokenImage extends Component {
  static propTypes = {
    token: PropTypes.string,
  };
  render() {
  	const token = this.props.token;  
  	const getTokenImage = () => {
      switch(token) {
        case "PRED":   return <img alt={token} src={require('../images/PRED.png')} />;
        case "FUN":   return <img alt={token} src={require('../images/FUN.png')} />;
        default:      return <p>No token image match</p>;
	  }	
    };
    return (
      <div>{ getTokenImage() }</div>
    );    
  }
}

export class OrderTypeIcon extends Component {
  static propTypes = {
    orderType: PropTypes.string,
  };
  render() {
  	const orderType = this.props.orderType;  
  	const getOrderTypeIcon = () => {
      switch(orderType) {
        case "BUYORDER":   return <Icon className='fullHeight' color='green' name='angle double up' size='huge' />;
        case "SELLORDER":   return <Icon className='fullHeight' color='red' name='angle double down' size='huge' />;
        default:      return <p>No orderType icon match</p>;
	  }	
    };
    return (
      <div>{ getOrderTypeIcon() }</div>
    );    
  }
}

export class StatusIcon extends Component {
  static propTypes = {
    status: PropTypes.string,
  };
  render() {
  	const status = this.props.status;  
  	const getStatusIcon = () => {
      switch(status) {
        case "PENDING":   return <Icon className='fullHeight' color='saddlebrown' name='hourglass start' size='huge' />;
        case "ACTIVE":   return <Done className='activeIcon' />;
        case "FULFILLED":   return <DoneAll className='activeIcon' />;
        case "FAILED":   return <Done className='activeIcon' />;
        case "PENDINGCANCEL":   return <Icon className='fullHeight' color='darkorange' name='hourglass half' size='huge' />;
        case "CANCELED":   return <Clear className='cancelIcon' />;
        default:      return <p>No status icon match</p>;
	  }	
    };
    return (
      <div>{ getStatusIcon() }</div>
    );    
  }
}