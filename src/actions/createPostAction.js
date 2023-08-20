import { redirect } from "react-router-dom";

export default async function createPostAction({request}) {
    const formData = await request.formData();
    const postData = Object.fromEntries(formData); // { body: '...', author: '...' }
    await fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return redirect('/');
  }