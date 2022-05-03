
export function add(dispatch: any, data?: {}) {

    console.log(data);

    dispatch({
        type: "increment",
        payload: 5,
    })
}

export function remove(dispatch: any, data?: {}) {

    console.log(data);

    dispatch({
        type: "decrement",
        payload: 5,
    })
}
