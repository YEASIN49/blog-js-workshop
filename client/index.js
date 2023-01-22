const updateForm = document.getElementById('createForm')

// THIS IS AN EVENT LISTENER WHICH WILL RUN WHEN WE CLICK THE UPDATE BUTTON
updateForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const bodyParam = new URLSearchParams( new FormData(updateForm) )
    
        //CALLING UPDATE API
        fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            body: bodyParam
        })
        .then(res => {
            console.log( res )
            if(res.status !== 200){
                alert('Unable to post')
                return
            }
            alert('Done')
            // return res.json()
        })
        
        .catch(err => {
            // alert(err.message)
            console.error({ err })
        })
});


//  DELETE 

const deleteForm = document.getElementById('deleteForm')
deleteForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const bodyParam = new URLSearchParams( new FormData(deleteForm) )
        //CALLING UPDATE API
        fetch('http://localhost:5000/api/posts/delete' , {
            method: 'DELETE',
            body: bodyParam
        })
        .then(res => {
            if(res.status !== 200){
                alert('Unable to delete')
                return
            }
            alert('Deleted')
        })
        .catch(err => {
            // alert(err.message)
            console.error({ err })
        })
});


//  REGISTRATION 

const registerForm = document.getElementById('register')
registerForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const bodyParam = new URLSearchParams( new FormData(registerForm) )
    
        //CALLING UPDATE API
        fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            body: bodyParam
        })
        .then(res => {
            if(res.status !== 200){
                alert('Unable to register')
                return
            }
            alert('Registration Complete')
        })
        .catch(err => {
            // alert(err.message)
            console.error({ err })
        })
});

// GET ALL POST
function getAll(){
    fetch('http://localhost:5000/api/posts')
        .then(res => {
            if(res.status !== 200){
                alert('Unable to update')
                return
            }
            return res.json()
        })
        .then( parsedRes => {
            const container = document.getElementById('post-container')
            let postMarkup = null
            parsedRes.forEach( item => {
                console.log({ item })
                postMarkup = postMarkup ? ( 
                    postMarkup +
                    `<div style="border: 1px solid gray; width: 400px; padding: 5px"> 
                        <h4>Title: ${ item.title }</h4>
                        <p>Author: ${ item.username }</p>
                        <p>Post ID: ${ item._id }</p>
                        <p>Description: ${ item.description }</p>
                    </div>`
                )
                : 
                (
                    `<div style="border: 1px solid gray; width: 400px; padding: 5px"> 
                        <h4>Title: ${ item.title }</h4>
                        <p>Author: ${ item.username }</p>
                        <p>Post ID: ${ item._id }</p>
                        <p>Description: ${ item.description }</p>
                    </div>`
                )
            })
        
            

            //CLEANING EXISTING MOVIE HTML NODE/ELEMENT
            while (container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }

            // Adding new movie data markup
            container.insertAdjacentHTML('beforeend', postMarkup)

            
        })
        .catch(err => {
            // alert(err.message)
            console.error({ err })
        })
}