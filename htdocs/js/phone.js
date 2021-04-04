$.getJSON("/restAPI/phone.php", function ({ statusCd, statusMsg, totalCount, items }) {
	if (statusCd != 200) {
		alert(statusMsg);
		return location.href = "/index.html";
	}
	const itemFilter = items.reduce((acc, { deptNm, name, sn, telNo }) => {
		acc[deptNm] = [...acc[deptNm] || [], { name, sn, telNo }];
		return acc;
	}, {});
	Object.keys(itemFilter).forEach(key => {
		$(".categoryList").append(`<div>${key}</div>`)
		$(".category-container").append(`<li data-name="${key}"> <h3>${key}</h3> <ul> ${itemFilter[key].map(({ name, telNo }) => `<li> <p>${name}</p>  <p>${telNo}</p></li>`).join("")} </ul> </li> `)
	})
	$(document).on("click", ".categoryList>div", function () {
		$(this).addClass("active").siblings().removeClass("active");
		$(this).text() == "전체" ? $(`.category-container>li`).show() : $(`.category-container>li[data-name="${$(this).text()}"]`).show().siblings().hide();
	});
});


// const url = "";
// //url에 요청을 보내고 프로미스로 반환
// const result = fetch(url)
// 	//온 프로미스 객체를 text로 변환
// 	.then(res => res.text())
// 	//xml을 자바스크립트 돔 객체로 변환
// 	.then(data => new DOMParser().parseFromString(data, 'text/xml'))
// 	//변환된 파일에 item을 들고와서 그 자식요소에 
// 	.then(xmlData => {
// 		return [...xmlData.querySelectorAll('item')].map(({ children }) => {
// 			//item에 자식요소에
// 			return [...children].reduce((item, { tagName, children, textContent }) => {
// 				item[tagName] = tagName === "sn" ? `00${textContent}`.substr(-3) :
// 					tagName === "imges" ? [...children].map(({ textContent }) => textContent) :
// 						textContent
// 			}, {})
// 		})

// 	})


// const result = fetch(url)
// 	.then(res => res.text())
// 	.then(data => new DOMParser().parseFromString(data, 'text/xml'))
// 	.tnen(xmlData => {
// 		return [...xmlData.querySelectorAll('item')].map(({ children }) => {
// 			return [...children].reduce((item, { tagName, children, textContent }) => {
// 				item[tagName] = [...children].map(({ textContent }) => textContent)
// 				textContent

// 				return item
// 			}, {})
// 		})
// 	})
