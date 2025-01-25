import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { apiBaseUrl } from '../App';
import Loader from './Loader/Loader';

function EditPost(props) {
    const {editPostId, getPost} = props;
    const [title , setTitle] = useState("");
    const [body , setBody ] = useState("");
    const [loading , setLoading] = useState(false)

    useEffect(() => {
      if(editPostId){
        getPostById(editPostId)
      }
    },[editPostId]);

    const getPostById = (postId) => {
      fetch(`${apiBaseUrl}/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data?.title)
        setBody(data?.body)
      })
      .catch((error) => {
        console.log(error)
      })
    }


    const EditPostBtnHandler = (e) => {
             e.preventDefault();
          if (!title || !body) {
            Swal.fire("please add the title and body");
            return
          }

          setLoading(true);
          const payLoad = {
            title,
            body,
          };

          fetch(`${apiBaseUrl}/${editPostId}`,{
            method : "PUT",
            body : JSON.stringify(payLoad),
            headers : {
              "content-type" : "appication/json",
            },
          })
          .then((respone) => respone.json())
          .then(()=>{
            setTitle("");
            setBody("");
            Swal.fire("post is edit succussfully", "", "success")

            const $ = window.$
            $("#edit-post").modal("hide");
            setLoading(false);
            getPost();
          })
          .catch((error) => {
            console.log(error);

            Swal.fire(error , "" , "error")
            setLoading(false)
          });
    }
  return (
     <>
      <div class="modal fade" id="edit-post">
        <Loader loader={loading} />
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
              <h4 class="modal-title">Edit Post</h4>
            </div>
            <div class="modal-body">
              <form 
              action="" method="POST" 
              role="form" 
              id="edit-post-form"
              onSubmit={EditPostBtnHandler}
              >
                <input type="hidden" name="post_id" id="edit_post_id" />
                <div class="form-group">
                  <label for="">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="edit_post_title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label for="">Body</label>
                  <textarea
                    name=""
                    id="edit_post_body"
                    cols="30"
                    rows="10"
                    placeholder="Body"
                    class="form-control"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
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

export default EditPost