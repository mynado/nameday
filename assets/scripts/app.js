/**
 * Name Day App
 * 
 */

 const renderResult = data => {
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


document.querySelector('#search-form').addEventListener('submit', e => {
    e.preventDefault();
    console.log("click");
    document.querySelector('#display').innerHTML = "";
    const name = document.querySelector('#search').value;
    const country = document.querySelector('#country').value;
    const date = document.querySelector('#date').value;
    console.log(date);

    getDateByName(name, country).then(data => {
        
            console.log(data);
            renderResult(data);
            
        
    })
    .catch(err => {
        // network error?
        console.log('danger', err); 
    });

    // getNameByDate(name, country).then(data => {
        
    //     console.log(data);
    //     renderResult(data);
    
    // })
    // .catch(err => {
    //     // network error?
    //     console.log('danger', err); 
    // });
    document.querySelector('#search').value = "";
});