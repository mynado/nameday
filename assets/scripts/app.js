/**
 * Name Day App
 * 
 */

 const renderResult = data => {
    data.results.forEach(result => {
        document.querySelector('#display').innerHTML += `
            <div class="card mt-3">
                <h1 class="card-title">${result.name}</h1>
                <h2 class="card-text">${result.day}/${result.month}</h2>
            </div>
        `;
    });
    
 };


document.querySelector('#search-form').addEventListener('submit', e => {
    e.preventDefault();
    console.log("click");
    document.querySelector('#display').innerHTML = "";
    const name = document.querySelector('#search').value;
    const country = document.querySelector('#country').value;

    getDateByName(name, country).then(data => {
        
            console.log(data);
            renderResult(data);
            
        
    })
    .catch(err => {
        // network error?
        console.log('danger', err); 
    });
    document.querySelector('#search').value = "";
});