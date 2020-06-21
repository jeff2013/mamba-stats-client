const performRequest = (p, history, removeLoading) => {
    return p().then(_ => {
            complete(removeLoading)
        }).catch(err => {
        // Unauthenticated JWT
        if (err && err.response && err.response.status === 403) {
            setTimeout(() => {
                history.push('/login', []);
            }, 1500)
        };
    })
} 

const complete = (r) => {
    setTimeout(() => {
        r(true)
    }, 500)
}

export default performRequest