<script context="module">
  export const prerender = true;
  import { prefetchRoutes } from "$app/navigation";
  export async function load(page, stuff) {
    let slug = page.params.slug;
    console.log(slug), stuff;
    let slugArry = slug.split("-");
    let index = slugArry[1];
    return { props: { index } };
  }
</script>

<script>
  import { contactList } from "$lib/js/store.js";
  export let index;
  console.log(index);
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
            bind:value={$contactList[index].contact}
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
            bind:value={$contactList[index].landline}
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
          <span class="w-32">Adress:</span>
          <input
            bind:value={$contactList[index].adress}
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
      <button on:click={() => {}} class="rounded-lg btn"
        >GENERATE QR CODE</button
      >
    </div>
  </div>
</section>
