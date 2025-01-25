import React, { useState } from 'react'
import { apiBaseUrl } from '../App';
import Swal from 'sweetalert2';
import Loader from './Loader/Loader';


function CreatePost(props) {
    const {getPost}  = props
    const [title , setTitle] = useState("")
    const [body , setBody] = useState("");
    const [loading , setLoading] = useState(false);



    // const createPostHandler = (e) => {
    //       e.preventDefault();
    //     //   console.log("hello")
    //     if(!title || !body){
    //       Swal.fire("please fill title and body")
    //         return;
    //     }   

    //     setLoading(true)
    //     const payLoad = {
    //         title,
    //         body,
    //     }

    //     fetch(apiBaseUrl,{
    //         method : "POST",
    //         headers : {
    //             "content-type" : "application/json"
    //         },
    //         body : JSON.stringify(payLoad)
    //     })
    //     .then((resolve) => resolve.json())
    //     .then(() => {
    //     setTitle("")
    //     setBody("");
    //     setLoading(false);
    //     Swal.fire("post is created successfully" ,"","success")

    //     const $ = window.$;
    //     $("#create-post").modal("hide")
    //     getPost();

    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       setLoading(false);
    //     })

    // }

    const createPostHandler = (e) => {
      e.preventDefault();
      if(!title || !body){
        Swal.fire("please fill the above fields")
        return
      }
      setLoading(true)
      const payLoad = {
        title,
        body,
      }

      fetch(apiBaseUrl,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(payLoad)
      })
      .then((res) => res.json())
      .then(() => {
        setTitle("")
        setBody("")
        setLoading(false)
        Swal.fire("post is created successfully" ,"", "success")

        const $ = window.$
        $("#create-post").modal("hide") 
        getPost();

      })
      .catch((error) => {
        console.log(error,"error")
        setLoading(false)
      })      

    }    

  return (
    <>
      <div class="modal fade" id="create-post">
        <Loader loader={loading}/>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 class="modal-title">Create Post</h4>
            </div>
            <div class="modal-body">
              <form 
              action="" 
              method="POST" 
              role="form" 
              id="create-post-form"
              onSubmit={createPostHandler}
              >
                <div class="form-group">
                  <label for="">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="post_title"
                    placeholder="Title"
                    value = {title}
                    onChange={(e) =>setTitle(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label for="">Body</label>
                  <textarea
                    name=""
                    id="post_body"
                    cols="30"
                    rows="10"
                    placeholder="Body"
                    class="form-control"
                    value = {body}
                    onChange={(e) =>setBody(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" class="btn btn-primary" disabled={loading}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost