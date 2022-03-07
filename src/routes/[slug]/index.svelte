<script context="module">
  import { browser, dev } from "$app/env";
  // export const prerender = true;
  export const router = browser;
  import { prefetchRoutes } from "$app/navigation";

  export async function load(page, stuff) {
    let slug = page.params.slug;
    console.log(slug), stuff;
    let slugArry = slug.split("-");
    console.log(slugArry);
    let index = slugArry[1];
    return { props: { index } };
  }
</script>

<script>
  import { contactList } from "$lib/js/store.js";
  import { base } from "$app/paths";

  console.log(base);
  export let index = 0;

  console.log(index);
  browser && console.log($contactList[0].firstname);
  // left with company &  job
  //let vcard;
  let vcard =
    browser &&
    `BEGIN:VCARD
  // N: ${$contactList[index].firstname}; ${$contactList[index].lastname};;;
  // FN: ${$contactList[index].firstname} ${$contactList[index].lastname}
  // TITLE: XX Group front end
  // TEL;CELL:${$contactList[index].contact}
  // TEL;WORK:${$contactList[index].landline}
  // EMAIL;WORK:${$contactList[index].email}
  // ADR;WORK:;;${$contactList[index].address};;;;
  // URL;WEBSITE:${$contactList[index].website}
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

  function handleDownloadVCard() {
    downloadVCard(vcard, "vtest.vcf", "text/vcard");
  }
  console.log($contactList);
</script>

{#if browser}
  <section class="w-full">
    <div class="w-full max-w-screen-xl mx-auto flex flex-col ">
      <div class="flex justify-center p-8">
        <div
          class="flex card bg-base-100 shadow-xl md:text-3xl md:p-8 p-4 lg:w-1/2 justify-items-center"
        >
          <div class="flex flex-row space-x-4">
            <div class="avatar flex items-center">
              <div class="w-12 md:w-24 rounded-full">
                <img src="https://api.lorem.space/image/face?hash=27312" />
              </div>
            </div>
            <div>
              <div class="flex flex-row space-x-4">
                <div>{$contactList[index].firstname}</div>
                <div>{$contactList[index].lastname}</div>
              </div>
              <div>{$contactList[index].contact}</div>
              <div>{$contactList[index].landline}</div>
              <div>{$contactList[index].email}</div>
              <div>{$contactList[index].website}</div>
              <div>{$contactList[index].adress}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button on:click="{handleDownloadVCard}" class="btn"
          >Save Contact</button
        >
      </div>
    </div>
  </section>
{/if}
