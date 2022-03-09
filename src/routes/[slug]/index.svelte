<script context="module">
  import { browser, dev } from "$app/env";
  import { prefetchRoutes } from "$app/navigation";
  import { doc, onSnapshot } from "firebase/firestore";
  import { db } from "$lib/js/firebase";
  import { contactList, current } from "$lib/js/store.js";

  export async function load(page, stuff) {
    let slug = page.params.slug;

    let slugArry = slug.split("-");
    let index = slugArry[1];
    let proj;
    const unsub = onSnapshot(doc(db, "contacts", slug), (doc) => {
      proj = doc.data();
      current.set(proj);
    });
    return { props: { index, proj } };
  }
</script>

<script>
  export let index = 0;
  export let proj;

  let projojo;

  $: $current = proj;

  // left with company &  job
  //let vcard;
  let vcard =
    browser &&
    `BEGIN:VCARD
  // N: ${$current.firstname}; ${$current.lastname};;;
  // FN: ${$current.firstname} ${$current.lastname}
  // TITLE: XX Group front end
  // TEL;CELL:${$current.contact}
  // TEL;WORK:${$current.landline}
  // EMAIL;WORK:${$current.email}
  // ADR;WORK:;;62 Quorn Avenue;;;;
  // URL;WEBSITE:www.akriboscapital.com
  // END:VCARD`;

  let vcard2 = `BEGIN:VCARD
N: Naruto; Uzamaki;;;
FN: First name and last name
TITLE: XX Group front end
ADR;WORK:;;No.19 GT Road, Fifth Ring District, Beijing;;;;
TEL;CELL,VOICE:159351111111
TEL;WORK,VOICE:010-6666666
URL;WORK:www.gt.com
EMAIL;INTERNET,HOME:253413617@qq.com
END:VCARD`;

  function downloadVCard(content, fileName, contentmeta) {
    let vcardData = content;
    const a = document.createElement("a");
    let file = new Blob([vcardData], { meta: contentmeta });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function getVCard(content, fileName, contentmeta) {
    let vcardData = content;
    const a = document.createElement("a");
    let file = new Blob([vcardData], { meta: contentmeta });
    return URL.createObjectURL(file);
  }

  function getContact(vcardData, id) {
    let reader = new FileReader();
    let out = new Blob([vcardData], { type: "text/vcard" });
    reader.onload = function (e) {
      window.location.href = reader.result;
    };
    reader.readAsDataURL(out);

    // var blob = new Blob([response.data], { type: "application/pdf" });
    let fileURL = URL.createObjectURL(out);
    let a = document.createElement("a");
    a.href = fileURL;
    a.target = "_blank";
    a.download = "lkn_" + id + ".pdf";
    document.body.appendChild(a);
    a.click();
  }

  function handleDownloadVCard() {
    //downloadVCard(vcard, "vtest.vcf", "text/vcard");
    getContact(vcard, "vtest.vcf");
  }
</script>

<section class="w-full bg-akriblue-500">
  <div
    class="w-full max-w-screen-xl h-screen mx-auto flex flex-col bg-akriblue-500 justify-center items-center "
  >
    <div
      class="flex card bg-gray-200 shadow-xl md:w:1/2 lg:w-1/3 md:text-3xl md:p-6 p-4 justify-items-center"
    >
      {#if $current}
        <div class="flex flex-row space-x-4">
          <div class="avatarflex items-center">
            <div class="w-14 rounded-full shadow-md">
              <img src="acp-circle-favicon-256.png" />
            </div>
          </div>
          <div>
            <div class="space-x-4 text-akriblue-500 font-bold text-3xl mb-2">
              {$current.firstname}
              {$current.lastname}
            </div>
            <div class="text-base text-gray-500 mb-2 font-bold">
              {$current.job}
            </div>
            <div class="flex space-x-3 text-akriblue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
              <div class="text-sm text-gray-600">{$current.contact}</div>
            </div>
            <div class="flex space-x-3 text-akriblue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <div class="text-sm text-gray-600">{$current.landline}</div>
            </div>
            <div class="flex space-x-3 text-akriblue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <div class="text-sm text-gray-600">{$current.email}</div>
            </div>
            <div class="flex space-x-3 text-akriblue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                ></path>
              </svg>
              <div class="text-sm text-gray-600">{$current.website}</div>
            </div>
            <div class="flex space-x-3 text-akriblue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <div class="text-sm text-gray-600">{$current.adress}</div>
            </div>

            <button
              on:click="{handleDownloadVCard}"
              class="btn btn-sm bg-akriblue-500 border-akriblue-500 grow-0 mt-4"
              >Save Contact</button
            >
          </div>
        </div>
      {:else}
        <div class="flex flex-row space-x-4">
          <div class="avatarflex items-center">
            <div class="w-14 h-14 rounded-full bg-gray-300 animate-pulse"></div>
          </div>
          <div class="w-full">
            <div
              class="bg-gray-300 rounded-md p-6 animate-pulse mb-4 w-4/5"
            ></div>

            <div class="bg-gray-300 rounded-md p-2 animate-pulse mb-2"></div>
            <div
              class="bg-gray-300 rounded-md p-2 animate-pulse mb-2 w-3/4"
            ></div>
            <div
              class="bg-gray-300 rounded-md p-2 animate-pulse mb-2 w-3/5"
            ></div>
            <div
              class="bg-gray-300 rounded-md p-2 animate-pulse mb-2 w-10/12"
            ></div>

            <div
              class="bg-gray-300 rounded-md p-4 animate-pulse mb-2 w-1/2"
            ></div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>
