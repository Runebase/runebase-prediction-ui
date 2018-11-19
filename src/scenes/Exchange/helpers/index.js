import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Done, DoneAll, Clear } from '@material-ui/icons';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import PredImage from '../images/PRED.png';
import FunImage from '../images/FUN.png';

export class TokenImage extends PureComponent {
  render() {
    const { token } = this.props;
    const getTokenImage = () => {
      switch (token) {
        case 'PRED': return <img alt={token} src={PredImage} />;
        case 'FUN': return <img alt={token} src={FunImage} />;
        default: return <p>No token image match</p>;
      }
    };
    return (
      <div>{getTokenImage()}</div>
    );
  }
  static propTypes = {
    token: PropTypes.string,
  };
  static defaultProps = {
    token: '',
  };
}

export class OrderTypeIcon extends PureComponent {
  render() {
    const { orderType } = this.props;
    const getOrderTypeIcon = () => {
      switch (orderType) {
        case 'BUYORDER': return <Icon className='fullHeight' color='green' name='angle double up' size='huge' />;
        case 'SELLORDER': return <Icon className='fullHeight' color='red' name='angle double down' size='huge' />;
        default: return <p>No orderType icon match</p>;
      }
    };
    return (
      <div>{getOrderTypeIcon()}</div>
    );
  }
  static propTypes = {
    orderType: PropTypes.string,
  };
  static defaultProps = {
    orderType: '',
  };
}

export class StatusIcon extends PureComponent {
  render() {
    const { status } = this.props;
    const getStatusIcon = () => {
      switch (status) {
        case 'PENDING': return <Icon className='fullHeight' color='saddlebrown' name='hourglass start' size='huge' />;
        case 'ACTIVE': return <Done className='activeIcon' />;
        case 'FULFILLED': return <DoneAll className='activeIcon' />;
        case 'FAILED': return <Done className='activeIcon' />;
        case 'PENDINGCANCEL': return <Icon className='fullHeight' color='darkorange' name='hourglass half' size='huge' />;
        case 'CANCELED': return <Clear className='cancelIcon' />;
        default: return <p>No status icon match</p>;
      }
    };
    return (
      <div>{getStatusIcon()}</div>
    );
  }
  static propTypes = {
    status: PropTypes.string,
  };
  static defaultProps = {
    status: '',
  };
}
