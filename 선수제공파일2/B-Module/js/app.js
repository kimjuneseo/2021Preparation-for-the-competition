const url = "../무형문화재_현황/nihList.xml";
const elbumList = document.querySelector('.elbum-list');
const listList = document.querySelector('.list_type');

const result = fetch(url)
.then(res => res.text())
.then(data => new DOMParser().parseFromString(data,"text/xml"))
.then(xmlData => {
    return [...xmlData.querySelectorAll("item")].map(({ children }) => {
        return [...children].reduce((item, { tagName, children, textContent }) => {
            item[tagName] = tagName === "sn" ? `00${textContent}`.substr(-3) :
                            tagName === "images" ? [...children].map(({ textContent }) => textContent) :
                            textContent;
            return item;
        }, {})
    });
});

result.then(data => console.log(data))
// result.then(data => {
//     data.forEach(item => {
//         const {totalCnt, sn, no, ccmaName, crltsnoNm, ccbaMnm1, ccbaMnm2, ccbaCtcdNm, ccsiName, ccbaAdmin, ccbaKdcd, ccbaCtcd, ccbaAsno, ccbaCncl, ccbaCpno, longitude, latitude} = item;
//         elbumList.insertAdjacentHTML("beforeend", `<li>
//         <h4>${item["dt"]}</h4>
//         <h6>${item["cn"]}</h6>
//         </li>`)        
//         listList.insertAdjacentHTML("beforeend" ,
//         `<tr>
//         </tr>`)
//     });
// });

