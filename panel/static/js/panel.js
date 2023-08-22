const card_recommend = document.querySelector("#card_recommend")
const card_draw = document.querySelector("#card_draw")



card_recommend.onclick = () => {
    window.location = "http://127.0.0.1:8000/panel/recommend"
}

card_draw.onclick = () => {
    window.location = "http://127.0.0.1:8000/panel/draw"
}