import React, { Component, PropTypes } from 'react'
import Star from './Star'
import './react-rater.css';

export { Star }

export default class Rater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: props.rating,
      lastRating: props.rating,
      isRating: false
    }
  }
  rateCallback(args) {
    let { onRate: callback } = this.props
    callback && callback(args)
  }
  willRateCallback(args) {
    let { willRate: callback } = this.props
    callback && callback(args)
  }
  cancelRateCallback(args) {
    let { cancelRate: callback } = this.props
    callback && callback(args)
  }
  willRate(rating) {
    this.setState({
      rating,
      isRating: true
    })
    this.willRateCallback({ rating })
  }
  onRate(rating) {
    this.setState({
      rating,
      lastRating: rating
    })
    this.rateCallback({ rating })
  }
  onCancelRate() {
    let { lastRating: rating } = this.state
    this.setState({
      rating,
      isRating: false
    })
    this.cancelRateCallback({ rating })
  }
  render() {
    let { total, interactive, children, ...restProps } = this.props
    let { rating, isRating } = this.state
    children = Array.prototype.concat(children).filter(Boolean)
    delete restProps.rating
    delete restProps.onRate
    let nodes = Array.apply(null, Array(total)).map((_, i) => {
      let starProps = {
        key: `star-${i}`,
        isActive: !isRating && rating - i >= 1,
        willBeActive: isRating && i < rating,
        isActiveHalf: !isRating && (rating - i >= 0.5 && rating - i < 1),
        isDisabled: !interactive,
        onClick: this.onRate.bind(this, i + 1),
        onMouseEnter: this.willRate.bind(this, i + 1)
      }
      if (children.length) {
        return React.cloneElement(children[i % children.length], starProps)
      } else {
        return (<Star {...starProps} />)
      }
    })
    if (interactive) {
      return (
        <div className="react-rater" onMouseLeave={this.onCancelRate.bind(this)} {...restProps}>
          {nodes}
        </div>
      )
    } else {
      return (
        <div className="react-rater" {...restProps}>{nodes}</div>
      )
    }
  }
}

Rater.propTypes = {
  total: PropTypes.number,
  rating: PropTypes.number,
  interactive: PropTypes.bool,
  children: PropTypes.any,
  onRate: PropTypes.func
}

Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true
}
