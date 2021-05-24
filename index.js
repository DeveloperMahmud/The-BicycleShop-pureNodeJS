
//module
const http = require('http');
const url = require('url');
const fs = require('fs').promises;

// import File
// const bicycles = require('./data/data.json');
// console.log = (bicycles);

// server
const server = http.createServer(async(req, res)=>{
    
    //parsing URL
    const myUrl= new URL(req.url,`https://req.headers`);
    const pathname = myUrl.pathname;
    const id = myUrl.searchParams.get('id');
    
    console.log(req.url);

    //routes
    //homepage
    if(pathname === '/'){
        const html = await fs.readFile('./views/bicycles.html','utf-8');
        res.writeHead(200, {'content-type':'text/html'});
        res.end(html);
    }
    //Overview Page
    else if(pathname === '/bicycle' && id >=0 && id <= 5){
        const html = await fs.readFile('./views/overview.html', 'utf-8');
        // const bicycle = bicycles.find((b) => b.id === id);
        // console.log = (bicycles);

        res.writeHead(200, {'content-type':'text/html'});
        res.end(html);
    }
    //Images
    else if(/\.(png)$/i.test(req.url)){
        const image = await fs.readFile(`./public/images/${req.url.slice(1)}`);
        res.writeHead(200,{'content-type':'image/png'});
        res.end(image);
    }
    else if(/\.(css)$/i.test(req.url)){
        const css = await fs.readFile('./public/css/index.css', 'utf-8');
        res.writeHead(200,{'content-type':'text/css'})
        res.end(css);
    }
    else if(/\.(svg)$/i.test(req.url)){
        const svg = await fs.readFile('./public/images/icons.svg');
        res.writeHead(200, {'content-type': 'image/svg+xml'})
        res.end(svg);
    }
    else{
        res.writeHead(404, {'content-type':'text/html'});
        res.end('<div><h1> Not Found </h1></div>');
    }

    // console.log('server is running...');
    // res.writeHead(200,{'content-type':'text/html'});
    // res.end('<h1>hello Rohan, Whats up? DDos</h1>')
});

server.listen(3000);