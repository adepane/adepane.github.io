const baseApi = 'https://api.football-data.org/v2/';
const apiKey = 'b68ba9e061074d81bf4391137447c8f4';

const fetchFromApi = (path) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApi}${path}`, {
            headers: {
                'X-Auth-Token': apiKey,
            },
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                document.querySelector('#events').innerHTML = `<span class="offline">We are trying to get data from our site, <br> but you are curently offline, Please try again later</span>`;
                reject(error);
            })
    })
}

const fetchData = (path) => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(`${baseApi}${path}`).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        resolve(data);
                    });
                } else {
                    fetchFromApi(path)
                        .then(response => resolve(response));
                }
            });
        } else {
            fetchFromApi(path)
                .then(response => resolve(response));
        }
    })
    
}



const getSavedMatches = () => {
    getAll().then(function (matches) {
        var matchList = "";
        let checkDate = null;
        console.log(matches.length);
        if (matches.length != 0) {
            matches.forEach(function (match) {
                console.log(match)
                if (match.status == "FINISHED") {
                    statusMatch = "FT";
                    scoreMatch = `${match.score.fullTime.homeTeam} - ${match.score.fullTime.homeTeam}`;
                } else if (match.status == "POSTPONED") {
                    statusMatch = "PS";
                    scoreMatch = '? - ?';
                } else {
                    statusMatch = "SC";
                    scoreMatch = '? - ?';
                }
                let getDate = match.utcDate.split('T');
                if (checkDate != getDate[0]) {
                    checkDate = getDate[0];
                    let flatImg = (match.competition.area.ensignUrl != null) ? `<span class="flag"><img src="${match.competition.area.ensignUrl}" width="20" /></span>` : '';
                    matchList += `
                        <div class="head-row">
                            ${flatImg}
                            <span>
                                <span class="category">${match.competition.name}</span>
                            </span>
                            <span class="date">${formatDate(getDate[0])}</span>
                        </div>
                    `;
                    matchList += renderMatchRow('match', match.id, statusMatch, match.homeTeam.name, scoreMatch, match.awayTeam.name, true, true);
                } else {
                    matchList += renderMatchRow('match', match.id, statusMatch, match.homeTeam.name, scoreMatch, match.awayTeam.name, true, true);
                }
            });
            document.getElementById("events").innerHTML = matchList;
        } else {
            document.getElementById("events").innerHTML = `<span class="no-favorite">You don't have a favorite match yet.</span>`;
        }

    });

}

const getSavedMatch = (id) => {
    getById(id).then(function (match) {
        let matchData = {'match':match};
        detailMatch(matchData)
    });
}