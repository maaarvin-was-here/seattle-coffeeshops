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
  useSubmit,
  useLocation
} from "@remix-run/react";

import type {
  ActionFunctionArgs, 
  LinksFunction,
  LoaderFunctionArgs
} from "@remix-run/node";

//import appStylesHref from "./app.css?url";

import { getContacts } from "app/data.ts";


//export const links:LinksFunction = () => [
//  { rel: "stylesheet", href: appStylesHref },
//];


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

export const action = async ({
    request,
  }: ActionFunctionArgs) => {
    const body = await request.formData();
    return redirectDocument(`/blog`);
}


export const loader = async ({
  request,
  }: LoaderFunctionArgs) => {
    console.log("loading stores from home route...");
    const url = new URL(request.url);
    var q = url.searchParams.get("q");
    const stores = await getContacts(q);
    if (!q || q == "null"){
      q = "";
    }
  return json({ stores, q });
}


export default function App() {
  const { stores, q } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const location = useLocation();

  return (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <div id="title-div">
        <h1 id="title">Seattle Coffeeshops</h1>
      </div>
      {/*
      <Form method="post">
          <button type="submit">how it's made</button>
        </Form>
        */}
      <div id="main-content">
        <div id="sidebar">
          
          <Form id="search-form" 
          onChange={(event) => {
            const isFirstSearch = q;
            console.log(location.pathname);
            submit(event.currentTarget, {
              replace: !isFirstSearch,
            });
          }}
          role="search">
            <input
              id="q"
              aria-label="Search box"
              defaultValue={q || ""}
              placeholder="Search by name/neighborhood"
              type="search"
              name="q">
            </input>
          </Form>

          {/* <Link to='OutletTest'>Test</Link> */}
          
          <nav id="store-list">
            { stores.length ? (
              <ul>
                {stores.map((store) => (
                  <li key={store.id}>
                    <NavLink 
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                        }
                        to={`stores/${store.id}?q=${q}`}
                      >
                        {store.name ? (
                          <>
                            {store.name}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                    </NavLink>
                  </li>
                      ))}
              </ul>
            ) : (
              <p>
                <i>No listings</i>
              </p>
            )}
          </nav>
          <div id="sidebar-bottom">

          </div>
        </div>
        <div id="detail">
          <div id="detail-top">
            {(location.pathname == '/home')?
            <div id="background-home-image-holder">
              <div id="background-home-image">
              
              </div>
            </div>
            :<Outlet />}
          </div>
          <div id="detail-bottom">
            <div id="signature">
              &#9829; made with caffeine, for caffeine
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
  );
}
