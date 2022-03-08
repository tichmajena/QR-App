import { writable } from "svelte/store";
import { browser } from "$app/env";

export const contactList = writable(
  (browser && JSON.parse(localStorage.getItem("contact"))) || []
);
contactList.subscribe((value) => {
  browser && localStorage.setItem("contact", JSON.stringify(value));
});

export const current = writable({});

export const contact_id = writable({});

export const defaults = writable({
  company: "Akribos Capital Inc",
  address: "62 Quorn Avenue, Mount Pleasant, Harare, Zimbabwe",
  landline: "+263242301201",
  website: "www.akriboscapital.com",
});
