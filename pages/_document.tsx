import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>

        {/* <script>
            var oPay = Naver.Pay.create({
                  "mode" : "production", // development or production
                  "clientId": "u86j4ripEt8LRfPGzQ8" // clientId
            });

            //직접 만드신 네이버페이 결제버튼에 click Event를 할당하세요
            var elNaverPayBtn = document.getElementById("naverPayBtn");

            elNaverPayBtn.addEventListener("click", function() {
                oPay.open({
                  "merchantUserKey": "가맹점 사용자 식별키",
                  "merchantPayKey": "가맹점 주문 번호",
                  "productName": "상품명을 입력하세요",
                  "totalPayAmount": "1000",
                  "taxScopeAmount": "1000",
                  "taxExScopeAmount": "0",
                  "returnUrl": "사용자 결제 완료 후 결제 결과를 받을 URL"
                });
            });

        </script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
