const btnEl = document.getElementById('btn');
const errorMessageEl = document.getElementById('errorMessage');
const galleryEl = document.getElementById('gallery');

btnEl.addEventListener('click', fetchImage);

async function fetchImage(){
    const inputValue = document.getElementById('input').value;
    if(inputValue > 10  || inputValue < 1){
        errorMessageEl.style.display = 'block';
        errorMessageEl.innerText = 'number should be between 1 to 10';
        return;
    }
     
    imgs ='';
     try {
        btnEl.style.display = 'none';
        const loading = `<img src='spinner.svg' />`;
        galleryEl.innerHTML = loading;
        await fetch(`https:/api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()*1000)}&client_id=W-7kMflhSC8KDoLk4hrXhVB2JUBKaAooGia671GGFYE`).then((res)=>res.json()).then((data)=>{
            if(data){
                data.forEach((pic)=>{
                    imgs += `
                    <img src=${pic.urls.small} alt='image'/>
                    `
                    galleryEl.style.display = 'block';
                    galleryEl.innerHTML = imgs;
                    btnEl.style.display = 'block';
                    errorMessageEl.style.display = 'none';
                })
            }
        });
     } catch (error) {
        errorMessageEl.style.display = 'block';
        errorMessageEl.innerText = 'error, plss try again';
        btnEl.style.display = 'block';
     }

    
}
