import React from "react";
import Modal from "./Modal";

const PostModal = ({ post, onClose }) => {
  return (
      <Modal title={post.subject} onClose={onClose} width={600} height={400}>
        <div className="p-5">
          <p>{post.content || "내용이 없습니다"}</p>
        </div>
      </Modal>
  );
};

export default PostModal;