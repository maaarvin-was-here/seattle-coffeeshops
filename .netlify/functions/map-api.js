exports.handler = async function (event, context) {
    const value = process.env.GMAPS_API_KEY;

    console.log("IN HANDLER " + value);
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `${value}` }),
    };
  };
