<script>
  import Header from "$lib/header/Header.svelte";
  import { contactList } from "$lib/js/store.js";
  import "../app.css";
</script>

<header />

<main class="flex flex-row p-8">
  <div class="w-1/4">
    <ul>
    {#each $contactList as contact, index}
    <li>
      {contact.firstname}
      {contact.lastname}
<a href="/contact-{index}">Open</a>    </li>
    {/each}
  </ul>
  </div>
  <div class="3/4">
    <slot />
  </div>
</main>

<footer />
