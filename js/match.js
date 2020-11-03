const detailMatch = (data) => {
    // console.log(data);
    let statusMatch = null
    let scoreMatch = null;
    let scoreHalfMatch = null;
    let getDate = data.match.utcDate.split('T');

    if (data.match.status == "FINISHED") {
        statusMatch = "FT";
        scoreMatch = `${data.match.score.fullTime.homeTeam} - ${data.match.score.fullTime.homeTeam}`;
        scoreHalfMatch = `${data.match.score.halfTime.homeTeam} - ${data.match.score.halfTime.awayTeam}`;
    } else if (data.match.status == "POSTPONED") {
        statusMatch = "PS";
        scoreMatch = '? - ?';
        scoreHalfMatch = `? - ?`;
    } else {
        statusMatch = "SC";
        scoreMatch = '? - ?';
        scoreHalfMatch = `? - ?`;
    }
    let flatImg = (data.match.competition.area.ensignUrl != null) ? `<span class="flag"><img src="${data.match.competition.area.ensignUrl}" width="20" /></span>` : '';
    let dataMatch = `
        <div class="head-row">
            ${flatImg}
            <span>
                <span class="category">${data.match.competition.area.name}</span>
            </span>
            <span class="date">${data.match.competition.name}</span>
        </div>
        <div class="head-row">
            <span>
                <span class="category">${data.match.status}</span>
            </span>
            <span class="date">${formatDate(getDate[0])}</span>
        </div>
        <div class="res-row">
            <div class="stat-col">
                <span class="stat-match">
                        <span class="stat-fulltime">${statusMatch}</span>
                    </span>
                <span class="middle">
                    <span class="home">${data.match.homeTeam.name}</span>
                    <span class="score">${scoreMatch}</span>
                    <span class="away">${data.match.awayTeam.name}</span>
                </span>
            </div>
        </div>
        <div class="res-row">
            <div class="stat-col">
                <span class="stat-match">
                        <span class="stat-fulltime">HT</span>
                    </span>
                <span class="middle">
                    <span class="home">Half-time</span>
                    <span class="score">${scoreHalfMatch}</span>
                    <span class="away"></span>
                </span>
            </div>
        </div>
    `
    dataMatch += `
        <div class="head-row">
            <span>
                <span class="category">Referee</span>
            </span>
            <span class="date"></span>
        </div>
    `
    data.match.referees.forEach((referee, key) => {
        dataMatch += `
            <div class="res-row">
                <div class="stat-col">
                    <span class="stat-match">
                            <span class="stat-fulltime">${key + 1}</span>
                        </span>
                    <span class="middle">
                        <span class="home">${referee.name}</span>
                        <span class="score"></span>
                        <span class="away"></span>
                    </span>
                </div>
            </div>
        `;
    });
    document.querySelector('#events').innerHTML = dataMatch;
    document.querySelector('#save-match').setAttribute("data-match", data.match.id);
    return data.match;
}
