import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(id: $id, input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost({ variables: { title, body } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Body"
        />
        <button type="submit">Create Post</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.createPost && (
        <div>
          <h2>Newly created post:</h2>
          <p>ID: {data.createPost.id}</p>
          <p>Title: {data.createPost.title}</p>
          <p>Body: {data.createPost.body}</p>
        </div>
      )}
    </div>
  );
}

function UpdatePostForm() {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePost({ variables: { id, title, body } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="Post ID"
        />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New Title"
        />
        <input
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="New Body"
        />
        <button type="submit">Update Post</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.updatePost && (
        <div>
          <h2>Updated post:</h2>
          <p>ID: {data.updatePost.id}</p>
          <p>Title: {data.updatePost.title}</p>
          <p>Body: {data.updatePost.body}</p>
        </div>
      )}
    </div>
  );
}

function DeletePostForm() {
  const [id, setId] = useState('');
  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deletePost({ variables: { id } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="Post ID"
        />
        <button type="submit">Delete Post</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.deletePost && (
        <div>
          <h2>Post deleted successfully</h2>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>GraphQL Blog Mutations</h1>
      <CreatePostForm />
      <UpdatePostForm />
      <DeletePostForm />
    </div>
  );
}

export default App;