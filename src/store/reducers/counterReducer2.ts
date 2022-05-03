

export function counterReducer2(state: any, action: any) {
  console.log(state.counter2);
    switch (action.type) {
      case "increment":
        return {
          ...state,
          counter2: state.counter2 + 1,
        };
  
      case "decrement":
        return {
          ...state,
          counter2: state.counter2 - 1,
        };
      default:
        return state;
    }
  }