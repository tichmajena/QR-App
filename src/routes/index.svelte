<script context="module">
  export const prerender = true;
  import { prefetchRoutes } from "$app/navigation";
  export async function load(page) {
    let slug = page.params.slug;
    let slugArry = slug.split("-");
    let index = slugArry[1];
    return { props: index };
  }
</script>

<script>
  import * as QRCode from "qrcode";
  import { contactList } from "$lib/js/store.js";
  export let index;
  let qr = "";
  let vcard = `BEGIN:VCARD
N: Naruto; Uzamaki;;;
FN: First name and last name
TITLE: XX Group front end
ADR;WORK:;;No.19 GT Road, Fifth Ring District, Beijing;;;;
TEL;CELL,VOICE:159351111111
TEL;WORK,VOICE:010-6666666
URL;WORK:www.gt.com
EMAIL;INTERNET,HOME:253413617@qq.com
END:VCARD`;

  //   let vcard2 = `BEGIN:VCARD
  //   N: ${firstName}; ${lastName};;;
  //   FN: First name and last name
  //   TITLE: ${title}
  //   ADR;WORK:;;${address};;;;
  //   TEL;CELL,VOICE:${cellphone}
  //   TEL;WORK,VOICE:${landline}
  //   URL;WORK:${website}
  //   EMAIL;INTERNET,HOME:${email}
  //   END:VCARD`;
  console.log($contactList);
  let firstname = "";
  let lastname = "";
  let mobile = "";
  let phone = "";
  let fax = "";
  let email = "";
  let company = "";
  let job = "";
  let street = "";
  let city = "";
  let zip = "";
  let state = "";
  let country = "";
  let website = "";

  function addContact() {
    let formDetails = {
      firstname,
      lastname,
      mobile,
      phone,
      fax,
      email,
      company,
      job,
      street,
      city,
      zip,
      state,
      country,
      website,
    };
    $contactList = [...$contactList, formDetails];
    console.log($contactList);
  }

  const generateQR = async (text) => {
    try {
      console.log(QRCode);
      qr = await QRCode.toString(text);
      console.log(qr);
    } catch (err) {
      console.error(err);
    }
  };

  generateQR(vcard);
</script>

<section class="w-full">
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
            bind:value={$contactList[index].firstname}
            type="text"
            placeholder="First Name"
            class="input input-bordered input-md"
          />
          <input
            bind:value={$contactList[index].lastname}
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
            bind:value={$contactList[index].mobile}
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
            bind:value={$contactList[index].phone}
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
            bind:value={$contactList[index].email}
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
            bind:value={$contactList[index].company}
            type="text"
            placeholder="Company"
            class="input input-bordered input-md"
          />
          <input
            bind:value={$contactList[index].job}
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
          <span class="w-32">Street:</span>
          <input
            bind:value={$contactList[index].street}
            type="text"
            class="input input-bordered input-md"
          />
        </label>
      </div>
    </div>
    <div>
      <div class="form-control pb-4">
        <label class="input-group input-group-md">
          <span class="w-32">City:</span>
          <input
            bind:value={$contactList[index].city}
            type="text"
            class="input input-bordered input-md"
          />
          <input
            bind:value={$contactList[index].zip}
            type="text"
            placeholder="ZIP"
            class="input input-bordered input-md"
          />
        </label>
      </div>
    </div>
    <div>
      <div class="form-control pb-4">
        <label class="input-group input-group-md">
          <span class="w-32">State:</span>
          <input
            bind:value={$contactList[index].state}
            type="text"
            class="input input-bordered input-md"
          />
        </label>
      </div>
    </div>
    <div>
      <div class="form-control pb-4">
        <label class="input-group input-group-md">
          <span class="w-32">Country:</span>
          <input
            bind:value={$contactList[index].country}
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
            bind:value={$contactList[index].website}
            type="text"
            placeholder="www.your-website.com"
            class="input input-bordered input-md"
          />
        </label>
      </div>
    </div>
    <div>
      <button on:click={addContact} class="rounded-lg btn"
        >GENERATE QR CODE</button
      >
    </div>
  </div>
</section>

{@html qr}
