import { json, redirect, redirectDocument } from "@remix-run/node";

import {
  Form,
  Link,
  Links,
  NavLink,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import type {
  ActionFunctionArgs, 
  LinksFunction,
  LoaderFunctionArgs
} from "@remix-run/node";

import appStylesHref from "./app.css?url";

import { getContacts } from "app/data.ts";

export const links:LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  //const { stores, q } = useLoaderData<typeof loader>();

  return (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
  );
}
