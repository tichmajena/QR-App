<script context="module">
  import { browser, dev } from "$app/env";
  import { prefetchRoutes } from "$app/navigation";
  import { doc, onSnapshot } from "firebase/firestore";
  import { db } from "$lib/js/firebase";
  import { contactList, current } from "$lib/js/store.js";

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
  export let index = 0;
  export let proj;
  console.log(proj);

  let projojo;

  $: $current = proj;
  $: console.log($current);
  console.log(index);
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
  // ADR;WORK:;;${$current.address};;;;
  // URL;WEBSITE:${$current.website}
  // END:VCARD`;

  console.log(index);
  function downloadVCard(content, fileName, contentmeta) {
    console.log(content);
    let vcardData = content;
    const a = document.createElement("a");
    let file = new Blob([vcardData], { meta: contentmeta });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function getVCard(content, fileName, contentmeta) {
    console.log(content);
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
  console.log($contactList);
</script>

<section class="w-full">
  <div
    class="w-full max-w-screen-xl h-screen mx-auto flex flex-col bg-akriblue-500 justify-center items-center "
  >
    <div class="flex justify-center p-8">
      <div
        class="flex card bg-gray-200 shadow-xl md:text-3xl md:p-8 p-4 lg:w-1/2 justify-items-center"
      >
        {#if $current}
          <div class="flex flex-row space-x-4">
            <div class="avatar flex items-center">
              <div class="w-12 md:w-24 rounded-full shadow-md">
                <img src="acp-circle-favicon-256.png" />
              </div>
            </div>
            <div>
              <div class="flex flex-row space-x-4">
                <div>{$current.firstname}</div>
                <div>{$current.lastname}</div>
              </div>
              <div>{$current.contact}</div>
              <div>{$current.landline}</div>
              <div>{$current.email}</div>
              <div>{$current.website}</div>
              <div>{$current.adress}</div>
            </div>
          </div>
          <button on:click="{handleDownloadVCard}" class="btn"
            >Save Contact</button
          >
          <a
            href="{getVCard(vcard, 'vtest.vcf', 'text/vcard')}"
            download="vtest.vcf"
            class="btn">Drop Contact</a
          >
          <a
            on:click="{() => {
              window.open(getVCard(vcard, 'vtest.vcf', 'text/vcard') + '.vcf');
            }}"
            download="vtest.vcf"
            class="btn">Open Contact</a
          >
        {:else}
          Looding...
        {/if}
      </div>
    </div>
  </div>
</section>
