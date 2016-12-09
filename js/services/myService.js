app.factory('myService', function() {
    var savedCity = "";

    function setCity(city) {
        savedCity = city;
    }

    function getCity() {
        return savedCity;
    }

    return {
        setCity: setCity,
        getCity: getCity
    }

});
