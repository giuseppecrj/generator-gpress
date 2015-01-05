module.exports = {
  db: 'mongodb://localhost:1234/<%= _.dasherize(appname) %>',
  sessionSecret: '<%= makeSecret() %>'
}