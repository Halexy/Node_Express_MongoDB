const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse premiere du serveur !');
});

server.listen(process.env.PORT || 3000);