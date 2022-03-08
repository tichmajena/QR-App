<script>
  import Header from "$lib/header/Header.svelte";
  import { contactList } from "$lib/js/store.js";
  import "../app.css";
</script>

<header />

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

<main class="flex flex-row p-8 bg-akriblue-500">
  <div class="w-1/2 ">
    <ul>
      {#each $contactList as contact, index}
        <div class="flex flex-row ">
          <div
            class="xl:w-1/2 w-full flex flex-row bg-akriblue-600 rounded-lg mb-4 md:text-2xl"
          >
            <div class="flex items-center md:pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="md:h-8 md:w-8 w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <li class=" p-4 ">
                <div class="md:flex md:flex-row">
                  {contact.firstname}
                  {contact.lastname}
                </div>
                <div>
                  {contact.contact}
                </div>
                <div
                  class="w-full flex flex-col md:flex-row md:justify-between"
                >
                  <div class="w-1/2" />
                  <div class="w-1/2 md:flex md:flex-row space-y-2 ">
                    <div class="md:p-2">
                      <a
                        class="py-1 px-1  rounded-md bg-akriblue-700"
                        href="/{contact.id}">Open</a
                      >
                    </div>
                    <div>
                      <a
                        class="py-1 px-2 rounded-md bg-akriblue-700"
                        href="/edit/{contact.id}">Edit</a
                      >
                    </div>
                  </div>
                </div>
              </li>
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
  <div class="w-1/2">
    <!-- 3/4 -->
    <slot />
  </div>
</main>

<footer />
