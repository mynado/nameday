/**
 * Name Day App
 * 
 */


 const renderNameResult = data => {
    const country = data[ "country name" ];
    const searchName = document.querySelector('#search').value;
    const capitalName = searchName[0].toUpperCase() + searchName.substr(1);
    data.results.forEach(result => {
        let nameArr = result.name.split(',');
        let filteredArr = nameArr.filter(i => i.includes(capitalName));
        const found = filteredArr.find(name => name.includes(capitalName));
        
        console.log(found);
        if (found) {
            document.querySelector('#display').innerHTML += `
                <div class="card mt-3">
                    <h4 class="card-title">${filteredArr}</h4>
                    <p class="card-text">${result.day}/${result.month}</p>
                    <p class="card-text">${country}</p>
                    <h6>Other names this day</h6>
                    ${(result.name.includes(",")) ? result.name : "There is no other names for this date." }
                </div>
            `;
        }
    });
    document.querySelector('#search').value = "";
 };

 const renderDateResult = data => {
    const country = document.querySelector('#country').value;
    data.data.forEach(result => { 
        document.querySelector('#display').innerHTML += `
            <div class="card mt-3">
                <h5 class="card-title">${result.dates.day}/${result.dates.month}</h5>
                <h6>${result.namedays[country]}</h6>
            </div>
        `;
    });
 };


document.querySelector('#search-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#search').value;
    const country = document.querySelector('#country').value;
    const month = Number(document.querySelector('#month').value);
    const day = Number(document.querySelector('#day').value);
    
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
    
    document.querySelector('#month').value = "Month";
    document.querySelector('#day').value = "Day";

});