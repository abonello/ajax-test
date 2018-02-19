const baseURL = "https://swapi.co/api/";

function getData(type, cb) { // callback function -- this is the answer to the problem that we had with the setTimeout function
    var xhr = new XMLHttpRequest(); // Allows us to consume the APIs, methods to open and send connections
    // var data; // to hold returned data NOT NEEDED ANY MORE
    
    // Open connection
    // Pass method we are using -- Get
    // Then the URL
    xhr.open("GET", baseURL + type); // + "/");
    xhr.send();
    
    
    xhr.onreadystatechange = function() {
        // console.log("Ready State: " + this.readyState);
        // console.log("Status: " + this.status);
        if(this.readyState == 4 && this.status == 200) {
            // console.log("Ready to go.");
            //readyState 4 means that it has been completed and we have data
            // status 200 means that it was OK. Everything went well and we received the data.
            // document.getElementById("data").innerHTML = this.responseText;
            // console.log(typeof(this.responseText));
            // console.log(typeof(JSON.parse(this.responseText)));
            // console.log(JSON.parse(this.responseText));
            
            // data = JSON.parse(this.responseText);
            cb(JSON.parse(this.responseText));
            
        }
    };
}

// getData(function(data) {
//     console.log(data);
// });

// function printDataToConsole(data) {
//     console.log(data);
// }

// getData(printDataToConsole);

function getTableHeaders(obj) {
    var tableHeaders = [];
    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
     /** I split the url for the next / previous to extract a type
     *  I had to check that a url exist first, ie not Null.
     *  Then pass on the type generated to be connected to the base URL.
     * */
    var nextType;
    var prevType;
    if ( next) nextType = next.split("api/");
    // console.log(nextType);
    if (prev) prevType = prev.split("api/");
    // console.log(prevType);
    // If both are available
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
    var tableRows = []; // holds each row of data
    var el = document.getElementById("data");
    el.innerHTML = ""; // clear old data
    
    getData(type, function(data) {
        console.dir(data);
        var pagination;
        if (data.next || data.previous) {
            /* if either next or previous is not null
               generate some pagination buttons
            */
            pagination = generatePaginationButtons(data.next, data.previous);
            // console.log("Next: " + data.next);
            // console.log("Previous: " + data.previous);
        }
        
        
        
        data = data.results;
        
        var tableHeaders = getTableHeaders(data[0]);
        
        data.forEach(function(item) {
            console.log(item);
            // Print the keys to console
            // Object.keys(item).forEach(function(key) {
            //     console.log(key);
            // });
            // el.innerHTML += item.name + "<br>";
            
            var dataRow = [];
            
            Object.keys(item).forEach(function(key) {
                // truncate data - shorten teh strings to be inserted
                // takes less space on the page avoid/reduce side scrolling
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                // dataRow.push(`<td>${item[key]}</td>`);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
            
            
        });
        // document.getElementById("data").innerHTML= data;
        // el.innerHTML += `<table>${tableHeaders}${tableRows}</table>${pagination}`;
        /**
         * bug that shows a load of commas at the top of our table 
         * We're using arrays in our template literals.
         * 
         * What happens is when arrays are treated as strings the commas that separate 
         * the values are are also treated as part of that string so what we're going 
         * to do is do a dot replace. This takes a regular expression, a pattern to 
         * identify which parts of the string we want to change.
         * Replace / comma /g with an empty string. This replaces all of the commas.
         * */
    
        el.innerHTML += `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/[, ]/g, "");   

    });
}





/**get the code to wait before it is executed.
 * one of the problems with having to set timeouts in our code 
 * is that we would have to explicitly tell our system to wait 
 * every time we wanted something to happen. And the bigger 
 * problem with that is that it will take different amounts of 
 * time depending on different circumstances.
 * */
// setTimeout(function() {
//     console.log("data: ");
//     console.log(data);
// }, 1000);
