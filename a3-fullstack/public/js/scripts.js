let adverts = [];
let filterDept = '';

document.getElementById('add').addEventListener('click', function() {
    let advert = {};
    advert.id = Date.now().toString(36);
    advert.department = document.getElementById('department').value;
    advert.course = document.getElementById('course').value;
    advert.details = document.getElementById('details').value;
    advert.email = document.getElementById('email').value;

    if(advert.department === '' || advert.course === '' || advert.details === '' || advert.email === '') {
        alert("Please fill all fields");
    } else {
        document.getElementById('department').value = '';
        document.getElementById('course').value = '';
        document.getElementById('details').value = '';
        document.getElementById('email').value = '';
        addAdvert(advert);
    }
    event.preventDefault();
});

document.getElementById('toggle-form').addEventListener('click', function () {
    let btn = document.getElementById('toggle-form').innerText;
    if(btn === 'Hide Form') {
        document.getElementById('add-request').style.display = 'none';
        document.getElementById('advert-div').style.width = '100%';
        document.getElementById('toggle-form').innerText = 'Show Form';
    } else if (btn === 'Show Form') {
        document.getElementById('add-request').style.display = 'inline';
        document.getElementById('advert-div').style.width = '75%';
        document.getElementById('toggle-form').innerText = 'Hide Form';
    }
});

document.getElementById('dept-filter').addEventListener('input', function () {
    filterDept = document.getElementById('dept-filter').value;
    displayAdverts();
});

addAdvert = (advert) => {
    advert.details = advert.details.replace(/'/g, '')
    let request = new XMLHttpRequest();
    request.open('PUT', '/addAdvert');
    request.responseType = 'text';
    request.onload = function() {
        if(request.readyState === 4 && request.status === 200) {
            displayAdverts()};
        };
    request.send( JSON.stringify(advert) )
};

displayAdverts = () => {
    let request = new XMLHttpRequest();
    request.open('GET', '/displayAdverts');
    request.responseType = 'json';
    request.onload = function() {
        if(request.readyState === 4 && request.status === 200) {
            adverts = request.response;
            if(filterDept === '') {
                show(adverts);
            } else {
                let filterAdverts = adverts.filter(advert => advert.department.includes(filterDept));
                show(filterAdverts)
            }
        }
    };
    request.send();
};

deleteAdvert = (advertID) => {
    if(confirm('Are you sure you want to delete this?')) {
        let request = new XMLHttpRequest();
        request.open('DELETE', '/deleteAdvert');
        request.responseType = 'json';
        request.onload = function() {
            if (request.readyState === 4 && request.status === 200) {
                displayAdverts()
            }
        };
        request.send(JSON.stringify(advertID));
    }
};

updateAdvert = (advert) => {
    advert.details = advert.details.replace(/'/g, '')
    let request = new XMLHttpRequest();
    request.open('PUT', '/updateAdvert');
    request.responseType = 'text';
    request.onload = function() {
        if(request.readyState === 4 && request.status === 200) {
            displayAdverts()};
    };
    request.send( JSON.stringify(advert) )
    event.preventDefault();
    cancelUpdate();
};

cancelUpdate = () => {
    document.getElementById('update').style.display = "none";
    document.getElementById('cancel').style.display = "none";
    document.getElementById('add').style.display = "inline";

    document.getElementById('department').value = '';
    document.getElementById('course').value = '';
    document.getElementById('details').value = '';
    document.getElementById('email').value = '';
    event.preventDefault();
};

updateFields = (id, dept, course, details, email) => {
    let update = document.getElementById('update');
    let cancel = document.getElementById('cancel');

    console.log('here');

    update.style.display = "inline";
    cancel.style.display = "inline";
    document.getElementById('add').style.display = 'none';

    document.getElementById('department').value = dept;
    document.getElementById('course').value = course;
    document.getElementById('details').value = details;
    document.getElementById('email').value = email;

    update.addEventListener('click', function () {
        let advert = {
            id: id,
            department: document.getElementById('department').value,
            course: document.getElementById('course').value,
            details: document.getElementById('details').value,
            email: document.getElementById('email').value,
        };
        updateAdvert(advert);
    }, false);
    cancel.addEventListener('click', cancelUpdate, false);
};

show = (adverts) => {
    let table = `${
        adverts.map(advert => 
        `
            <div class="row">
                <p class="dept-col">${advert.department.toUpperCase()}</p>
                <p class="course-col">${advert.course}</p>
                <p class="details-col">${advert.details}</p>
                <p class="email-col">${advert.email}</p>
                <p class="delete-col"><button onclick="deleteAdvert('${advert.id}')" class="delete-button">-</button></p>
                <p class="edit-col"><button onclick="updateFields('${advert.id}', '${advert.department}', ${advert.course}, '${advert.details}', '${advert.email}')"
                    class="edit-button">Edit</button></p>
            </div>
        `
        ).join('')
    }`;
    document.getElementById('adverts').innerHTML = table;
};

displayAdverts();