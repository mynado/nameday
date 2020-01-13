/**
 * Name Day App
 * 
 */
const display = document.querySelector('#display');

// render Today's name
const renderTodaysName = data => {
    const country = document.querySelector('#country');
    const selectedCountry = country.options[country.selectedIndex].innerText;
    data.data.forEach(result => { 
        display.innerHTML += `
            <div class="card today-card">
                <p>Today, ${result.dates.day}/${result.dates.month}, is the name day of</p>
                <h2>${result.namedays[country.value]}</h2>
                <p>in ${selectedCountry}</p>
            </div>
        `;
    });
 };
 
 // Always show today's name
 const country = document.querySelector('#country').value;
 const timezone = document.querySelector('#timezone').value;
 getTodaysNameByTimezoneAndCountry(timezone, country).then(data => {
     console.log(data)
     renderTodaysName(data);
  })
  .catch(err => {
     // network error
     renderMsg(err);
  });

// Error msg
const renderMsg = msg => {
    display.innerHTML = `
    <div class="alert alert-warning" role="alert">${msg}</div>
    `;
};

// render Name according to search query
const renderNameResult = data => {
    const country = data[ "country name" ];
    const searchName = document.querySelector('#search').value;
    const capitalName = searchName[0].toUpperCase() + searchName.substr(1);

    data.results.forEach(result => {
        const nameArr = result.name.split(',');
        const filteredArr = nameArr.filter(name => name.includes(capitalName));
        const found = filteredArr.find(name => name.includes(capitalName, 0));
        const otherNames = nameArr.filter(name => !name.includes(capitalName));  
       
        if (filteredArr.length > 0) {
            display.innerHTML += `
                <div class="card">
                    <h2 class="card-title">${filteredArr}</h2>
                    <p class="card-text">${filteredArr}'s Name Day is ${result.day}/${result.month} in ${country}</p>
                    <h3>Other names this day</h3>
                    ${(result.name.includes(",")) ? otherNames : "There is no other names for this date." }
                </div>
            `;
        } 
    });
    document.querySelector('#search').value = "";
};

// render Name according to choosed Date
const renderDateResult = data => {
   const country = document.querySelector('#country');
   const selectedCountry = country.options[country.selectedIndex].innerText;
   data.data.forEach(result => { 
       display.innerHTML += `
           <div class="card text-center">
                <p>${result.dates.day}/${result.dates.month} is the Name Day of</p>
                <h2>${result.namedays[country.value]}</h2>
                <p>in ${selectedCountry}</p>
           </div>
       `;
   });
};

// Search button for 'Name' and 'Date'
document.querySelector('#search-form').addEventListener('submit', e => {
   e.preventDefault();
   const name = document.querySelector('#search').value;
   const country = document.querySelector('#country').value;
   const month = Number(document.querySelector('#month').value);
   const day = Number(document.querySelector('#day').value);
   
   display.innerHTML = "";

   if (name && (month && day)) {
       renderMsg("Try again! You can only search by name OR date.");
   } else if (name.length > 2) {
       getDateByName(name, country).then(data => {
           if (data.results.length > 0) {
               console.log(data);
               renderNameResult(data); 
           } else {
                renderMsg("Sorry! This name does not exist in the database.")
           }
       })
       .catch(err => {
           // network error
           renderMsg(err);
       });
   } else if (month && day) {
       getNameByDate(country, month, day).then(data => {
           console.log(data);
           renderDateResult(data);
       })
       .catch(err => {
           // network error
           renderMsg(err);
       });
   } else {
       renderMsg('The name must be at least 3 characters.');
   }
   document.querySelector('#month').value = "Month";
   document.querySelector('#day').value = "Day";
});

// Change timezone and show Today's name according to timezone
document.querySelector('#search-form #countrytime').addEventListener('change', e => {
    e.preventDefault();
    const country = document.querySelector('#country').value;
    const timezone = document.querySelector('#timezone').value;
    display.innerHTML = "";
    getTodaysNameByTimezoneAndCountry(timezone, country).then(data => {
       renderTodaysName(data);
    })
    .catch(err => {
       // network error
       renderMsg(err);
    });
});