const card_recommend = document.querySelector("#card_recommend")
const card_draw = document.querySelector("#card_draw")
const action_logout = document.querySelector("#action_logout")
const user_name = document.querySelector("#user_name")

card_recommend.onclick = () => {
    window.location = "http://127.0.0.1:8000/panel/recommend"
}

card_draw.onclick = () => {
    window.location = "http://127.0.0.1:8000/panel/draw"
}

action_logout.onclick = () => {
    delete localStorage['token']
    window.location.replace("http://127.0.0.1:8000/account")
}

if (!localStorage['token']) {
    window.location.replace("http://127.0.0.1:8000/account")
}

user_name.innerHTML = localStorage["user_full_name"]