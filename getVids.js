const fetch = require('node-fetch');

async function getVid(q) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q + ' filetype:video')}&utf8=&format=json`;
    const r = await fetch(url).then(res => res.json());
    if (!r.query.search.length) return console.log(q, 'No results');
    const title = r.query.search[0].title;
    const imageInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=videoinfo&viprop=url&format=json`;
    const info = await fetch(imageInfoUrl).then(res => res.json());
    const pages = info.query.pages;
    const urlRes = pages[Object.keys(pages)[0]].videoinfo[0].url;
    console.log(q, urlRes);
  } catch (e) {
    console.log(q, e.message);
  }
}

async function main() {
  await getVid('snow fall snow');
  await getVid('cherry blossom spring');
  await getVid('beach ocean waves');
  await getVid('autumn forest leaves');
}

main();
