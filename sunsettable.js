import createHTMLTag from './helpers.js'

const app = createHTMLTag(
    { tag: "div", parent: document.body },
    { class: "app" }
);


function tableComponent() {
    const table = createHTMLTag({ tag: "table", parent: app });
    createHTMLTag({ tag: "thead", parent: table });
    createHTMLTag({ tag: "tbody", parent: table });
    //current time
    const span = createHTMLTag(
        { tag: "span", parent: table.childNodes[0] },
        { class: "currentTime" }
    );
    const now = new Date();
    setInterval(function () {
        const now = new Date();
        span.innerText = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }, 1000);

    const salaNamesArr = ["Fajr", "Shuruq", "Zuhr", "Asr", "Maghrib", "Isha"];

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Set the HTTP method and URL
    xhr.open(
        "GET",
        "https://api.sunrise-sunset.org/json?lat=55.6761&lng=12.5683&date=today"
    );

    // Set the callback function to handle the response
    xhr.onload = function () {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            timesArr = [
                data.results.sunrise,
                "...",
                "...",
                "...",
                data.results.astronomical_twilight_end,
                "...",
            ];

            timesArr.forEach((element, i) => {
                ///////////////////////////////
                createHTMLTag({ tag: "tr", parent: table.childNodes[1] });
                createHTMLTag(
                    { tag: "td", parent: table.childNodes[1].childNodes[i] },
                    { class: "inputs-container", "data-cellcoor": `cell${i}-2` }
                );
                const inputMinutes = createHTMLTag(
                    { tag: "input", parent: table.childNodes[1].childNodes[i].childNodes[0] },
                    {
                        type: "number",
                        id: `input-minutes-${i}`,
                        placeholder: "min",
                    },
                    { width: "55px" }
                );
                inputMinutes.addEventListener("input", (event) => {
                    localStorage.setItem(
                        "input-minutes-" + event.target.id.replace(/[a-z-]/g, ""),
                        event.target.value
                    );
                    if (event.target.value) {
                        /* setTimeout(function() {
                            if ('Notification' in window && Notification.permission === 'granted') {
                              navigator.serviceWorker.ready.then(function(registration) {
                                registration.showNotification('60 minutes have passed!', {
                                  body: 'Your notification message here.',
                                  icon: 'path/to/icon.png'
                                });
                              });
                            }
                        }, 60 * 60 * 1000); */
                        console.log("input");
                    } else {
                        console.log("no input");
                    }
                });
                /\d/.test(localStorage.getItem(`input-minutes-${i}`))
                    ? table.childNodes[1].childNodes[
                        i
                    ].childNodes[0].childNodes[0].setAttribute(
                        "value",
                        localStorage.getItem(`input-minutes-${i}`)
                    )
                    : "";
                ///////////////////////////////
                createHTMLTag(
                    {
                        tag: "td",
                        parent: table.childNodes[1].childNodes[i],
                        innerText: salaNamesArr[i],
                    },
                    { "data-cellcoor": `cell${i}-1` }
                );
                createHTMLTag(
                    {
                        tag: "td",
                        parent: table.childNodes[1].childNodes[i],
                        innerText: element,
                    },
                    { "data-cellcoor": `cell${i}-1` }
                );
            });
        } else {
            console.error("Error " + xhr.status);
        }
    };

    // Send the request
    xhr.send();
    // Call logSunsetTime every day at midnight (00:00) to update the sunset time

    setInterval(() => {
        xhr.send();
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
}

tableComponent();
