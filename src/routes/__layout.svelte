<script>
  import Header from "$lib/header/Header.svelte";
  import { contactList } from "$lib/js/store.js";
  import { page } from "$app/stores";
  import "../app.css";
</script>

<header></header>

<nav>
  <ul class="flex justify-center space-x-8 ">
    <li class="hover:text-gray-800 text-gray-500">
      <a href="/">Home</a>
    </li>
    <li class="hover:text-gray-800 text-gray-500">
      <a href="/profile">Profile</a>
    </li>
    <li class="hover:text-gray-800 text-gray-500">
      <a href="/login">Login</a>
    </li>
    <li class="hover:text-gray-800 text-gray-500">
      <a href="/">Logout</a>
    </li>
    <li class="hover:text-gray-800 text-gray-500">
      <a href="/signup">Sign Up</a>
    </li>
  </ul>
</nav>

<main class="flex flex-col-reverse md:flex-row p-8 bg-akriblue-500">
  <div
    class="w-full md:w-1/4 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-akriblue-600 scrollbar-track-akriblue-500  scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
  >
    <a href="/" class="btn bg-akriblue-600 border-akriblue-600 mb-2">Add New</a>
    <ul class="flex flex-col-reverse">
      {#each $contactList as contact, index}
        <div class="flex flex-row ">
          <div
            class="w-full overflow-clip flex flex-col bg-akriblue-400 shadow-2xl rounded-lg mr-8 my-3 relative md:text-xl {$page.url.pathname.indexOf(
              contact.id
            ) > -1
              ? 'hover:bg-gray-200 hover:bg-opacity-100'
              : 'hover:bg-akriblue-300 hover:bg-opacity-30'}  bg-opacity-30 transition"
            class:bg-white="{$page.url.pathname.indexOf(contact.id) > -1}"
            class:bg-opacity-100="{$page.url.pathname.indexOf(contact.id) > -1}"
          >
            <div class="flex flex-row px-3 pt-3">
              <div
                class="flex w-16 h-16 mt-2 justify-center items-center bg-akriblue-500 rounded-full transition"
                class:bg-gray-400="{$page.url.pathname.indexOf(contact.id) >
                  -1}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="md:h-10 md:w-10 w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div class="w-9/12">
                <li
                  class=" p-4 "
                  class:text-akriblue-500="{$page.url.pathname.indexOf(
                    contact.id
                  ) > -1}"
                >
                  <div class="md:flex md:flex-row text-xl">
                    {contact.firstname}
                    {contact.lastname}
                  </div>

                  <div class="text-sm">
                    {contact.job}
                  </div>
                  <div
                    class="w-full flex flex-col md:flex-row md:justify-between"
                  >
                    <div class="w-1/2"></div>
                  </div>
                </li>
              </div>
            </div>
            <div class="flex flex-row justify-end space-x-2 p-3">
              <a
                class="btn btn-sm bg-akriblue-500 border-akriblue-500 hover:border-akriblue-600 hover:bg-akriblue-600 transition"
                href="/{contact.id}">Open</a
              >

              <a
                class="btn btn-sm bg-akriblue-500 border-akriblue-500 hover:border-akriblue-600 hover:bg-akriblue-600 transition"
                href="/edit/{contact.id}">Edit</a
              >
            </div>
          </div>

          <!-- <div class="hover flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </div> -->
        </div>
      {/each}
    </ul>
  </div>
  <div class="w-full md:w-3/4 h-screen ">
    <!-- 3/4 -->
    <slot />
  </div>
</main>

<footer></footer>
