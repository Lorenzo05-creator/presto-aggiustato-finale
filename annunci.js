fetch('./annunci.json')
  .then((response) => response.json())
  .then((data) => {
    const radiowrapper = document.querySelector('#radioWrapper');
    const annunciContainer = document.querySelector('#annunciContainer');
    
    function radioCreate(data) {
      const categories = data.map((annuncio) => annuncio.category);
      const uniqueCategories = Array.from(new Set(categories));

      radiowrapper.innerHTML = '';

      uniqueCategories.forEach((category, index) => {
        const div = document.createElement('div');
        div.classList.add('form-check');

        const radioId = `radio${index}`;

        div.innerHTML = `
          <input class="form-check-input" type="radio" name="categoryFilter" id="${radioId}" value="${category}" ${index === 0 ? 'checked' : ''}>
          <label class="form-check-label" for="${radioId}">${category}</label>
        `;

        radiowrapper.appendChild(div);
      });

      document.querySelectorAll('input[name="categoryFilter"]').forEach((radio) => {
        radio.addEventListener('change', filterAndDisplayAds);
      });

      filterAndDisplayAds();
    }

    function filterAndDisplayAds() {
      const selectedCategory = document.querySelector('input[name="categoryFilter"]:checked').value;
      const minPrice = parseFloat(document.querySelector('#collapseTwo input[type="number"]:first-child').value) || 0;
      const maxPrice = parseFloat(document.querySelector('#collapseTwo input[type="number"]:last-child').value) || Infinity;
      const keyword = document.querySelector('#collapseThree input[type="text"]').value.toLowerCase();

      const filteredAnnunci = data.filter((annuncio) => {
        const matchesCategory = annuncio.category === selectedCategory;
        const matchesPrice = parseFloat(annuncio.price) >= minPrice && parseFloat(annuncio.price) <= maxPrice;
        const matchesKeyword = annuncio.name.toLowerCase().includes(keyword);

        return matchesCategory && matchesPrice && matchesKeyword;
      });

      annunciContainer.innerHTML = '';

      if (filteredAnnunci.length > 0) {
        filteredAnnunci.forEach((annuncio) => {
          const div = document.createElement('div');
          div.classList.add('col', 'mb-4');

          div.innerHTML = `
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <h5 class="card-title">${annuncio.name}</h5>
                <p class="card-text">Categoria: ${annuncio.category}</p>
                <strong>Prezzo: €${parseFloat(annuncio.price).toFixed(2)}</strong>
              </div>
            </div>
          `;

          annunciContainer.appendChild(div);
        });
      } else {
        annunciContainer.innerHTML = '<p>Nessun annuncio disponibile per questi criteri.</p>';
      }
    }

    radioCreate(data);
    
    document.querySelectorAll('#collapseTwo input[type="number"]').forEach((input) => {
      input.addEventListener('input', filterAndDisplayAds);
    });

    document.querySelector('#collapseThree input[type="text"]').addEventListener('input', filterAndDisplayAds);
  })
  .catch((error) => console.error('Errore nel caricamento del JSON:', error));