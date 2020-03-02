console.log('Client side JS')

const weatherForm = document.querySelector('#weatherForm')
const weatherFormError = document.querySelector('#weatherFormError')
const weatherFormSuccess = document.querySelector('#weatherFormSuccess')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFormError.innerHTML = ""
    weatherFormSuccess.innerHTML = "Loading..."
    const location = document.querySelector('#address').value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            weatherFormError.innerHTML = ""
            weatherFormSuccess.innerHTML = ""
            if(data.error) {
                weatherFormError.innerHTML = data.error
            } else {
                weatherFormSuccess.innerHTML = '<b>' + data.location + '</b><br/>' + data.weather + '<br/>' + data.temperature
            }
        })
    })
})