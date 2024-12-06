console.log('its works');

const containerEl = document.querySelector('.row')


axios.get("http://127.0.0.1:3002/post")
    .then(response => {
      let listAxios = response.data;
        // console.log(listAxios);

    listAxios.data.forEach(element => {
        console.log(element);
        const {title, author, img, description} = element
        
        const markup = `

        <div id="card-big" class="col-sm-12 col-md-6 col-lg-4 g-3">
         <div class="card border-3 border-warning rounded-0 mb-5 mt-5">
          <ul>
             <li>${title}</li>
             <li>${author}</li>
             <img src="./${img}" alt="img-blog">
             <li>${description}</li>
          </ul>
         </div>
         </div>
        `

        containerEl.innerHTML += markup
    });

    }).catch(err => console.log(err));