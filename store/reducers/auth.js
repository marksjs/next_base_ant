export default function auth(state = {email: '', password: '', loading: false}, action) {
  switch (action.type) {
    case 'PROFILE':
      return {...state, profile: action.profile, loading: false};
    case 'ERROR':
      return {loading: false};
    case 'PROCESSING':
      return {loading: true};
    default:
      return state
  }
}