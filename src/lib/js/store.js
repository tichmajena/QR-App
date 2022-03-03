import { writable } from "svelte/store";
import { browser } from "$app/env";

export const contactList = writable(
  (browser && JSON.parse(localStorage.getItem("contact"))) || []
);
contactList.subscribe((value) => {
  browser && localStorage.setItem("contact", JSON.stringify(value));
});
