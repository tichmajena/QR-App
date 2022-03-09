<script context="module">
  export const prerender = true;
  import { browser, dev } from "$app/env";
  import { prefetchRoutes } from "$app/navigation";
  import { doc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
  import { db } from "$lib/js/firebase";
  import { contactList, current, contact_id } from "$lib/js/store.js";
  import { fade } from "svelte/transition";
  import QR from "$lib/components/QR.svelte";
  import Animate from "$lib/components/Animate.svelte";

  export async function load(page, stuff) {
    let slug = page.params.slug;

    let slugArry = slug.split("-");

    let index = slugArry[1];
    let proj;
    const unsub = onSnapshot(doc(db, "contacts", slug), (doc) => {
      proj = doc.data();
      current.set(proj);
      contact_id.set(slug);
    });
    return { props: { index, proj } };
  }

  function getContact() {
    var reader = new FileReader();
    var out = new Blob([response.data], { type: "application/pdf" });
    reader.onload = function (e) {
      window.location.href = reader.result;
    };
    reader.readAsDataURL(out);

    // var blob = new Blob([response.data], { type: "application/pdf" });
    var fileURL = URL.createObjectURL(out);
    var a = document.createElement("a");
    a.href = fileURL;
    a.target = "_blank";
    a.download = "lkn_" + id + ".pdf";
    document.body.appendChild(a);
    a.click();
  }
</script>

<script>
  import * as QRCode from "qrcode";
  export let slug;
  export let index;

  let qr = "";
  let qrc = "";
  let urlInput;
  let copied = false;

  $: vcard =
    browser &&
    `BEGIN:VCARD
N: ${$current.firstname}; ${$current.lastname};;;
FN: ${$current.firstname} ${$current.lastname}
TITLE: ${$current.job}
ORG: ${$current.company}
TEL;CELL:${$current.contact}
TEL;WORK:${$current.landline}
EMAIL;EMAIL:${$current.email}
URL;WEBSITE:${$current.website}
END:VCARD`;

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

  const editContact = async () => {
    await updateDoc(doc(db, "contacts", $contact_id), $current);
  };

  const deleteContact = async () => {
    await deleteDoc(doc(db, "contacts", $contact_id));
    window.location.replace("/");
  };

  const generateQR = async (text) => {
    try {
      qr = await QRCode.toString(text);
    } catch (err) {
      console.error(err);
    }
  };

  const generateQRC = async (text) => {
    try {
      qrc = await QRCode.toString(text);
    } catch (err) {
      console.error(err);
    }
  };

  function getSVG(content, fileName, contentmeta) {
    let vcardData = content;
    const a = document.createElement("a");
    let file = new Blob([vcardData], { meta: contentmeta });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function copyURL() {
    urlInput.select();
    document.execCommand("copy");
    copied = true;

    setTimeout(() => {
      copied = false;
      //urlInput.deselect();
    }, 3000);
  }

  $: rqrc = qrc;
  $: rqr = qr;

  $: {
    $current;
    generateQRC(vcard);
    generateQR(`https://akribosqr.vercel.app/${$contact_id}`);
  }
</script>

{#if browser}
  {#key $current}
    <Animate>
      <section class="w-full flex flex-col md:flex-row bg-akriblue-500">
        <div
          class="py-2 px-4 w-full md:w-3/4 max-w-screen-xl mx-auto flex flex-col"
        >
          <div class="text-4xl text-white mb-5">
            {$current.firstname}{" "}
            {$current.lastname}
          </div>
          <div class="pb-4">
            <h1 class="font-medium uppercase text-lg text-akriblue-200">
              Contact Details
            </h1>
          </div>
          <div>
            <div class="form-control pb-4">
              <label class="input-group input-group-md">
                <span class="w-32 bg-akriblue-600 text-akriblue-200">Name:</span
                >
                <input
                  bind:value="{$current.firstname}"
                  type="text"
                  placeholder="First Name"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
                <input
                  bind:value="{$current.lastname}"
                  type="text"
                  placeholder="Last Name"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
              </label>
            </div>
          </div>
          <div>
            <div class="form-control pb-4">
              <label class="input-group input-group-md">
                <span class="w-32 bg-akriblue-600 text-akriblue-200"
                  >Contact:</span
                >
                <input
                  bind:value="{$current.contact}"
                  type="text"
                  placeholder="Mobile"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
              </label>
            </div>

            <div class="form-control pb-4">
              <label class="input-group input-group-md">
                <span class="w-32 bg-akriblue-600 text-akriblue-200"
                  >Landline:</span
                >
                <input
                  bind:value="{$current.landline}"
                  type="text"
                  placeholder="Phone"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
              </label>
            </div>
          </div>
          <div>
            <div class="form-control pb-4">
              <label class="input-group input-group-md">
                <span class="w-32 bg-akriblue-600 text-akriblue-200"
                  >Email:</span
                >
                <input
                  bind:value="{$current.email}"
                  type="text"
                  placeholder="your@email.com"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
              </label>
            </div>
          </div>
          <div>
            <div class="form-control pb-4">
              <label class="input-group input-group-md">
                <span class="w-32 bg-akriblue-600 text-akriblue-200"
                  >Company:</span
                >
                <input
                  bind:value="{$current.company}"
                  type="text"
                  placeholder="Company"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
                <input
                  bind:value="{$current.job}"
                  type="text"
                  placeholder="Your Job"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
              </label>
            </div>
          </div>
          <div>
            <div class="form-control pb-4">
              <label class="input-group input-group-md">
                <span class="w-32 bg-akriblue-600 text-akriblue-200"
                  >Adress:</span
                >
                <input
                  bind:value="{$current.adress}"
                  type="text"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
              </label>
            </div>
          </div>

          <div>
            <div class="form-control pb-4">
              <label class="input-group input-group-md">
                <span class="w-32 bg-akriblue-600 text-akriblue-200"
                  >Website:</span
                >
                <input
                  bind:value="{$current.website}"
                  type="text"
                  placeholder="www.your-website.com"
                  class="input input-bordered input-md bg-akriblue-400 text-white"
                />
              </label>
            </div>
          </div>
          <div>
            <button
              on:click="{editContact}"
              class="rounded-lg btn bg-akriblue-700 border-akriblue-700 hover:border-akriblue-800 hover:bg-akriblue-800 transition"
              >Save Contacts</button
            >
          </div>
        </div>

        <QR>
          <div class="flex flex-col mt-12 w-full md:w-1/4 ">
            <div class="w-full flex flex-row justify-end pr-4 text-white">
              <button
                on:click="{deleteContact}"
                class="btn btn-sm mb-3 items bg-red-700 border-red-700"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>Delete Contact</button
              >
            </div>
            <div class="w-60 mb-6 rounded-lg bg-akriblue-600 p-4">
              <div class="text-white font-medium uppercase mb-3">
                Contact Details QR
              </div>
              {@html rqrc}

              <div class="flex space-x-2 mt-4">
                <button
                  on:click="{() => generateQRC(vcard)}"
                  class="btn bg-akriblue-300 border-akriblue-300 btn-sm"
                  >Generate</button
                >
                <button
                  on:click="{() =>
                    getSVG(
                      qrc,
                      `${$current.firstname}_${$current.lastname}_d.svg`,
                      'text/svg'
                    )}"
                  disabled="{!qrc}"
                  class="btn bg-akriblue-300 border-akriblue-300 btn-sm"
                  >Download</button
                >
              </div>
            </div>
            <div class="w-60 mb-6 rounded-lg bg-akriblue-600 p-4">
              <div class="text-white font-medium uppercase mb-3">
                Contact Card QR
              </div>

              <div class="flex items-center mb-4 space-x-2">
                url: <input
                  bind:this="{urlInput}"
                  class="input input-xs ml-2 w-full bg-akriblue-400 selection:bg-akriblue-400"
                  type="text"
                  value="https://akribosqr.vercel.app/{$contact_id}"
                />
                <button
                  on:click="{copyURL}"
                  class:bg-akriblue-400="{!copied}"
                  class:bg-white="{copied}"
                  class:text-akriblue-400="{copied}"
                  class="p-1 rounded-lg transition duration-700"
                  ><svg
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg></button
                >
              </div>
              {#if copied}
                <div
                  transition:fade
                  class="text-xs text-akriblue-200 italic text-center mb-3"
                >
                  copied to clipboard!
                </div>
              {/if}
              {@html rqr}
              <div class="flex space-x-2 mt-4">
                <button
                  on:click="{() =>
                    generateQR(`https://akribosqr.vercel.app/${$contact_id}`)}"
                  class="btn bg-akriblue-300 border-akriblue-300 btn-sm"
                  >Generate</button
                >
                <button
                  on:click="{() =>
                    getSVG(
                      qr,
                      `${$current.firstname}_${$current.lastname}_c.svg`,
                      'text/svg'
                    )}"
                  disabled="{!qr}"
                  class="btn bg-akriblue-300 border-akriblue-300 btn-sm"
                  >Download</button
                >
              </div>
            </div>
          </div>
        </QR>
      </section>
    </Animate>
  {/key}
{/if}
