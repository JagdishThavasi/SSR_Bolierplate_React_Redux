import axios from 'axios'

export const FETCH_ACCOUNTS = 'fetch_accounts'
export const SORT_ACCOUNTS = 'sort_accounts'
export const fetchAccounts = () => async dispatch => {
  const res = await axios.post('http://localhost:9000/load',{'loadCount':6})
  dispatch({
    type: FETCH_ACCOUNTS,
    payload: sortData(res.data, 'acntName', true)
  });
};

export const sortAccounts = (data, type, order) => dispatch => {
  dispatch({
    type: SORT_ACCOUNTS,
    payload: sortData(data, type, order)
  })
}
const sortOrder = order => order ? 1 : -1

const sortData = (data, type, order) => data.sort((a,b) => (a[type] > b[type]) ? sortOrder(order) : ((b[type] > a[type]) ? sortOrder(!order) : 0))
