import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";


const handler: Handler = async () => {
    const value = process.env.GMAPS_API_KEY;
        return {
            statusCode: 200,
            body: JSON.stringify({ message: `${value}`}),
        };  
    };

export { handler };

