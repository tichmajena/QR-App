<script context="module">
  export const prerender = true;
  import { browser, dev } from "$app/env";
  import { prefetchRoutes } from "$app/navigation";
  import { doc, onSnapshot } from "firebase/firestore";
  import { db } from "$lib/js/firebase";
  import { contactList, current, contact_id } from "$lib/js/store.js";

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
  console.log(index);
  let qr;
  let qrc;
  console.log(slug);

  let vcard =
    browser &&
    `BEGIN:VCARD
N: ${$current.firstname}; ${$current.lastname};;;
FN: ${$current.firstname} ${$current.lastname}
TITLE: XX Group front end
TEL;CELL:${$current.contact}
TEL;WORK:${$current.landline}
EMAIL;WORK:${$current.email}
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

  const generateQR = async (text) => {
    console.log(text);

    try {
      qr = await QRCode.toString(text);
    } catch (err) {
      console.error(err);
    }
  };

  const generateQRC = async (text) => {
    console.log(text);
    try {
      qrc = await QRCode.toString(text);
    } catch (err) {
      console.error(err);
    }
  };
  $: browser && generateQR(`https://akribosqr.vercel.app/${$contact_id}`);
</script>

{#if browser}
  <section class="w-full flex bg-akriblue-500">
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
              bind:value={$current.firstname}
              type="text"
              placeholder="First Name"
              class="input input-bordered input-md"
            />
            <input
              bind:value={$current.lastname}
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
              bind:value={$current.contact}
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
              bind:value={$current.landline}
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
              bind:value={$current.email}
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
              bind:value={$current.company}
              type="text"
              placeholder="Company"
              class="input input-bordered input-md"
            />
            <input
              bind:value={$current.job}
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
              bind:value={$current.adress}
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
              bind:value={$current.website}
              type="text"
              placeholder="www.your-website.com"
              class="input input-bordered input-md"
            />
          </label>
        </div>
      </div>
      <div>
        <button on:click={() => {}} class="rounded-lg btn">Save Contacts</button
        >
      </div>
    </div>
    <div>
      <div class="w-56 h-56 m-20">
        {@html qr}
      </div>
      <div class="w-56 h-56 mbt-20">
        {@html qrc}
      </div>
      <button on:click={() => generateQRC(vcard)} class="btn btn-success"
        >GENERATE QR</button
      >
    </div>
  </section>
  {vcard}
{/if}
