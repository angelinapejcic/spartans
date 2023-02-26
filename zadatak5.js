const { Console } = require('console');
var https = require('https');

function httpsCall () {
    https
    .get('https://reqres.in/api/users?page=2', res => {
      let data = ''
  
      res.on('data', chunk => {
        data += chunk
      })
  
      res.on('end', () => {
        let names = '';

        const response = JSON.parse(data);

        for (const item of response.data) {
            if (!names) {
            names = names + `${item.first_name}` 
            } else {
            names = names + `, ${item.first_name}` 
            }
        }


        console.log(names);
      })
    })
    .on('error', err => {
      console.log('Error: ', err.message)
    })

}

httpsCall()


