var fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;
const ORIGIN_URL = process.env.ORIGIN_URL || 'http://localhost:8000';
const booksNum = 50;
const pages = [1, 2, 3, 4];
const kindOfBooks = ['ItemNewAll', 'ItemNewSpecial', 'Bestseller', 'BlogBest'];

// true 로 할 경우
// 알라딘에서 항시 최신 정보를 받음
// false 로 할 경우
// 알라딘에서 이전에 받았던 정보가 있다면 알라딘에 요청하지 않고 이전에 받았던 정보를 재활용
const USE_CASHED_DATA = false;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

function getbookListUrl(getBooksList, pageNumber) {
  return `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=${getBooksList}&MaxResults=${booksNum}&start=${pageNumber}&SearchTarget=Book&output=js&Version=20131101`;
}

function getbookListUrl(getBooksList, pageNumber) {
  return `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${API_KEY}&QueryType=${getBooksList}&MaxResults=${booksNum}&start=${pageNumber}&SearchTarget=Book&output=js&Version=20131101`;
}

function getBookDetail(isbn13) {
  return `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${API_KEY}&itemIdType=ISBN13&ItemId=${isbn13}&output=js&Version=20131101&Cover=Big&OptResult=ebookList,usedList,Toc,ratingInfo,authors`;
}

function getBookPath(idx) {
  return __dirname + `/aladindb/item_${idx}.json.stackdump`;
}

function convertFormat(aladinItem) {
  let convertedItem = {
    title: aladinItem.title,
    author: aladinItem.subInfo?.authors[0]?.authorName || undefined,
    authorIntro: aladinItem.subInfo?.authors[0]?.authorInfo || undefined,
    category: aladinItem.categoryName.split('>')[1],
    coverImg: aladinItem.cover,
    introduction: aladinItem.description || undefined,
    toc: aladinItem.subInfo.toc || undefined,
    publishTime: aladinItem.pubDate,
    publisher: aladinItem.publisher,
    ratingScore: getRandomInt(100) * 0.1,
    page: aladinItem.subInfo.itemPage || 0,
  };
  return convertedItem;
}
// npm run db 명령어 사용시 books data 생성

const postBook = async book => {
  await axios
    .post(ORIGIN_URL + '/books', book)
    .then(v => {
      console.log(`worked`);
    })
    .catch(e => {
      console.log(`something wrong`);
    });
};

const dbindex = async () => {
  await axios
    .get(ORIGIN_URL + '/books/dbindex')
    .then(v => {
      console.log(`indexed`);
    })
    .catch(e => {
      console.log(`wrong indexing`);
    });
};

const createBookData = async () => {
  let savingCount = 0;
  for (list of kindOfBooks) {
    for (idx of pages) {
      const responedListDB = await axios.get(getbookListUrl(list, idx));
      for (book of responedListDB.data.item) {
        let responedBookDB;
        const bookPath = getBookPath(++savingCount);
        if (false === fs.existsSync(bookPath) || !USE_CASHED_DATA) {
          responedBookDB = (await axios.get(getBookDetail(book.isbn13))).data;
          if (!responedBookDB.item) {
            continue;
          }
          storeData(responedBookDB, bookPath);
        } else {
          let rawdata = fs.readFileSync(bookPath);
          responedBookDB = JSON.parse(rawdata);
        }

        const detailBook = {
          ...responedBookDB,
          ...responedBookDB.item[0],
          item: undefined,
        };

        const millyBook = convertFormat(detailBook);

        const { author, authorIntro, introduction, toc } = millyBook;
        if (true === (!author || !authorIntro || !introduction || !toc)) {
          console.log(
            'something is none in here author, authorIntro, introduction, toc'
          );
          continue;
        }

        await postBook(millyBook);
      }
    }
  }
  await dbindex();
  return;
};

if (!API_KEY) {
  console.log('API_KEY 가 필요합니다.');
  return;
}

(async () => {
  await createBookData();
})();
