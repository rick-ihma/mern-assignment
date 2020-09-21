const currentUser = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          ...action.payload,
          loggedIn: true
        }
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...action.payload,
          loggedIn: false
        }
      };
    default:
      return {
        ...state,
        user:{
          loggedIn:false
        }
      }
  }
};

export default currentUser;
