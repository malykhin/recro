import mapValues from 'lodash/mapValues'

export default function bindDispatch(actions, dispatch) {
  return mapValues(actions, (action) => (...args) => dispatch(action.apply(this, args)))
}
