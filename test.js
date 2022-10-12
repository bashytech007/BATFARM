
const http = require("http");
const url=require('url');
const fs = require("fs");
const replaceTemplate=require('./modules/replaceTemplate.js')

const port=process.env.port||8000;

 


const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data); 

const server=http.createServer((req,res)=>{
   
    const {query,pathname}=url.parse(req.url,true);
    // console.log(query)
    // console.log(req.url);
    // console.log(url.parse(req.url,true));
    

    // Overview Page
    if(pathname==='/'||pathname==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'
    })

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    

    //Product page
    }else if(pathname==='/product'){
        res.writeHead(200,{'Content-type':'text/html'
    })
        const product=dataObj[query.id];
        const output=replaceTemplate(tempProduct,product);
        res.end(output);

        // API
    }else if(pathname==='/api'){
            res.writeHead(200,{'Content-type':'application/json'
        })
        
            res.end(data);
      
        //NOT found
       
    }else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-won-header':'hello-world'
        });
        res.end('<h1>Page not Found!</h1>')
    }
})
server.listen(port ,()=>{
    console.log('server is cooking on port 8000');
})