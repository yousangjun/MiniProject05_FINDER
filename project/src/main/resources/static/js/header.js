$(document).ready(function () {

    let accessOrder = $('#accessOrder').val();

    console.log("accessOrder: " + accessOrder); // 디버깅용 콘솔 로그

    $('#paymentLink').click(function (event) {
        if (accessOrder == '1') { // accessOrder가 문자열 형태일 수 있으므로 '1'로 비교
            event.preventDefault();
            alert("잔여 주문내역이 있습니다.\n미결제 내역은 결제 페이지에서 확인하세요.");
        } else {
            window.location.href = $(this).attr('th:href');
        }
    });


    // 각 링크에 대한 이벤트 리스너 추가
    $('.token-end').on('click', function (event) {
        event.preventDefault(); // 링크의 기본 동작 방지

        // href 속성을 가져옴
        const href = $(this).attr('href');

        // currentDate와 remainQuantity를 가져옴
        const currentDateValue = $('#currentDate').val();
        console.log(currentDateValue);
        const expirationDateValue = $('#expirationDate').val();
        console.log(expirationDateValue);
        const remainQuantityValue = parseInt($('#remainQuantity').val());
        const userNo = $('#userNo').val();

        // currentDate가 과거이고 remainQuantity가 0 이상인 경우
        if (currentDateValue < expirationDateValue && remainQuantityValue > 0) {
            window.location.href = href;
        } else {
            confirm("권한이 만료되었습니다. 결제 페이지로 이동할까요 ?");

            if (confirm) {
                window.location.replace('/company/credit/credit_com?userNo=' + userNo);
            }
        }
    });

});
