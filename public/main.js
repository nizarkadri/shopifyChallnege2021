var content = document.querySelector('#resultContent');
var isloaded = false;
var nominatedList = document.querySelector('#nominated_list');
var count = 1;
var nominatedMovieList = new Array();


function checkData()
{
    if (localStorage.getItem("nominatedList") != null)
    {
        var data = JSON.parse(localStorage.getItem("nominatedList"));
    console.log("saved data:", JSON.stringify(data));
    count = data.length;
    for (let i = 0; i < data.length; i++)
    {
        let movie = document.createElement('div');
        let name = document.createElement('h3');
        movie.className = "nominee";
        movie.id = data[i].id;
        name.innerText = data[i].title;
        let btn_delete = document.createElement('button');
        btn_delete.className = "dlt_btn";
        btn_delete.innerText = "Delete";
    
        btn_delete.setAttribute("onclick", "deleteNominee(this)");
        movie.appendChild(name);
        movie.appendChild(btn_delete);

        document.getElementById("nominated_movies").appendChild(movie);
        
    }
    localStorage.removeItem("nominatedList");
    nominatedMovieList = data.slice();    
        }
    
}
function search() {

    var query = document.querySelector("#search_bar").value;
    var uri = "http://"+window.location.host+"/search";
    var requestOptions = {
    method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'query':query })
    // redirect: 'follow'
    };
    fetch(uri, requestOptions).then(response => response.text())
        .then(result => {
            console.log(result);
          
        })
        .catch(error => console.log('error', error));
    window.open("http://" + window.location.host + "/search","___self");
 
}
    
function nominate(element) {

    if (!isFull())
    {
        count = count + 1;
        console.log(element.name);
        //console.log(element.parentNode.name);
        let movie = document.createElement('div');
        let name = document.createElement('h3');
        movie.className = "nominee";
        movie.id = element.name;
        name.innerText = element.parentNode.className;
        let btn_delete = document.createElement('button');
        btn_delete.className = "dlt_btn";
        btn_delete.innerText = "Delete";
    
        btn_delete.setAttribute("onclick", "deleteNominee(this)");
        movie.appendChild(name);
        movie.appendChild(btn_delete);

        document.getElementById("nominated_movies").appendChild(movie);
        this.disabled = true;
        
        nominatedMovieList.push(
            {
                "title": name.innerText,
                "id": element.name.split("|")[0],
                "year": element.name.split("|")[1]
            }
        );

        localStorage.setItem("nominatedList", JSON.stringify(nominatedMovieList));
    }
    else {
        alert("You can nominate only 5 movies!");
    }
}

function deleteNominee(elem) {

    count = count - 1;
    document.getElementById(elem.parentNode.id).remove();
    for (let i = 0; i < nominatedMovieList.length; i++)
    {
        if (nominatedMovieList[i]["id"] == elem.parentNode.id)
        {
            nominatedMovieList.splice(i, 1);
            }
        }
    localStorage.setItem("nominatedList", JSON.stringify(nominatedMovieList));
}

function isFull() {
    
    var Nominatebtns = document.getElementsByClassName("btn_nominate");
    if (count == 5)
    {
        
        for (let i = 0; i < Nominatebtns.length; i++)
        {
            Nominatebtns[i].disabled = true;
        }
        return true;
    }
    else {
        for (let i = 0; i < Nominatebtns.length; i++)
        {
            Nominatebtns[i].disabled = false;
        }
        return false;
    }

    
}