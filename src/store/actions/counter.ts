

export function add2(dispatch: any) {

    dispatch({
        type: "increment",
        payload: 1,
    })
}

export function remove2(dispatch: any) {


    dispatch({
        type: "decrement",
        payload: 1,
    })
}
