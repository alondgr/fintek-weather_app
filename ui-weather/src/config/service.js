export const development = {
    apiUrl: 'http://localhost:4000'
};
export const production = {
    apiUrl: ''
}

// try catch
const config = process.env.NODE_ENV === 'production' ? production : development


export const fetchWeather = async (location) => {

    try {

        const res = await fetch(config.apiUrl + '/weather/' + location, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        console.log(data)
        if(!data || data.error) throw new Error('no data')
        console.log("TRY");
        return data;

    } catch (error) {

        // const res = await fetch(config.apiUrl + '/weather/' + location, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        console.log(error + " ERROR!");
        // const data = await res.json();
        // return data;
    }
}