import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { fetchAccounts, sortAccounts } from '../actions'
import AccountHeader from './AccountHeader'
import AccountList from './AccountList'
import LoadMore from './LoadMore'

class Dashboard extends Component {
  constructor(props) {
  super(props)
  this.state = { lazyLoad: true, sortName: true, ascOrder: true }
  this.loadMore = this.loadMore.bind(this)
  this.sortList = this.sortList.bind(this)
}
  componentDidMount() {
    this.props.fetchAccounts()
  }
  loadMore(){
    this.setState({lazyLoad: false})
  }
  sortList(type){
    //type === 'acntName'? (this.setState((prevState, props) => prevState.sortName?{sortName: true, ascorder: false}:{sortName: true, ascorder: true})) : (this.setState((prevState, props) => !prevState.sortName? {sortName: false, ascorder: true} : {sortName: false, ascOrder: false}))
    if(type === 'acntName'){
      this.setState((prevState, props) => {
        let sortOrder = prevState.sortName ? (prevState.ascOrder ? false : true) : true
        this.props.sortAccounts(this.props.accounts, type, sortOrder)
        return {sortName: true, ascOrder: sortOrder}
      })
    }else{
      this.setState((prevState, props) => {
        let sortOrder = prevState.sortName ? true : (prevState.ascOrder ? false : true)
        this.props.sortAccounts(this.props.accounts, type, sortOrder)
        return {sortName: false, ascOrder: sortOrder}
      })
    }
  }
  render() {
    return (
      <section className="container-fluid">
        <AccountHeader sortList = {this.sortList} sortName = {this.state.sortName} ascOrder = {this.state.ascOrder} />
        <AccountList {...this.props} lazyLoad={this.state.lazyLoad} />
        {this.state.lazyLoad &&
        <LoadMore loadMore = {this.loadMore} />
         }
      </section>
    );
  }
}
AccountList.propTypes = {
  accounts: PropTypes.array.isRequired
}
function mapStateToProps(state) {
  return { accounts: state.accounts }
}

function loadData(store) {
  return store.dispatch(fetchAccounts())
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchAccounts,sortAccounts })(Dashboard)
};
