const http=require('http')
const formEle= document.getElementById('form')

formEle.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData= new FormData(e.target)
    createComment(formData)

    const options= {
        port:8080,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }
    }

    requestSave(options, formData)
})

const commentsEle = document.getElementById('comments');

function createComment(formData){
    const wrapper=document.createElement('div')
    if (formData.get('username')){
        const username= document.createElement('p')
        username.textContent=formData.get('username');
        wrapper.appendChild(username)
    }
    if(formData.get('user-comment')) {
        const comment=document.createElement('p');
        comment.textContent=formData.get('user-comment')
        
        wrapper.appendChild(comment)
    }
    commentsEle.appendChild(wrapper)
}

// function readComment(){
//    //change of style 
// }

function deleteComment(e) {
    const p= e.target.parentElement();
    commentsEle.removeChild(p)
}

function editComment (e){
    const p=e.target.parentElement();
    const input= document.createElement('input')
    input.setAttribute('type','text');
    p.textContent='';
    p.appendChild(input)
}

function requestSave(options,formData){
    console.log(options)
    const req= http.request(options, (res)=>{
    console.log(`statusCode: ${res.statusCode}`)
        res.on('data', (d)=>{
           const newComment=document.createElement('p');
           newComment.textContent=d;
           commentsEle.appendChild(newComment)
        })
    })
    console.log(req)
    req.on('error', (error)=>{
        console.error(error)
    })
        req.write(JSON.stringify(formData.get('username')))
        req.write(JSON.stringify(formData.get('user-comment')))
        req.end()

}