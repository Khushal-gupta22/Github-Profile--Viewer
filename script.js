const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");

const getUser = async(username) => {
    const response = await fetch(APIURL + username);
    //console.log(response);
    const data = await response.json();
    // console.log(data);

    if (data.name == null) {
        alert("Sorry! No user exists with the username provided");
        searchBox.value = "";
    } else {

        const card = `
            <div class="card">
                <div>
                    <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
                </div>
                <div class="user-info">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>
                    <ul class="info">
                        <li>${data.followers}<strong>Followers</strong></li>
                        <li>${data.following}<strong>Following</strong></li>
                        <li>${data.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <div id="repos">
                        
                    </div>
                </div>
            </div> -->
            `
            main.innerHTML = card;
            getRepos(username);

    }


}

const getRepos = async (username) => {
    const repos = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach(
        (item) => {
            //console.log(item);
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem);

        }
    );
    //console.log(data);
}

const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
    }

    return false; // page does not get refreshed upon form submit 
}

getUser("Khushal-gupta22");

 /*// {/* <a class="repo" href="#" target="_blank">Repo 1</a>
                    <a class="repo" href="#" target="_blank">Repo 2</a>
                    <a class="repo" href="#" target="_blank">Repo 3
</a> */