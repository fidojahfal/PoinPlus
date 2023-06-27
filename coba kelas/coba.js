var stateObject = {
    "10": {
        "TKJIJ": ["1", "2"],
        "TKGSP": ["1", "2", "3"],
        "TME": ["1", "2"],
        "TTL": ["1", "2"],
        "TEDK": ["1", "2"],
        "TMPO": ["1", "2"],
        "TFM": ["1", "2"],
        "SIJA": ["1", "2"]
    },
    "11": {
        "TKJIJ": ["1", "2"],
        "TKGSP": ["1", "2", "3"],
        "TME": ["1", "2"],
        "TTL": ["1", "2"],
        "TEDK": ["1", "2"],
        "TMPO": ["1", "2"],
        "TFM": ["1", "2"],
        "SIJA": ["1", "2"]
    },
    "12": {
        "TKJIJ": ["1", "2"],
        "TKGSP": ["1", "2", "3"],
        "TME": ["1", "2"],
        "TTL": ["1", "2"],
        "TEDK": ["1", "2"],
        "TMPO": ["1", "2"],
        "TFM": ["1", "2"],
        "SIJA": ["1", "2"]
    }
}
window.onload = function() {
    var kelas = document.getElementById("kelas"),
        jurusan = document.getElementById("jurusan"),
        index = document.getElementById("index");
    for (var state in stateObject) {
        kelas.options[kelas.options.length] = new Option(state, state);
    }
    kelas.onchange = function() {
        jurusan.length = 1; // remove all options bar first
        index.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) {
            jurusan.options[0].text = "Jurusan"
            jurusan.setAttribute('disabled', true);
            index.options[0].text = "Index"
            index.setAttribute('disabled', true);
            return; // done   
        }
        jurusan.options[0].text = "Jurusan"
        jurusan.removeAttribute('disabled')

        for (var county in stateObject[this.value]) {
            jurusan.options[jurusan.options.length] = new Option(county, county);
        }
        if (jurusan.options.length == 2) {
            jurusan.selectedIndex = 1;
            jurusan.onchange();
        }

    }
    kelas.onchange(); // reset in case page is reloaded
    jurusan.onchange = function() {
        index.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) {
            index.options[0].text = "Index"
            index.setAttribute('disabled', true);
            return; // done   
        }
        index.options[0].text = "Index"
        index.removeAttribute('disabled')

        var cities = stateObject[kelas.value][this.value];
        for (var i = 0; i < cities.length; i++) {
            index.options[index.options.length] = new Option(cities[i], cities[i]);
        }
        if (index.options.length == 2) {
            index.selectedIndex = 1;
            index.onchange();
        }

    }
}