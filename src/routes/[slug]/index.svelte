<script></script>
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
              bind:value={firstname}
              type="text"
              placeholder="First Name"
              class="input input-bordered input-md"
            />
            <input
              bind:value={lastname}
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
              bind:value={mobile}
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
              bind:value={phone}
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
              bind:value={email}
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
              bind:value={company}
              type="text"
              placeholder="Company"
              class="input input-bordered input-md"
            />
            <input
              bind:value={job}
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
              bind:value={street}
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
              bind:value={city}
              type="text"
              class="input input-bordered input-md"
            />
            <input
              bind:value={zip}
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
              bind:value={state}
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
              bind:value={country}
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
              bind:value={website}
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
  