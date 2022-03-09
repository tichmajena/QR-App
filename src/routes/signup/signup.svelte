<script>
  import { auth } from "$lib/js/firebase.js";
  import {
    createUserWithEmailAndPassword,
    updateProfile,
    getIdToken,
  } from "firebase/auth";
  import { request } from "$lib/fetch.js";

  let username, email, password;
  const signup = async () => {
    const userRecord = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userRecord.user, { displayName: username });
    const idToken = await getIdToken(userRecord.user, true);
    await request("/auth", "POST", { idToken });
    window.location.replace("/");
  };
</script>

<div>
  <h1>Create an account</h1>
  <p>Username</p>
  <input bind:value={username} type="text" />
  <p>Email</p>
  <input bind:value={email} type="text" />
  <p>Password</p>
  <input bind:value={password} type="password" />
  <button on:click={signup}>Continue</button>
</div>
