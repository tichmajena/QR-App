<script>
  import { auth } from "$lib/js/firebase.js";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { request } from "$lib/fetch.js";

  let email, password;
  const login = async () => {
    const userCredintial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = userCredintial._tokenResponse.idToken;
    await request("auth", "POST", { idToken });
    window.location.replace("/");
  };
</script>

<div>
  <h1>Login</h1>
  <input bind:value={email} type="text" />
  <input bind:value={password} type="password" />
  <button on:click={login}>Continue</button>
</div>
