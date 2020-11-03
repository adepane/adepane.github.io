const formatDate = (d) => {
    var date = new Date(d);

    if (isNaN(date.getTime())) {
        return d;
    }
    else {

        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        day = date.getDate();

        if (day < 10) {
            day = "0" + day;
        }
        return day + " " + month[date.getMonth()] + " " + date.getFullYear();
    }
}

const groupBy = (xs, f) => {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

const createFormatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}

const today = () => {
    const thisDay = new Date();
    return createFormatDate(thisDay);
}

const tommorow = () => {
    const day = new Date();
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return createFormatDate(nextDay);
}

const lastWeek = () => {
    const day = new Date();
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() - 7);
    return createFormatDate(nextDay);
}

const nextWeek = () => {
    const day = new Date();
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 7);
    return createFormatDate(nextDay);
}

const scrollToTop = () => {
    const position = document.body.scrollTop || document.documentElement.scrollTop;
    let scrollAnimation; 
    if (position) {
        window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
        scrollAnimation = setTimeout("scrollToTop()", 15);
    } else {
        clearTimeout(scrollAnimation)
    };
}

const preLoader = () => {
    document.getElementById("events").innerHTML = `
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-yellow-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    `;
    scrollToTop();
}

const renderMatchRow = (match, competition, statusMatch, home, score, away, trigger = false, save = false) => {
    return `
        <div class="res-row">
            <a class="country-code" data-match="${match}" data-competition="${competition}" href="${(trigger) ? `/p/result.html?id=${competition}${(save)?'&saved=true':''}` : `#${competition}`}">
                <div class="stat-col">
                    <span class="stat-match">
                        <span class="stat-fulltime">${statusMatch}</span>
                    </span>
                    <span class="middle">
                        <span class="home">${home}</span>
                        <span class="score">${score}</span>
                        <span class="away">${away}</span>
                    </span>
                </div>
            </a>
        </div>
    `;
}