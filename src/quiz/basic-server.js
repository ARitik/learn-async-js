#! /opt/homebrew/bin/node
const http = require('http');
const url = require('url');

const hostname = 'localhost';
const port = 8000;

const incidents = [
    {
        id: "MABOS001",
        date: "20170617",
        time: "1437",
        road_id: "A90",
        place: "Stonehaven",
        direction: "north",
        description: "Broken-down T on north and park station."

    },
    {
        id: "MABOS002",
        date: "20221217",
        time: "0937",
        road_id: "A90",
        place: "Stonehaven",
        direction: "north",
        description: "Car in West Village broken down."

    }
]




const server = http.createServer((req, res) => {  // the function that we write here takes only a request and a response. The request (header) must state if GET/PUT/POST/DELETE.
    // Parse the request URL to extract parameters
    const parsedUrl = url.parse(req.url, true);     // the server catches the request, and parses the URI. Here we parse the URI to extract the parameters from the URL/URI
    const { pathname } = parsedUrl;

    // Check if the request is for the specified endpoint
    if (pathname.startsWith('/incidents/')) {   
        const [, , road, location, direction, id] = pathname.split('/');  

        // Check if all parameters are provided
        if (road && location && direction && id) {  
            // Send response with the extracted parameters
            res.writeHead(200, { 'Content-Type': 'application/json' }); // set some meta information for the response header, 200 means VALID!
            res.end(JSON.stringify(incidents.filter((incident) => {
                return incident.id === `MABOS00${id}`
            }))); 
        } else { 
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Endpoint not found.'); // re-start the server to see if this works and changes what happens with incomplete parameters!
        }
    } else {
        // If the request is for an unsupported endpoint, send a not found response
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Endpoint not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})