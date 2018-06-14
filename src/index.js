//<div class="image-container">
//    <img src="https://scontent-lga3-1.cdninstagram.com/vp/bd9b15079ec27c52c076e9c7792bdc04/5B992309/t51.2885-15/s640x640/sh0.08/e35/c180.0.719.719/31449135_2115995735352355_6317812590797914112_n.jpg">
//    <p>
//        <img data-action="like-image" data-image-id="1" class="like-button" src="./images/like.png"><br>
//        <span id="likes-count-for-image-1">41</span>
//    </p>
//</div>


const postImageForm = document.getElementById('post-image-form')
const imageContainer = document.getElementById('container')
const imageURL = 'http://localhost:3001/api/v1/images'
const imageText = document.getElementById('post-image-form-url')
const likesURL = 'http://localhost:3001/api/v1/likes'


fetch(imageURL).then(r=>r.json()).then(getImages)

postImageForm.addEventListener('submit', function(event){
  event.preventDefault()
  const input = imageText.value
  makeImagePost(input)

})


imageContainer.addEventListener('click', function(event){
  if (event.target.dataset.action == "like-image") {
    let likeCount =  Number(event.target.parentElement.innerText)
    let imageId = event.target.parentElement.children[0].dataset.imageId
    addMoreLike(imageId, likeCount, event)
  }
})

function getImages(images) {

  images.map(getImage)
}


function getImage(image) {
  // li = document.createElement('LI')
  // li.setAttribute('id', `${image.id}`)
  // li.innerHTML = `<img src="${image.url}"> ${image.likes_count}<button id="${image.id}"> LIKE </button>`
  // imageContainer.appendChild(li)

  imageContainer.innerHTML += `<div class="image-container">
      <img src="${image.url}">
     <p>
          <img data-action="like-image" data-image-id="${image.id}" class="like-button" src="./images/like.png"><br>
          <span id="likes-${image.id}">${image.likes_count}</span>
      </p>
  </div> `


}

function addMoreLike(imageId, likeCount, event) {
  const body = {
    image_id: imageId
  }
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(body)
  }


  fetch(likesURL, config).then(r => r.json()).then(a => moreLike(a, event))

}


  function moreLike(a, event) {

    let likeCount = Number(event.target.parentElement.children[2].innerText)
    likeCount = 1 + likeCount
    event.target.parentElement.children[2].innerText = likeCount

  }



function makeImagePost(input) {
  const body = {
    url: input
  }
  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  fetch(imageURL, config).then(r => r.json()).then(getImage)

}
