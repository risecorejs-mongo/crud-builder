const crudBuilder = require('./index')

const endpoints = crudBuilder({
    model: 'User',
    endpoints: {
        create
    }
})

module.exports = endpoints

// CREATE
function create() {
    return {
        async rules() {
            return {
                name:'required|string',
                role: 'required|string',
                info:"ifExists|required"
            }
        },
        async only() {
            return ['name', "role", "info"]
        },
        response({ instance: user }) {
            return { user }
        }
    }
}
