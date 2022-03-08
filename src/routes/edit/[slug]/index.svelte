<script context="module">
  export const prerender = true;
  import { browser, dev } from "$app/env";
  import { prefetchRoutes } from "$app/navigation";
  import { doc, onSnapshot } from "firebase/firestore";
  import { db } from "$lib/js/firebase";

  export async function load(page, stuff) {
    let slug = page.params.slug;
    console.log(slug), stuff;
    let slugArry = slug.split("-");
    console.log(slugArry);
    let index = slugArry[1];
    let proj;
    const unsub = onSnapshot(doc(db, "contacts", slug), (doc) => {
      console.log("Current data: ", doc.data());
      proj = doc.data();
      current.set(proj);
    });
    return { props: { index, proj } };
  }
</script>

<script>
  import { contactList, current } from "$lib/js/store.js";
  import * as QRCode from "qrcode";
  export let slug;
  export let index;
  console.log(index);
  let qr;
  console.log(slug);

  const generateQR = async (text) => {
    try {
      qr = await QRCode.toString(text);
      console.log(qr);
    } catch (err) {
      console.error(err);
    }
  };
  generateQR(`https://akribosqr.vercel.app/${slug}`);
</script>

{#if browser}
  <section class="w-full flex">
    <div
      class="text-gray-500 py-2 px-4 w-full max-w-screen-xl mx-auto flex flex-col"
    >
      <div class="pb-4">
        <h1 class="font-bold text-lg">vCard QR Code</h1>
      </div>
      <div>
        <div class="form-control pb-4">
          <label class="input-group input-group-md">
            <span class="w-32">Your Name:</span>
            <input
              bind:value="{$current.firstname}"
              type="text"
              placeholder="First Name"
              class="input input-bordered input-md"
            />
            <input
              bind:value="{$current.lastname}"
              type="text"
              placeholder="Last Name"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>
      <div>
        <div class="form-control pb-4">
          <label class="input-group input-group-md">
            <span class="w-32">Contact:</span>
            <input
              bind:value="{$current.contact}"
              type="text"
              placeholder="Mobile"
              class="input input-bordered input-md"
            />
          </label>
        </div>

        <div class="form-control pb-4">
          <label class="input-group input-group-md">
            <span class="w-32">Landline:</span>
            <input
              bind:value="{$current.landline}"
              type="text"
              placeholder="Phone"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>
      <div>
        <div class="form-control pb-4">
          <label class="input-group input-group-md">
            <span class="w-32">Email:</span>
            <input
              bind:value="{$current.email}"
              type="text"
              placeholder="your@email.com"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>
      <div>
        <div class="form-control pb-4">
          <label class="input-group input-group-md">
            <span class="w-32">Company:</span>
            <input
              bind:value="{$current.company}"
              type="text"
              placeholder="Company"
              class="input input-bordered input-md"
            />
            <input
              bind:value="{$current.job}"
              type="text"
              placeholder="Your Job"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>
      <div>
        <div class="form-control pb-4">
          <label class="input-group input-group-md">
            <span class="w-32">Adress:</span>
            <input
              bind:value="{$current.adress}"
              type="text"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>

      <div>
        <div class="form-control pb-4">
          <label class="input-group input-group-md">
            <span class="w-32">Website:</span>
            <input
              bind:value="{$current.website}"
              type="text"
              placeholder="www.your-website.com"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>
      <div>
        <button on:click="{() => {}}" class="rounded-lg btn"
          >Save Contacts</button
        >
      </div>
    </div>
    <div class="w-56 h-56">
      {@html qr}
    </div>
  </section>
{/if}
