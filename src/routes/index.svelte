<script context="module">
  export const load = async ({ session }) => {
    console.log("SESSION: ", session);
    if (session.user.exists) return {};
    // return {
    //   status: 301,
    //   redirect: "/login",
    // };
    return {
      props: {
        session,
      },
    };
  };
</script>

<script>
  import * as QRCode from "qrcode";
  import { contactList } from "$lib/js/store.js";
  import { session } from "$app/stores";
  import { initializeApp, getApps, getApp } from "firebase/app";
  import { getFirestore, collection, onSnapshot } from "firebase/firestore";
  import { firebaseConfig } from "$lib/firebaseConfig";
  import { browser } from "$app/env";

  const firebase =
    browser &&
    (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());

  const db = browser && getFirestore();
  console.log({ firebaseApp, db });

  const colRef = browser && collection(db, "contacts");
  let contacts = [];
  const unsubscribe =
    browser &&
    onSnapshot(colRef, (querySnapshot) => {
      let fbContacts = [];
      querySnapshot.foreach((doc) => {
        let contact = { ...doc.data(), id: doc.id };
        fbTodos = [todo, ...fbTodos];
      });
      contacts = fbContacts;
    });

  const addCntct = async () => {
    if (task !== "") {
      const docRef = await addDoc(collection(db, "contacts"), {
        firstname,
        lastname,
        contact,
        landline,
        email,
        company,
        job,
        adress,
        website,
      });

      error = "";
    } else {
      error = "Task is empty";
    }
    task = "";
  };

  const deleteContact = async (id) => {
    await deleteDoc(doc(db, "contacts", id));
  };

  const markContactAsComlete = async (item) => {
    await updateDoc(doc(db, "contacts", item.id), {
      isComplete: !item.isComplete,
    });
  };

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
  let contact = "";
  let landline = "";
  let email = "";
  let company = "";
  let job = "";
  let adress = "";
  let website = "";

  function addContact() {
    let formDetails = {
      firstname,
      lastname,
      contact,
      landline,
      email,
      company,
      job,
      adress,
      website,
    };
    $contactList = [...$contactList, formDetails];
    console.log($contactList);
    firstname = "";
    lastname = "";
    contact = "";
    email = "";
    company = "";
    job = "";
    website = "";
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
            bind:value={contact}
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
            bind:value={landline}
            type="text"
            placeholder="Land Line"
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
          <span class="w-32">Adress:</span>
          <input
            bind:value={adress}
            type="text"
            class="input input-bordered input-md"
          />
        </label>
      </div>
    </div>

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
    <button on:click={addContact} class="rounded-lg btn">Add Contact</button>
  </div>
</section>
