
$.get("./xml/nihList.xml", function (data) {
    let page = 0;
    let itemCount = 8;
    //데이터에서 totalCut를 뽑아냄
    const totalCount = $(data).find("totalCnt").text();
    //데이터에서 item 안에서 map을 돌린다 
    const items = [...$(data).find("item")].map((value) => {
        //item에 자식요소들 중 tagName과 textContent
        return [...value.children].reduce((acc, { tagName, textContent }) => {
            acc[tagName] = textContent;
            return acc;
        }, {});
    }).map(async ({ sn, ccbaMnm1, ccbaKdcd, ccbaCtcd, ccbaAsno }) => {
        const path = `./xml/detail/${ccbaKdcd}_${ccbaCtcd}_${ccbaAsno}.xml`;
        const xmlDOM = await $.get(path);
        const image = $(xmlDOM).find("imageUrl").text();
        return {
            sn, ccbaMnm1, image
        }
    });

    items.forEach(async (value) => {
        await value.then(({ sn, ccbaMnm1, image }) => {
            $(".albums").append(`<div class="album">
				<div class="img-box">
					<img src="./images/nihcImage/${image}" alt="No Error" onError="this.src='./images/noImage.png'">
				</div>
				<div class="text-wrap">
					<p>${ccbaMnm1}</p>
				</div>
			</div>`);
        });
        render();
    });

    $(document)
        .on("click", '.nations .btn-list button', function () {
            page = Number($(this).text()) - 1;
            render();
        }).on("click", ".arrow", function () {
            const next = $(this).is(".next");
            const MaxLength = Math.ceil(items.length / itemCount);
            console.log(page, MaxLength)
            if (next) {
                page = page + 1 > MaxLength - 1 ? MaxLength - 1 : page + 1;
            } else {
                page = page - 1 > -1 ? page - 1 : 0;
            }
            render();
        })
    function nation() {
        const MaxLength = Math.ceil(items.length / itemCount);
        $(".nations .btn-list").empty();
        for (let i = 1; i <= MaxLength; i++) {
            $(".nations .btn-list").append(`<button class="${page == i - 1 ? "active" : ""}">${i}</button>`)
        }
    }
    function render() {
        nation();
        const MaxLength = Math.ceil(items.length / itemCount);
        $(".category")
            .find(".totalCount").text(totalCount).end()
            .find(".currentPage").text(page + 1).end()
            .find(".maxPage").text(MaxLength);

        $(".albums").children().hide();
        const nationLen = page == 0 ? 1 : page + 1;
        for (let i = page * itemCount; i < nationLen * itemCount; i++) {
            $(".albums").children().eq(i).show();
        }
    }
})





// $.get("./xml/nihList.xml",function(data){
// 	console.log(data)
// 	let page = 0;
// 	let itemCount = 8;
// 	//앨범 갯수
// 	const totalCount = $(data).find("totalCnt").text();
// 	//data에서 item을 찾아서 retuen 값으로 acc = item에 textContent
// 	const items = [...$(data).find("item")].map( (value) =>{
// 		return[...value.children].reduce((acc,{tagName,textContent}) =>{
// 			//테그네임빼고 text만 가져옴
// 			// acc[키값] = 내용
// 			// acc = {
// 			// 	tagName: textContent
// 			// }
// 			acc[tagName] = textContent;
// 			return acc;
// 		},{})
// 		//*프로미스 객체로 반환* 번호,축제이름,xml주소 앞자리,xml주소   가운데자리,뒷자리 숫자와 축제이름 이미지 주소를 리턴  
// 	}).map(async ({sn,ccbaMnm1,ccbaKdcd,ccbaCtcd,ccbaAsno}) =>{
// 		//xml주소
// 		const path = `./xml/detail/${ccbaKdcd}_${ccbaCtcd}_${ccbaAsno}.xml`
// 		//위에서 만든 xml주소로 가서 xml파일을 가져옴 프로미가 처리될때 까지 기다림
// 		const xmlDOM = await $.get(path);
// 		///xml파일에 imageUrl태그에 들어있는 text
// 		const image = $(xmlDOM).find("imageUrl").text();
// 		return{
// 			sn,ccbaMnm1,image
// 		}
// 	})
// 	// console.log(items)
// 	items.forEach( async (value) =>{
// 		await value.then(( {sn,ccbaMnm1,image}) =>{
// 			// console.log(value)
// 			//위에 div 이미지 넣기 밑에꺼 축제 이름 넣어주기
// 			$('.albums').append(
// 			`<div class="album">
// 				<div class="img-box">
// 					<img src="./images/nihcImage/${image}" alt="No Error" onError="this.src='./images/noImage.png'">
// 				</div>
// 				<div class=:text-wrap>
// 					<p>${ccbaMnm1}</p>
// 				</div>
// 			</div>`);
// 		});
// 		render();
// 	});
// 	$(document)
// 	//페이지 번호 버튼 클릭시
// 	.on('click','.nations .btn-list button',function(){
// 		//클릭한 번호를 page에 넣어준다 (1클릭시 page는 0)
// 		page = Number($(this).text())-1;
// 		// console.log(page)
// 		render();
// 		//다음으로 가는 버튼 클릭시 
// 	}).on("click",".arrow",function(){
// 		//클릭한게 next버튼 일시 next에 true *is 메서드는 두 값이 같은 값인지 비교하는 메소드
// 		const next = $(this).is(".next");
// 		//items.lenght = 154 itemCount = 8 나누기 하면 19.25 =20 *ceil올림 하는 메소드
// 		const MaxLength = Math.ceil(items.length/itemCount);
// 		//next가 클릭된게 맞으면
// 		if( next ){
// 			console.log(page+1 > MaxLength-1)
// 			//next눌렀을때 다음 페이지로 넘어갈 수 있는 지 검사
// 			page = page+1 > MaxLength-1 ? MaxLength-1 : page+1;
// 			//prev 일시
// 		}else{
// 			//페이지가 -1일때 -1이 아니면 page-1 
// 			page = page == 0? 0 : page-1;
// 		}
// 		render();
// 	})
// 	function nation(){
// 		//154/8 올림 20
// 		const MaxLength = Math.ceil(items.length/itemCount);
// 		//버튼들을 지움
// 		$(".nations .btn-list").empty();
// 		for(let i=1; i<=MaxLength; i++){
// 			$(".nations .btn-list").append(`<button class="${ page == i-1 ? "active" : "" }">${i}</button>`)
// 		}
// 	}
// 	function render(){
// 		nation();
// 		const MaxLength = Math.ceil(items.length/itemCount);
// 		$(".category")
// 		.find(".totalCount").text(totalCount).end()
// 		.find(".currentPage").text(page+1).end()
// 		.find(".maxPage").text(MaxLength);

// 		// console.log($('.albums').children)
// 		$(".albums").children().hide();
// 		const nationLen = page == 0 ? 1 : page+1;
// 		for(let i=page*itemCount; i<nationLen*itemCount; i++){
// 			$(".albums").children().eq(i).show();
// 		}
// 	}
// })



// $.get("./xml/nihList.xml",function(data){
// 	let page = 0;
// 	let itemCount = 8;
// 	const totalCount = $(data).find("totalCnt").text();
// 	const items = [...$(data).find("item")].map( (value) => {
// 		return [...value.children].reduce( (acc,{tagName,textContent}) => {
// 			acc[tagName] = textContent;
// 			return acc;
// 		},{});
// 	}).map( async ({sn,ccbaMnm1,ccbaKdcd,ccbaCtcd,ccbaAsno}) => {
// 		const path = `./xml/detail/${ccbaKdcd}_${ccbaCtcd}_${ccbaAsno}.xml`;
// 		const xmlDOM = await $.get(path);
// 		const image = $(xmlDOM).find("imageUrl").text();
// 		return {
// 			sn, ccbaMnm1, image
// 		}
// 	});

// 	items.forEach( async (value) => {
// 		await value.then( ({sn,ccbaMnm1,image}) => {
// 			$(".albums").append(`<div class="album">
// 				<div class="img-box">
// 					<img src="./images/nihcImage/${image}" alt="No Error" onError="this.src='./images/noImage.png'">
// 				</div>
// 				<div class="text-wrap">
// 					<p>${ccbaMnm1}</p>
// 				</div>
// 			</div>`);
// 		} );
// 		render();
// 	} );
// }

$.get("./xml/nihList.xml", function (data) {
    let page = 0;
    let itemCount = 8;
    const totalCount = $(data).find("totalCnt").text();
    //객체로 만들기
    const items = [...$(data).find("item")].map((value) => {
        return [...value.children].reduce((acc, { tagName, textContent }) => {
            acc[tagName] = textContent;
            console.log(acc)
            return acc;
        }, {})
    }).map(async ({ sn, ccbaMnm1, ccbaKdcd, ccbarn, ccbaAsno }) => {
        const path = `./xml/detail${ccbaKdcd}_${cc}`
        const xmlDOM = await $.get(path);
        const image = $(xmlDOM).find("imgaeUrl").text()
        return {
            image, ccbaMnm1
        }
    })
    items.forEach(async (value) => {
        await value.then(({ image, ccbaMnm1 }) => {
            $("albums").append(`<div>
            <div class="img-box>
                <img src="${image}" alt="no Error" onError="this.src="noimage.png>
            </div>
            <div class="text-wrap">
                <p>${ccbaMnm1}</p>
            </div>
            </div>`)
        })
    })
    $(document)
        .on('click', 'category', functio(){

        })
})