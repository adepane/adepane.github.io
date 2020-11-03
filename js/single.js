const single = () => {
    document.addEventListener("DOMContentLoaded", () => {
        preLoader();
        // let elems = document.querySelectorAll(".sidenav");
        // M.Sidenav.init(elems);
        // loadNav();
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        const isFromSaved = urlParams.get("saved");
        let btnSave = document.getElementById("save-match");
        let btnDelete = document.getElementById("del-match");
        if (isFromSaved) {
            btnSave.style.display = 'none';
            getSavedMatch(idParam);
            btnDelete.onclick = () => {
                delMatch(idParam).then(response => {
                    if (response.status == 1) {
                        window.location.replace("/");
                    }
                })
            }
        } else {
            btnDelete.style.display = 'none';
            fetchData(`matches/${idParam}`)
                .then(response => {
                    let matchDetail = detailMatch(response)
                    btnSave.onclick = () => {
                        saveForLater(matchDetail)
                        btnSave.style.display = 'none';
                        let modalElems = document.querySelector('#modal');
                        let modalInstance = M.Modal.init(modalElems)
                        modalInstance.open()
                    };

                })
        }
    });
}
single();