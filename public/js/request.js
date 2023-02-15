const previewAvatar = document.querySelector('#previewAvatar');

document.querySelector('#avatar').addEventListener('change', function () {
    if (this.files[0]) {
        previewAvatar.style.display = 'block';
        previewAvatar.src = URL.createObjectURL(this.files[0]);
    }
});