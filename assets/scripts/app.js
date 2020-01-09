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
    data.data.forEach(result => {
        document.querySelector('#display').innerHTML += `
            <div class="card mt-3">
                <h5 class="card-title">${result.dates.day}/${result.dates.month}</h5>
                <p class="card-text">${result.namedays.us}</p>
            </div>
        `;
    });
 };


document.querySelector('#search-form').addEventListener('submit', e => {
    e.preventDefault();
    
    document.querySelector('#display').innerHTML = "";
    const name = document.querySelector('#search').value;
    const country = document.querySelector('#country').value;
    const month = document.querySelector('#month').value;
    const day = document.querySelector('#day').value;

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

    getNameByDate(country, month, day).then(data => {
        
        console.log(data);
        renderDateResult(data);
    
    })
    .catch(err => {
        // network error?
        console.log('danger', err); 
    });
    document.querySelector('#search').value = "";
    document.querySelector('#month').value = "";
    document.querySelector('#day').value = "";

});