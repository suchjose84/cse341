let url = 'https://cse341-mw5a.onrender.com/contacts';
// js function to get data from an api
async function apiFetch(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const getData = async () => {
  const allContacts = await apiFetch(url);
  const contacts = allContacts.filter((t) => {
    return t.additionalInfo === true;
  });
  const detailedContacts = [];
  await Promise.all(
    contacts.map(async (contact) => {
      const contents = await apiFetch(`${url}/${contact._id}`);
      detailedContacts.push(contents);
    })
  );
  displayData(detailedContacts);
};

const displayData = (data) => {
  let ul = document.getElementById('contacts');
  data.forEach((contact) => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href', contact.Summary.src);
    a.innerHTML = contact.firstName;
    li.appendChild(a);
    ul.appendChild(li);
  });
};

getData();
