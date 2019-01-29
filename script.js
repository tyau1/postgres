const pg = require('pg');
const settings = require("./settings");

const client = new pg.Client(settings);

const [data] = process.argv.slice(2);
client.connect();

function findPerson(data) {
    console.log("Searching ...")

    client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [data], (err, res) => {
        if (err) {
            console.log("ERROR:", err);
            return false
        } else {

            console.log(`Found ${res.rows.length} person(s) by the name '${data}':` )
            res.rows.forEach(function (person, index) {
                let result = (index+1)+':';
                const date = person.birthdate.toDateString();
                console.log('-', result, `${person.first_name} ${person.last_name}, born '${date}'`);
            })
        }
        client.end();
    });
}

findPerson(data);

