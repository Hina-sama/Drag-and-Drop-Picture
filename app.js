let files = [],
button = document.querySelector('.top button'), 
form = document.querySelector('form'),
container = document.querySelector('.container'), 
text = document.querySelector('.inner'),
browse = document.querySelector('.select'), 
input = document.querySelector('form input');
browse.addEventListener('click', () => input.click());

// input change event
input.addEventListener('change', () => { 
    let file = input.files;

    for (let i = 0; i <file.length; i++) { 
        if (files.every(e => e.name != file[i].name)) files.push(file[i])
    }

    form.reset();
    showImages();
})

const showImages = () => { 
    let container = document.querySelector('.container');
    container.innerHTML = ''; // xóa nội dung cũ

    files.forEach((file, index) => {
        let imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = 'image';

        let span = document.createElement('span');
        span.textContent = '×';
        span.onclick = () => delImage(index);

        imageDiv.appendChild(img);
        imageDiv.appendChild(span);
        container.appendChild(imageDiv);
    });
}
    
// drag and drop
form.addEventListener('dragover', e => { 
  e.preventDefault()

  form.classList.add('dragover') 
  text.innerHTML = 'Drop images here'
})

form.addEventListener('dragleave', e => { 
  e.preventDefault()

  form.classList.remove('dragover')
  text.innerHTML = 'Drag & drop image here or <span class="select">Browse</span>'
})

form.addEventListener('drop', e => {
  e.preventDefault()
  
  form.classList.remove('dragover')
  text.innerHTML = 'Drag & drop image here or <span class="select">Browse</span>'

  let file = e.dataTransfer.files;
  for (let i = 0; i < file.length; i++) {
      if (files.every(e => e.name != file[i].name)) files.push(file[i])
  }

  showImages();
})

button.addEventListener('click', () => {
  let form = new FormData();
  files.forEach((e, i) => form.append(`file[${i}]`, e))
})
