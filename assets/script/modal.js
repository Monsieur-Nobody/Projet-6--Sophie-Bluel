const ouvreModal = document.getElementById("lienModal");

const modal = document.querySelector('.modal');

const close = document.querySelector('.fa-xmark')


ouvreModal.addEventListener('click', function() {
    modal.style.display = 'flex';
});

close.addEventListener('click', function() {
    modal.style.display = 'none';
});


window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
