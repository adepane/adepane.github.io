var dbPromised = idb.open("hasil-liga", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("matches", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("competition", "competition.name", { unique: false });
});

function saveForLater(match) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            console.log(match);
            store.put(match);
            return tx.complete;
        })
        .then(function () {
            console.log("Match berhasil di simpan.");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.getAll();
            })
            .then(function (matches) {
                resolve(matches);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.get(parseInt(id));
            })
            .then(function (response) {
                resolve(response);
            });
    });
}

function delMatch(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction('matches', 'readwrite');
                var store = tx.objectStore('matches');
                return store.delete(parseInt(id));
            }).then(function () {
                resolve({'status':1})
            });
    })
}