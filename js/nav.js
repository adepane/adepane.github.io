const navLoad = (page, tag = "") => {
    preLoader();
    switch (page) {
        case 'home':
            loadHome(`matches?dateFrom=${lastWeek()}&dateTo=${tommorow()}`)
            break;

        case 'nextevent':
            loadHome(`matches?dateFrom=${today()}&dateTo=${nextWeek()}&status=SCHEDULED`)
            break;

        case 'savematch':
            getSavedMatches();
            break;
        
        default:
            // console.log(tag)
            // const btnCountry = document.querySelectorAll('.country-code');
            const idModel = tag.getAttribute("data-competition");
            loadPageNav(`competitions?areas=${idModel}`);
            break;
    }
}

const loadNav = () => {
    fetch('/p/nav.html')
        .then(response => {
            return response.text()
        })
        .then(responseText => {
            document.querySelectorAll(".topnav, .sidenav").forEach((list) => {
                list.innerHTML = responseText;
            });
            document.querySelectorAll(".topnav a").forEach((menu) => {
                menu.addEventListener("click", () => {
                    // let sidenav = document.querySelector(".sidenav");
                    // M.Sidenav.getInstance(sidenav).close();
                    page = menu.getAttribute("href").substr(1);
                    navLoad(page);
                });
            });
            loadMenu().then(response => {
                document.querySelector("#nav-mobile").innerHTML += response;
                document.querySelectorAll('.sidenav a').forEach(item => {
                    item.addEventListener('click', (event) => {
                        event.stopPropagation();
                        event.stopImmediatePropagation();
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = item.getAttribute("href").substr(1);
                        navLoad(page, item);
                    })
                })
            });
        });
}

const countryLink = () => {
    const btnCountry = document.querySelectorAll('.country-code');
    btnCountry.forEach(countryItem => {
        countryItem.addEventListener("click", (event) => {
            event.stopPropagation();
            event.stopImmediatePropagation();
            const cModel = countryItem.getAttribute("data-match");
            const idModel = countryItem.getAttribute("data-competition");
            switch (cModel) {
                case 'area':
                    preLoader();
                    loadPageNav(`competitions?areas=${idModel}`);
                    break;

                case 'competition':
                    preLoader();
                    loadPage(`competitions/${idModel}/matches`)
                        .then(result => {
                            document.querySelector('#events').innerHTML = result;
                            countryLink();
                        })
                        .catch(error => {
                            M.toast({ html: "Sorry, but your subscription not able to access this competitions, please upgrade your subscription." })
                            loadHome(`matches?dateFrom=${lastWeek()}&dateTo=${tommorow()}`);
                        })
                    break;
            }
        })
    });
}


const loadPageNav = (pathApi) => {
    fetchData(pathApi)
        .then(response => {
            let dataMatchs = "";
            dataMatchs += `
                <div class="head-row">
                    <span>
                        <span class="category">${response.competitions[0].area.name}</span>
                    </span>
                </div>
            `;
            response.competitions.forEach(competition => {
                dataMatchs += `
                <div class="head-row">
                    <span class="date">${competition.name}</span>
                </div>
            `;
                dataMatchs += renderMatchRow('competition', competition.id, 'Current Session', formatDate(competition.currentSeason.startDate), 'to', formatDate(competition.currentSeason.endDate), false);
            });
            document.querySelector('#events').innerHTML = dataMatchs;
            countryLink();

        });
}

const loadMenu = () => {
    return fetchData('competitions')
        .then(response => groupBy(response.competitions, (c) => c.area.name))
        .then(data => {
            let dataMenu = "";
            let dataNav = ""
            Object.keys(data).forEach((country) => {
                let flatImg = (data[country][0].area.ensignUrl != null) ? ` <span class="flag"><img src="${data[country][0].area.ensignUrl}" width="20" /></span>` : '';
                dataMenu += `
                   <li class="head-row item-country">
                       ${flatImg}
                        <span>
                            <a class="country-code" data-match="area" data-competition="${data[country][0].area.id}" href="#${data[country][0].area.countryCode}">
                                <span class="category menu-item">${country}</span>
                            </a>
                        </span>
                    </li>
                `;
                dataNav += `
                   <li>
                        <a class="waves-effect country-code " data-match="area" data-competition="${data[country][0].area.id}" href="#${data[country][0].area.countryCode}">${flatImg} ${country}</a>
                    </li>
                `;
            })
            document.querySelector('#soccer-list').innerHTML = dataMenu;
            countryLink();
            return Promise.resolve(dataNav);
        })
}