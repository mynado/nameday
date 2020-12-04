/**
 * Name Day App
 * 
 */
const display = document.querySelector('#display');

// Get today's name from API
const getTodaysName = (timezone, country) => {
    getTodaysNameByTimezoneAndCountry(timezone, country).then(data => {
        renderTodaysName(data);
    })
    .catch(err => {
        // network error
        renderMsg(err);
    });
};

// render Today's name
const renderTodaysName = data => {
    const country = document.querySelector('#country');
    const selectedCountry = country.options[country.selectedIndex].innerText;
    display.innerHTML += `
        <div class="card text-center">
            <p>Today, ${data.data.dates.day}/${data.data.dates.month}, is the name day of</p>
            <h2>${data.data.namedays[country.value]}</h2>
            <p>in ${selectedCountry}</p>
        </div>
    `;
};

// Error msg
const renderMsg = msg => {
    display.innerHTML = `
    <div class="msg alert alert-warning" role="alert">${msg}</div>
    `;
};

// render Name according to search query
const renderNameResult = data => {
    const country = data[ "country name" ];
    const searchName = document.querySelector('#search').value.trim();
    const capitalName = searchName[0].toUpperCase() + searchName.substr(1);
    let obj = data.results.filter(o => o.name.includes(capitalName));
    if (obj && obj.length == 0) {
        renderMsg('Sorry! This name does not exist in the database.');
    } else if (obj) {
        obj.forEach(result => {
            const nameArr = result.name.split(',');
            const filteredArr = nameArr.filter(name => name.includes(capitalName));
            const otherNames = nameArr.filter(name => !name.includes(capitalName));  
            display.innerHTML += `
                <div class="card">
                    <h2 class="card-title">${filteredArr}</h2>
                    <p class="card-text">${filteredArr}'s Name Day is ${result.day}/${result.month} in ${country}</p>
                    <h3>Other names this day</h3>
                    ${(result.name.includes(",")) ? otherNames : "There is no other names for this date." }
                </div>
            `;
        });  
    } 
    document.querySelector('#search').value = "";
};

// render Name according to choosed Date
const renderDateResult = data => {
    const country = document.querySelector('#country');
    const selectedCountry = country.options[country.selectedIndex].innerText;
    display.innerHTML += `
        <div class="card text-center">
            <p>${data.data.dates.day}/${data.data.dates.month} is the Name Day of</p>
            <h2>${data.data.namedays[country.value]}</h2>
            <p>in ${selectedCountry}</p>
        </div>
    `;
};

// Search button for 'Name' and 'Date'
document.querySelector('#search-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#search').value.trim();
    const country = document.querySelector('#country').value;
    const month = Number(document.querySelector('#month').value);
    const day = Number(document.querySelector('#day').value);

    display.innerHTML = "";

    if (name && (month && day)) {
        renderMsg("Try again! You can only search by name OR date.");
    } else if (!(name || (month && day))) {
        renderMsg("Try again! Search by filling in a name or choose a date.");
    } else if (name.length > 2) {
        getDateByName(name, country).then(data => {
            if (data.results.length > 0) {
                renderNameResult(data); 
            } else {
                renderMsg("Sorry! This name does not exist in the database.")
                document.querySelector('#search').value = "";
            }
        })
        .catch(err => {
            // network error
            renderMsg(err);
        });
    } else if (month && day) {
        getNameByDate(country, month, day).then(data => {
            renderDateResult(data);
        })
        .catch(err => {
            // network error
            renderMsg("Oops! Something went wrong.", err);
        });
    } else {
        renderMsg('The name must be at least 3 characters.');
    }
    document.querySelector('#month').value = "Month";
    document.querySelector('#day').value = "Day";
    document.querySelector("#search").blur();
});

// Change timezone and show Today's name according to timezone
document.querySelector('#search-form #countrytime').addEventListener('change', e => {
    e.preventDefault();
    const country = document.querySelector('#country').value;
    const timezone = document.querySelector('#timezone').value;
    display.innerHTML = "";
    getTodaysName(timezone, country);
});