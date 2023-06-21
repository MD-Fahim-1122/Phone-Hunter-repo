const loadPhone = async (searchText, dataLimit) =>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json()
    displayPhone(data.data ,dataLimit)
}


const displayPhone =(phones,dataLimit)=>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ''
    // display 20 phone only 
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 12){
      phones = phones.slice(0,12)
      showAll.classList.remove('d-none')
    }
    else(
      showAll.classList.add('d-none')
    )

    // Display no phones found
    const noPhone = document.getElementById('no-found-message')
    if(phones.length === 0){
      noPhone.classList.remove('d-none')
    }
    else{
      noPhone.classList.add('d-none')
    }
    // Display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.</p>
        </div>
      </div>
        `
       phonesContainer.appendChild(phoneDiv); 
    });
    // stop laoder
    toggleSpinner(false)

}
const processSearch = (dataLimit) =>{
  toggleSpinner(true)
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value ;
  loadPhone(searchText,dataLimit);
}
// Handle search button clicked
document.getElementById('btn-search').addEventListener('click',function () {
  // start loader
  processSearch(10)
})

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}
// Not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
  processSearch();
})

// loadPhone()