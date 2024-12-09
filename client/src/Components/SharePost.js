import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { savePost } from "../Features/PostSlice";
import { Input, Button } from "reactstrap";

const SharePosts = () => {
  const [postMsg, setpostMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.users.user.email);
  const handlePost = async () => {
    // Validate that postMsg is not empty
    // trim it's speces and some people enter space and we not need it 
    if (!postMsg.trim()) {
      alert("Post message is required."); // Display an alert or set an error state
      return; // Exit the function early if validation fails
    }

    const postData = {
      postMsg: postMsg,
      email: email,
    };

    dispatch(savePost(postData)); // Dispatch the savePost thunk from the Posts Slice.
    setpostMsg(""); //clear the text area after posting

  };

  return (
    <div className="PostShare">
      <h1>Share.Connect.</h1>
      <Input value={postMsg} type="textarea" name="share" onChange={(e)=>setpostMsg(e.target.value)} />
      <Button onClick={() => handlePost()}> PostIT</Button>
    </div>

  );
};

export default SharePosts;
