import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState, useEffect} from 'react';
import type { FunctionComponent } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import invariant from "tiny-invariant";

// import 'app/images/203coffee.jpeg';

import "app/store.css";

import { getContact } from "../data";

export const loader = async ({ 
    params,
 } : LoaderFunctionArgs) => {
    invariant(params.storeName, "Missing name");
    const store = await getContact(params.storeName);
    if (!store) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ store });
};


export default function Store() {
    const { store } = useLoaderData<typeof loader>();

    var [key, setKey] = useState("");
    useEffect(() => {
        async function getKey(){
            const apiResponse = await fetch('/.netlify/functions/map-api');
            const apiJson = await apiResponse.json();
            let k = apiJson.message;        
            setKey(k);
        }
        getKey();
    }, [])

    var notes = store.notes;
    if (notes === undefined){
        notes = [];
    }
    // console.log("loading store " + store.name);
    const mapLink = store.mapLink + key;
    console.log("mapLink " + mapLink);
    //console.log(key);

    // let imageLink = '../images/' + store.imageLink;
    let imageLink = '../../images/' + store.imageLink;
    var imageStyle = {
        backgroundImage: "url(" + imageLink + ")"
    };

    return (
        <div id="store-return">
            <div id="store-div">
                <div id="centered-store-div">
                    <div id="store-info-div">
                        <h1>{store.name}</h1>
                        <h2>{store.location}</h2>
                        <ul>
                            {notes.map(item => {
                                return <li>{item}</li>
                            })}
                        </ul>
                        <div style={imageStyle} id="image-div">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div id="map-div">
                <div id="centered-map-div">
                    <iframe 
                        id="map-embed" 
                        loading="lazy" 
                        src={mapLink}>
                    </iframe>
                </div>
            </div>
        </div>
    )
}
