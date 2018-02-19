const baseURL = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseURL + type); // I removed the end / as it was giving errors with next - previous urls
    xhr.send();
    
    ........
    
    
    
function generatePaginationButtons(next, prev) {
    /** I split the url for the next / previous to extract a type
     *  I had to check that a url exist first, ie not Null.
     *  Then pass on the type generated to be connected to the base URL.
     * */
    var nextType;
    var prevType;
    if ( next) nextType = next.split("api/");
    console.log(nextType);
    if (prev) prevType = prev.split("api/");
    console.log(prevType);
    if (next && prev) {
        return `<button onclick="writeToDocument('${prevType[1]}')">Previous</button>
                <button onclick="writeToDocument('${nextType[1]}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${nextType[1]}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prevType[1]}')">Previous</button>`;
    }
}


function writeToDocument(type) {
     ....
    
    getData(type, function(data) {
       
       ......
       
        el.innerHTML += `<table>${tableHeaders}${tableRows}</table>${pagination}`;
    });
}