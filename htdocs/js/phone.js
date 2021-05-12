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

dd