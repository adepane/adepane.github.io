const loadPage = (pathApi) => {
    return fetchData(pathApi)
    .then(response => {
        if (response.count > 0) {
            let checkDate = null;
            let dataMatchs = "";
            dataMatchs += `
            <div class="head-row">
                <span>
                    <span class="category">${response.competition.area.name}</span>
                </span>
                <span class="date">${response.competition.name}</span>
            </div>
        `;
            response.matches.forEach(match => {
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
                    dataMatchs += `
                    <div class="head-row">
                        <span class="date">${formatDate(getDate[0])}</span>
                    </div>
                `;
                    dataMatchs += renderMatchRow('match',match.id,statusMatch,match.homeTeam.name,scoreMatch,match.awayTeam.name, true);
                } else {
                    dataMatchs += renderMatchRow('match', match.id, statusMatch, match.homeTeam.name, scoreMatch, match.awayTeam.name, true);
                }
            });
            return Promise.resolve(dataMatchs);
        } else {
            return Promise.reject(response);
        }
        
    })
}

const loadHome = (pathApi) => {
    fetchData(pathApi)
        .then(response => groupBy(response.matches, (c) => c.competition.area.name))
        .then(data => {
            let dataEvents = "";
            Object.keys(data).forEach((country) => {
                let flatImg = (data[country][0].competition.area.ensignUrl != null) ? `<span class="flag"><img src="${data[country][0].competition.area.ensignUrl}" width="20" /></span>` : '';
                dataEvents += `
                    <div class="head-row">
                        ${flatImg}
                        <span>
                            <span class="category">${country}</span>
                        </span>
                    </div>
                `;
                let checkKey = null;
                let checkDate = null;
                data[country].forEach(event => {
                    let statusMatch = null
                    let scoreMatch = null;
                    if (event.status == "FINISHED") {
                        statusMatch = "FT";
                        scoreMatch = `${event.score.fullTime.homeTeam} - ${event.score.fullTime.homeTeam}`;
                    } else if (event.status == "POSTPONED") {
                        statusMatch = "PS";
                        scoreMatch = '? - ?';
                    } else {
                        statusMatch = "SC";
                        scoreMatch = '? - ?';
                    }
                    let getDate = event.utcDate.split('T');
                    if (checkKey !== event.competition.name || checkDate !== getDate[0]) {
                        checkKey = event.competition.name;
                        checkDate = getDate[0];
                        dataEvents += `
                            <div class="head-row">
                                <span>
                                    <a class="country-code" data-match="competition" data-competition="${event.competition.id}" href="#${event.competition.id}">
                                        <span class="category">${event.competition.name}</span>
                                    </a>
                                </span>
                                <span class="date">${formatDate(getDate[0])}</span>
                            </div>
                        `;
                        dataEvents += renderMatchRow('match', event.id, statusMatch, event.homeTeam.name, scoreMatch, event.awayTeam.name, true);
                    } else {
                        dataEvents += renderMatchRow('match', event.id, statusMatch, event.homeTeam.name, scoreMatch, event.awayTeam.name, true);
                    }
                })

            });
            document.querySelector('#events').innerHTML = dataEvents;
            // loadMenu();
            loadNav();
        })
}

const main = () => {
    document.addEventListener("DOMContentLoaded", () => {
        let elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
        loadHome(`matches?dateFrom=${lastWeek()}&dateTo=${tommorow()}`)
    });
}

preLoader();
main();