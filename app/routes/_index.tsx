import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { getContacts } from "app/data.ts";


export const meta: MetaFunction = () => {
  return [
    { title: "Seattle Coffeeshops" },
    { name: "description", content: "Seattle Coffeeshop Homepage" },
  ];
};

export const loader = () => {
  console.log("redirecting to home");
  return redirect(`/home`);
}

export default function Index() {
  console.log("at index");
  return (
    <h1>index</h1>
  );
}
