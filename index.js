const http = require('http');

const PORT = 3000;

const friends = [
   { id: 0,
    name: 'Ryan Dohl',
},
    {
      id: 1,
      name: 'Dan Biggolo'
    },

    {
        id: 2,
        name: 'San Chris'
    }
]

const server = http.createServer((req, res) => {
    const items = req.url.split('/')
    if(req.method === 'POST' && items[1] === 'friends'){ 
     req.on('data', (data) => {
        const friend = data.toString()
        console.log('Request', friend)
        friends.push(JSON.parse(friend))
        req.pipe(res);
     });
      
    }
    

    else if(req.method === 'GET' && items[1] === 'friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        if(items.length === 3) {
         const friendIndex = Number(items[2])
         res.end(JSON.stringify(friends[friendIndex]))
        }
        else {
        res.end(JSON.stringify(friends))
        }
            
     } 
     else if(req.method === 'GET' && items[1] === 'messages') {
         res.setHeader('Content-Type', 'text/html')
         res.write('<html>');
         res.write('<body>');
         res.write('<ul>');
         res.write('<li>Hello, my name is Ryan Dohl, i invented Nodejs</li>');
         res.write('<li>would you like to learn more about backend dev?</li>');
         res.write('</ul>');
         res.write('</body>');
         res.write('</html>');
         res.end()
     }
     else {
        res.statusCode = 404;
     }
     res.end()
})

server.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`)
});