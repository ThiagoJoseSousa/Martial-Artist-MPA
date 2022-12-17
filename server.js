import { createServer } from 'http';
import { readFile , appendFile} from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const server= createServer((request,response)=> {
    const {url,method}= request;
    if (method==='POST') {
        let body=[];
        request.on('data', chunk => {
            console.log('A chunk of data has arrived: ', chunk);
            body.push(chunk)
          });
          request.on('end', () => {
            console.log('No more data');
            body=Buffer.concat(body).toString()
            console.log(body)
            appendFile('CRISTIANO.txt',body,(err)=>{
          if (err) console.log(err)

          readFile('CRISTIANO.txt',(err,data)=> {
              console.log(data, 'file reading')
            response.setHeader('Content-Type','text/plain')
            response.end(data,'utf-8')
          })
      })  
          })

    return
    }
    const __filename=fileURLToPath(import.meta.url);
    const __dirname=dirname(__filename)
    let filePath= join(__dirname,url ==='/'?'src/index.html':url.replace(/%20/g, ' '))

    let contentType= 'text/html';

    let mimeType=extname(filePath);

    switch(mimeType){
        case '.png': contentType='image/png'; break;
        case '.jpg': contentType='image/jpg'; break;
        case '.gif': contentType='image/gif'; break;
        case '.css': contentType='text/css'; break;
        case '.js': contentType='text/javascript'; break;
    }

    readFile(filePath, (err,data)=>{
        if(err) {
            console.log(err,url)
        }
        response.setHeader('Content-Type', contentType);
        response.end(data, 'utf-8')
    })
})
server.listen(8080)

 function saveComment(formData, path){
    appendFile(path,formData.get('username'), (err)=>{
        if(err){console.log(err)}
    })
}