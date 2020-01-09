/**
 * Name Day App
 * 
 */
 const renderNameResult = data => {
    data.results.forEach(result => {
        document.querySelector('#display').innerHTML += `
            <div class="card mt-3">
                <h5 class="card-title">${result.name}</h5>
                <p class="card-text">Date: ${result.day}/${result.month}</p>
                <p class="card-text">Country: ${document.querySelector('#country').value}</p>
            </div>
        `;
    });
 };

 const renderDateResult = data => {
    const country = document.querySelector('#country').value;
    data.data.forEach(result => { 
        document.querySelector('#display').innerHTML += `
            <div class="card mt-3">
                <h5 class="card-title">${result.dates.day}/${result.dates.month}</h5>
                <p class="card-text">${
                    (country == "at") ? result.namedays.at
                        : (country == "cz") ? result.namedays.cz
                        : (country == "de") ? result.namedays.de
                        : (country == "dk") ? result.namedays.dk
                        : (country == "es") ? result.namedays.es
                        : (country == "fi") ? result.namedays.fi
                        : (country == "fr") ? result.namedays.fr
                        : (country == "hr") ? result.namedays.hr  
                        : (country == "hu") ? result.namedays.hu
                        : (country == "it") ? result.namedays.it
                        : (country == "pl") ? result.namedays.pl
                        : (country == "se") ? result.namedays.se          
                        : (country == "sk") ? result.namedays.sk
                        : result.namedays.us
                    }
                </p>
            </div>
        `;
    });
 };


document.querySelector('#search-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#search').value;
    const country = document.querySelector('#country').value;
    const month = document.querySelector('#month').value;
    const day = document.querySelector('#day').value;
    
    document.querySelector('#display').innerHTML = "";
    

    if (name) {
        getDateByName(name, country).then(data => {
                console.log(data);
                renderNameResult(data);  
        })
        .catch(err => {
            // network error?
            console.log('danger', err); 
        });
    }
    if (month && day) {
        getNameByDate(country, month, day).then(data => {
            console.log(data);
            renderDateResult(data);
        })
        .catch(err => {
            // network error?
            console.log('danger', err); 
        });
    }
    document.querySelector('#search').value = "";
    document.querySelector('#month').value = "";
    document.querySelector('#day').value = "";

});