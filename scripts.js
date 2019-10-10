function getAlbum(id, length) {
    let req = new XMLHttpRequest();
    let album_text;
    req.open("GET", "https://jsonplaceholder.typicode.com/albums?userId=" + id);
    req.send();
    req.onreadystatechange = function () {
        document.getElementById("albPhotos").innerHTML = ''
        var element = document.getElementById("task");
        if (req.readyState === 4 && req.status === 200) {
            album_text = JSON.parse(this.responseText);
            document.getElementById("preview").innerHTML = "<p>Preview</p><img src=\"https://via.placeholder.com/150/000000/FFFFFF?text=photo+ " + album_text[0].id + "\">";
            for (let i = 0; i < length; i++) {
                let tmp = document.createElement('button');
                tmp.textContent = "Фотография № - " + album_text[i].id;
                tmp.setAttribute("style", "position: absolute; left: 150px; top:" + (9 + (21 * i)) + "px");
                tmp.setAttribute("onclick", "getPhotos(" + id + "," + album_text[i].id + ");");
                element.appendChild(tmp);
                // element.innerHTML += "<br>";
            }
        }
    };
}

function getPhotos(uId, id) {
    reqP = new XMLHttpRequest();
    let photo_text;
    reqP.open("GET", "http://jsonplaceholder.typicode.com/albums?userId=" + uId + "&id=" + id);
    reqP.send();
    reqP.onreadystatechange = function () {
        document.getElementById("albPhotos").innerHTML = ''
        if (reqP.readyState === 4 && reqP.status === 200) {
            photo_text = JSON.parse(this.responseText);
            document.getElementById("userId").innerText = "userId -" + photo_text[0].userId;
            document.getElementById("id").innerText = "№ - " + photo_text[0].id;
            document.getElementById("title").innerText = "title - " + photo_text[0].title;
            document.getElementById("img").innerHTML = "<img src=\"https://via.placeholder.com/150/000000/FFFFFF?text=photo+ " + id + "\">";
        }
    };
}

function Ajax() {
    let xhr = new XMLHttpRequest();
    let formUsrId = document.getElementById("formUserId").value;
    let formId = document.getElementById("formId").value;
    if ((formUsrId == null || formUsrId.length === 0) && (formId == null || formId.length === 0)) {
        alert("Введите данные!");
    } else {
        if ((formUsrId != null || formUsrId.length != 0) && (formId == null || formId.length === 0)) {
            xhr.open("GET", "https://jsonplaceholder.typicode.com/albums?userId=" + formUsrId);
            xhr.send();
        } else if ((formUsrId == null || formUsrId.length === 0) && (formId != null || formId.length != 0)) {
            xhr.open("GET", "https://jsonplaceholder.typicode.com/albums?id=" + formId);
            xhr.send();
        } else if ((formUsrId != null || formUsrId.length != 0) && (formId != null || formId.length != 0)) {
            xhr.open("GET", "http://jsonplaceholder.typicode.com/albums?userId=" + formUsrId + "&id=" + formId);
            xhr.send();
        }

        xhr.onreadystatechange = function () {
            let tmp_text;
            if (xhr.readyState === 4 && xhr.status === 200) {
                tmp_text = JSON.parse(this.responseText);
                document.getElementById("img").innerHTML = '';
                document.getElementById("preview").innerHTML = '';
                document.getElementById("id").innerHTML = '';
                document.getElementById("title").innerHTML = '';
                document.getElementById("userId").innerHTML = '';
                if ((formUsrId != null || formUsrId.length != 0) && (formId == null || formId.length === 0)) {
                    var element = document.getElementById("albPhotos");
                    element.innerHTML = '';
                    for (let i = 0; i < tmp_text.length; i++) {
                        let tmp = document.createElement('img');
                        tmp.setAttribute("src", "https://via.placeholder.com/150/000000/FFFFFF?text=photo" + tmp_text[i].id + "");
                        element.appendChild(tmp);
                        element.innerHTML += "<br>";
                    }
                } else if ((formUsrId == null || formUsrId.length === 0) && (formId != null || formId.length != 0)) {
                    document.getElementById("userId").innerText = "userId -" + tmp_text[0].userId;
                    document.getElementById("id").innerText = "№ - " + tmp_text[0].id;
                    document.getElementById("title").innerText = "title - " + tmp_text[0].title;
                    document.getElementById("img").innerHTML = "<img src=\"https://via.placeholder.com/150/000000/FFFFFF?text=photo+ " + formId + "\">";
                } else if ((formUsrId != null || formUsrId.length != 0) && (formId != null || formId.length != 0)) {
                    document.getElementById("userId").innerText = "userId -" + tmp_text[0].userId;
                    document.getElementById("id").innerText = "№ - " + tmp_text[0].id;
                    document.getElementById("title").innerText = "title - " + tmp_text[0].title;
                    document.getElementById("img").innerHTML = "<img src=\"https://via.placeholder.com/150/000000/FFFFFF?text=photo+ " + formId + "\">";
                }
            }
        }
    }

}


const request = new XMLHttpRequest();
request.open("GET", "https://jsonplaceholder.typicode.com/albums/");
request.responseType = "json";
request.onreadystatechange = function () {
    var element = document.getElementById("task");
    if (request.readyState === 4 && request.status === 200) {
        let albums = request.response;
        let album = [];
        let tmpId = 0;
        for (let i = 0; i < albums.length; i++) {
            if (tmpId === albums[i].userId)
                continue;
            else {
                tmpId = albums[i].userId;
                for (let j = 0; j < albums.length; j++) {
                    if (tmpId === albums[j].userId) {
                        album.push(albums[j]);
                    }
                }
                let tmp = document.createElement('button');
                tmp.textContent = "Альбом № - " + tmpId;
                tmp.setAttribute("onclick", "getAlbum(" + tmpId + "," + album.length + ");");
                element.appendChild(tmp);
                element.innerHTML += "<br>";

                album = [];
            }
        }
    }
};

request.send();