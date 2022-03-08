<script>
  import { auth } from "$lib/js/firebase.js";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { request } from "$lib/fetch.js";
  import { browser } from "$app/env";

  let email, password;
  const login = async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = userCredential._tokenResponse.idToken;
    await request("/auth", "POST", { idToken });
    window.location.replace("/");
  };

  // const firebase =
  //   browser &&
  //   (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
</script>

<div>
  <h1>Login</h1>
  <input bind:value="{email}" type="text" />
  <input bind:value="{password}" type="password" />
  <button on:click="{login}">Continue</button>
</div>
