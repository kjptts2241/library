// [국립 중앙 도서관] 도서 검색
// 도서 검색 결과를 가져오기 위한 함수
function search() {


    // view에 붙여줄 도서 데이터 저장 변수
    var bookList = '';

    // 도서 배열 변수
    var booksInt = []; // 불러온 도서의 수
    var titleInfo = []; // 책 제목
    var typeName = []; // 도서 자료 유형
    var placeInfo = []; // 자료 있는 곳 명칭
    var manageName = []; // 자료 있는 곳 명
    var authorInfo = []; // 저작자
    var pubInfo = []; // 발행자
    var menuName = []; // 온라인/오프라인 자료 구분
    var mediaName = []; // 매체 구분
    var id = []; // 종키(?)
    var licText = []; // 저작권 이용 가능 유무
    var regDate = []; // 비치일
    var isbn = []; // isbn 13의 끝자리의 값을 들고 온다.(최신 번호 유지가능)
    var callNo = []; // 청구기호
    var kdcCode1s = []; // 동양서분류기호 대분류 코드
    var kdcName1s = []; // 동양서분류기호 대분류 명칭
    var imageUrl = []; // 이미지 파일

    var keyword = $("#keyword").val(); // 사용자가 검색한 문자
    console.log("검색한 입력 키워드 : " + keyword);

    

    // 국립중앙도서관 검색 함수 실행
    $.ajax({
        type: "get",
        url: "/api/v1/search",
        data: { keyword: keyword },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        
        success: function (data) {
            console.log("국립중앙 도서관 도서 데이터 받기 성공");
            // 국립중앙 도서관의 var 태그 와 전혀 다른 데이터 태그들이 추출됨 도서 정보 나루의 도서 상세 조회로 출력

            var result = data.result; // 함수의 전체 데이터인 jsons에서 도서의 정보가 있는 result에 들어간 정보를 result 변수에 저장

            for (i in result) // 5개의 도서 데이터를 가지고 있는 result를 하나씩 가져오게 for문으로 실행시키기
            {

                var isbnNum = result[i].isbn.split(' '); // isbn이 여러개거나 이상한 문자 포함일때 잘라주기

                booksInt.push(i); // 불러온 도서의 수
                titleInfo.push(result[i].titleInfo); // 도서명 titleInfo를  ( result[i]에 넣음 [i] 리스트 가져오는 값에 달라짐 push는 넣기 )
                typeName.push(result[i].typeName); // 도서 자료 유형
                placeInfo.push(result[i].placeInfo); // 자료 있는 곳 명칭
                manageName.push(result[i].manageName); // 자료 있는 곳 명
                authorInfo.push(result[i].authorInfo); // 저작자
                pubInfo.push(result[i].pubInfo); // 발행자
                menuName.push(result[i].menuName); // 온라인/오프라인 자료 구분
                mediaName.push(result[i].mediaName); // 매체 구분
                id.push(result[i].id); // 종키(?)
                licText.push(result[i].licText); // 저작권 이용 가능 유무
                regDate.push(result[i].regDate); // 비치일 
                isbn.push(isbnNum[isbnNum.length - 1]); // isbn 13의 끝자리의 값을 들고 온다.(최신 번호 유지가능)
                callNo.push(result[i].callNo); // 청구기호
                kdcCode1s.push(result[i].kdcCode1s); // 동양서분류기호 대분류 코드
                kdcName1s.push(result[i].kdcName1s); // 동양서분류기호 대분류 명칭
                if (result[i].isbn == '') // isbn안에 아무것도 없다면
                {
                    imageUrl.push('<div> 이미지 파일 : 임의의 이미지 파일</div><br>'); // 임의의 이미지를 넣어준다
                }
                if (result[i].isbn != '') // isbn안에 값이 있다면
                {
                    imageUrl.push(searchDetails(isbnNum[isbnNum.length - 1])); // searchDetails()함수를 실행시켜서 ()안에 isbn을 넣어서 실행시킨 다음 return 값을 imageUrl 변수에 저장
                }
            }
        },

        error: function () {
            console.log("검색 결과 받기 실패");
        }
    })

    // html에 분류하여 저장 및 subsearch에 업로드
    for (var i = 0; i < booksInt.length; i++)
    {
        bookList += '========================================================';
        bookList += '<div>';
        bookList += `<div>${booksInt[i]} 째 도서</div>`;
        bookList += `<div> 도서명 : ${titleInfo[i]}</div>`;
        bookList += `<div> 도서 자료 유형 : ${typeName[i]}</div>`;
        bookList += `<div> 자료 있는 곳 명칭 : ${placeInfo[i]}</div>`;
        bookList += `<div> 자료 있는 곳 명 : ${manageName[i]}'</div>`;
        bookList += `<div> 저작자 : ${authorInfo[i]}</div>`;
        bookList += `<div> 발행자 : ${pubInfo[i]}</div>`;
        bookList += `<div> 온라인/오프라인 자료 구분 : ${menuName[i]}</div>`;
        bookList += `<div> 매체 구분 : ${mediaName[i]}</div>`;
        bookList += `<div> 종키(?) : ${id[i]}</div>`;
        bookList += `<div> 저작권 이용 유무 : ${licText[i]}</div>`;
        bookList += `<div> 비치일 : ${regDate[i]}</div>`;
        bookList += `<div id="isbn"> isbn : ${isbn[i]}</div>`;
        bookList += `<div> 청구기호 : ${callNo[i]}</div>`;
        bookList += `<div> 동양서분류기호 대분류 코드 :${kdcCode1s[i]}</div>`;
        bookList += `<div> 동양서분류기호 대분류 명칭 : ${kdcName1s[i]}</div>`; 
        bookList += `<div> 이미지 URL : ${imageUrl[i]}</div>`;
        bookList += `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#popup_box" onclick="library(${isbn[i]})">도서관 검색</button>`;
        bookList += '</div>'; 
        bookList += '========================================================';
        bookList += '<br><br><br>';
    }

    $('#search_body').html(bookList); // 도서 데이터들을 웹페이지에 넣어주기
    
}


// [도서 정보 나루] 도서 상세 조회
// 도서 이미지를 가져오기 위한 함수
function searchDetails(isbn) {
    
    // var detailList = '';
    var ex_imageUrl = '';

    $.ajax({
        type: "get",
        url: "/api/v1/searchDetails",
        data: { isbn: isbn }, // 파라미터로 가져온 isbn을 넣어서 실행
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        
        success: function (data) {

            for (y in data)
            {
                var detail = data[y].detail; // 도서 상세 정보인 json 에서 도서 상세 데이터를 가지고 있는 detail로 들어간 정보를 bookData에 저장


                for (z in detail) { // z
                    
                    if (detail[z].book.bookImageURL != ' ') // 가져온 이미지 url이 있다면
                    {
                        ex_imageUrl = detail[z].book.bookImageURL;
                        return;
                    }

                    if (detail[z].book.bookImageURL == '') // 없다면
                    {
                        ex_imageUrl = '<div> 이미지 파일 : 임의의 이미지 파일</div><br>';
                        return;
                    }
                }
            }
        },
        
        error: function () {
            console.log("도서 이미지 받기 실패");
        }
    })

    return ex_imageUrl;
    
}   

// 도서관 데이터 들고 오기
// 해당 도서(isbn)를 가지고 있는 도서관 데이터들을 가져오기 위한 함수
// 지역 코드 : region=00:11;21;22 서울 부산 대구 순으로 정렬됨
function library(isbn) {

    // view에 붙여줄 도서관 데이터 변수
    var libraryList = '';

    $.ajax({

        type: "get",
        url: "/api/v1/bookCollection",
        data: { isbn: isbn, region: 21 },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        
        success: function (data) {

            var libs = data.response.libs; // 가져온 json에서 도서관 배열만 꺼내기

            for (i in libs)
            {
                libraryList += '========================================================';
                libraryList += '<div>';
                libraryList += '<div>' + i + ' 째 도서관</div>'; // 불러온 도서관 수
                libraryList += '<div> 도서관명 : ' + libs[i].lib.libName + '</div>'; // 도서관명
                libraryList += '<div> 도서관 주소 : ' + libs[i].lib.address + '</div>'; // 도서관 주소
                libraryList += '<div> 전화번호 : ' + libs[i].lib.tel + '</div>'; // 전화번호
                libraryList += '<div> 팩스 : ' + libs[i].lib.fax + '</div>'; // 팩스
                libraryList += '<div> 운영 시간 : ' + libs[i].lib.operatingTime + '</div>'; // 운영 시간
                libraryList += '<div> 닫는 시간 : ' + libs[i].lib.closed + '</div>'; // 닫는 시간
                libraryList += '<div> 홈페이지 : ' + libs[i].lib.homepage + '</div>'; // 홈페이지
                libraryList += '<div> 위도 : ' + libs[i].lib.latitude + '</div>'; // 위도
                libraryList += '<div> 경도 : ' + libs[i].lib.longitude + '</div>'; // 경도
                libraryList += '<div> 도서관 코드 : ' + libs[i].lib.libCode + '</div>'; // 도서관 코드
                libraryList += '</div>';
                libraryList += '========================================================';
                libraryList += '<br><br><br>';
            }
            
            //$('#library_header').html(data); // 팝업 헤더에 요약한 해당 도서의 데이터 넣어주기
            $('#library_body').html(libraryList); // 팝업 바디에 도서관 데이터 넣어주기


        },

        error: function () {
            console.log("도서관 데이터 받기 실패");
        }
    })

}


function libraryHeader(titleInfo) {
    
    console.log(titleInfo);
}