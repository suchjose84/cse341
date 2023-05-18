let url = 'https://nathan-byui-api.onrender.com/temples';
// js function to get data from an api
async function apiFetch(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const getData = async () => {
  const allTemples = await apiFetch(url);
  const temples = allTemples.filter((t) => {
    return t.additionalInfo === true;
  });
  const detailedTemples = [];
  await Promise.all(
    temples.map(async (temple) => {
      const contents = await apiFetch(`${url}/${temple.temple_id}`);
      detailedTemples.push(contents);
    })
  );
  displayData(detailedTemples);
};

const displayData = (data) => {
  let ul = document.getElementById('temples');
  data.forEach((temple) => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', temple.Summary.src);
    a.innerHTML = temple.name;
    li.appendChild(a);
    ul.appendChild(li);
  });
};

getData();
