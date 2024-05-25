document.addEventListener('DOMContentLoaded', function() {
    const aramaInput = document.getElementById('aramaInput');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const siralaButton = document.getElementById('siralaButton');
    const fiyatSiralaAscLink = document.getElementById('fiyatSiralaAsc');
    const fiyatSiralaDescLink = document.getElementById('fiyatSiralaDesc');
    const tarihSiralaAscLink = document.getElementById('tarihSiralaAsc');
    const tarihSiralaDescLink = document.getElementById('tarihSiralaDesc');
    const alfabetikSiralaAscLink = document.getElementById('alfabetikSiralaAsc');
    const alfabetikSiralaDescLink = document.getElementById('alfabetikSiralaDesc');
    const siralaDropDown = document.getElementById('siralaDropDown');
    const aktarButton = document.getElementById('aktarButton');
    let urunData = [];
    let fiyatSiralaDir = 'desc';
    let tarihSiralaDir = 'desc';
    let alfabetikSiralaDir = 'asc';
    function fetchData() {
        axios.get('https://fakestoreapi.com/products')
            .then(function(response) {
                urunData = response.data;
                tabloDoldur(urunData);
            })
            .catch(function(error) {
                console.error('Error fetching data:', error);
            });
    }
    function tabloDoldur(data) {
        dataTable.innerHTML = '';
        data.forEach(function(item) {
            const row = dataTable.insertRow();
            row.insertCell(0).textContent = item.id;
            row.insertCell(1).textContent = item.title;
            row.insertCell(2).textContent = `$${item.price.toFixed(2)}`;
            const releaseDate = new Date(item.date || "2023-01-01").toLocaleDateString();
            row.insertCell(3).textContent = releaseDate; 
        });
    }
    function tabloFiltresi(event) {
        const filtre = event.target.value;
        const rows = dataTable.getElementsByTagName('tr');
        Array.from(rows).forEach(function(row) {
            const cells = row.getElementsByTagName('td');
            let match = false;
            Array.from(cells).forEach(function(cell) {
                if (cell.textContent.includes(filtre)) {
                    match = true;
                }
            });
            row.style.display = match ? '' : 'none';
        });
    }
    function fiyatSiralaAsc() {
        const sortedData = urunData.slice().sort((a, b) => a.price - b.price);
        tabloDoldur(sortedData);
        fiyatSiralaDir = 'asc'; 
    }
    function fiyatSiralaDesc() {
        const sortedData = urunData.slice().sort((a, b) => b.price - a.price);
        tabloDoldur(sortedData);
        fiyatSiralaDir = 'desc'; 
    }
    function tarihSiralaAsc() {
        const sortedData = urunData.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
        tabloDoldur(sortedData);
        tarihSiralaDir = 'asc'; 
    }
    function tarihSiralaDesc() {
        const sortedData = urunData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        tabloDoldur(sortedData);
        tarihSiralaDir = 'desc'; 
    }
    function alfabetikSiralaAsc() {
        const sortedData = urunData.slice().sort((a, b) => a.title.localeCompare(b.title));
        tabloDoldur(sortedData);
        alfabetikSiralaDir = 'asc'; 
    }
    function alfabetikSiralaDesc() {
        const sortedData = urunData.slice().sort((a, b) => b.title.localeCompare(a.title));
        tabloDoldur(sortedData);
        alfabetikSiralaDir = 'desc'; 
    }
    siralaButton.addEventListener('click', function() {
        siralaDropDown.classList.toggle('show');
    });
    fiyatSiralaAscLink.addEventListener('click', function(event) {
        event.preventDefault();
        fiyatSiralaAsc();
        siralaDropDown.classList.remove('show'); 
    });
    fiyatSiralaDescLink.addEventListener('click', function(event) {
        event.preventDefault();
        fiyatSiralaDesc();
        siralaDropDown.classList.remove('show'); 
    });
    tarihSiralaAscLink.addEventListener('click', function(event) {
        event.preventDefault();
        tarihSiralaAsc();
        siralaDropDown.classList.remove('show'); 
    });
    tarihSiralaDescLink.addEventListener('click', function(event) {
        event.preventDefault();
        tarihSiralaDesc();
        siralaDropDown.classList.remove('show'); 
    });
    alfabetikSiralaAscLink.addEventListener('click', function(event) {
        event.preventDefault();
        alfabetikSiralaAsc();
        siralaDropDown.classList. remove('show'); 
    });
    alfabetikSiralaDescLink.addEventListener('click', function(event) {
        event.preventDefault();
        alfabetikSiralaDesc();
        siralaDropDown.classList.remove('show'); 
    });
    aramaInput.addEventListener('input', tabloFiltresi);
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.sirala-button')) {
            if (siralaDropDown.classList.contains('show')) {
                siralaDropDown.classList.remove('show');
            }
        }
    });
    aktarButton.addEventListener('click', function() {
        excelDonustur('urunler.csv', urunData);
    });
    fetchData();
});
function excelDonustur(filename, data) {
    let excelIcerik = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(data[0]).join(',');
    excelIcerik += headers + '\n';
    data.forEach(function(row) {
        const values = Object.values(row).join(',');
        excelIcerik += values + '\n';
    });

    const encodedUri = encodeURI(excelIcerik);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
}

