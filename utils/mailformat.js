const nodemailer = require('nodemailer');

const ForgotPassword = async email => {
  let transporter = nodemailer.createTransport({
    // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
    service: 'gmail',
    // host를 gmail로 설정
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      // Gmail 주소 입력, 'testmail@gmail.com'
      user: process.env.NODEMAILER_USER,
      // Gmail 패스워드 입력
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let authenNum = Math.floor(Math.random() * 1000000) + 100000;
  if (authenNum > 1000000) {
    authenNum = authenNum - 100000;
  }

  await transporter.sendMail({
    from: `"millie.service Team" <${process.env.NODEMAILER_USER}>`,
    to: `${email}`,
    subject: '안녕하세요 밀리는 서재 비밀번호 찾기 서비스입니다.',
    html: `
    <p style="text-align: center;"><span style="font-size: 36px;"><strong>밀리는 서재</strong></span></p>
    <hr />
    <blockquote>
    <p style="text-align: center;">Welcome to millie's library</p>
    </blockquote>
    <p style="text-align: left;"><span style="font-size: 20px;"><span style="font-family: -apple-system, BlinkMacSystemFont, Malgun Gothic, 맑은 고딕, helvetica, Apple SD Gothic Neo, helvetica, 나눔바른고딕 옛한글, NanumBarunGothic YetHangul, sans-serif;"><span style="font-size: 13px;">서재하면 밀리지🤪</span></span></span></p>
    <p style="text-align: left;"><span style="font-size: 20px;">인증코드란에 아래 코드를 넣어주세요</span></p>
    <p><span style="font-size: 36px; background-color: #d1d5d8;">${authenNum}</span></p>
    <hr />
    <p><span style="font-size: 10px;">본 메일은 발신전용이며, 문의에 대한 회신은 처리되지 않습니다. 추가로 밀리는 서재 서비스에 궁금하신 점이나 불편한 사항은 위 링크를 들어가 연락주시면 도움드리겠습니다.</span></p>
    `,
  });

  return authenNum;
};

module.exports = { ForgotPassword };
