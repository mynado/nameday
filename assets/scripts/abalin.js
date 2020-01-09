/**
 * Abalin API
 * 
 */
// /namedays?country=us&month=7&day=15

const baseUrl = "https://api.abalin.net";

const getDateByName = async (name, country = "us") => {
   // get date for 'name' from Abalin API
   const response = await fetch(`${baseUrl}/getdate?name=${name}&country=${country}`);

   // convert response from JSON
   const data = await response.json();   

   // return date
   return data;
};

const getNameByDate = async (country, month, day) => {
    // get name by date from Abalin API
    const response = await fetch(`${baseUrl}/namedays?country=${country}&month=${month}&day=${day}`);

    // convert response from JSON
    const data = await response.json();   

    // return date
    return data;
};