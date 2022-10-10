
const { connect, connection } = require('mongoose')

connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(_ => console.log('mongoDb Connected'))
    .catch(e => console.log(e['message']))

connection.on('connected', _ => {
    console.log(`mongoose connected to DB`)
})

connection.on('error', e => {
    console.log(e.message)
})

connection.on('disconnect', _ => {
    console.log(`mongoose Disconnected`)
})

process.on(`SIGINT`, async () => {
    await connection.close()
    process.exit(0)
})

