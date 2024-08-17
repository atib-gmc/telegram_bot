const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = "7362098416:AAHZJXzT4YRur0t_j_Vv2rm_ckvUP_dVC1c";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
let userStates = {};
bot.on("message", (msg) => {
  const randomQuotes = {
    hidup: [
      "Hidup adalah apa yang terjadi ketika kamu sedang sibuk membuat rencana lain. - John Lennon",
      "Kehidupan itu seperti mengendarai sepeda. Untuk menjaga keseimbanganmu, kamu harus terus bergerak. - Albert Einstein",
      "Jangan hitung hari-hari, buatlah hari-hari itu berarti. - Muhammad Ali",
      "Hidup itu seperti cermin, kamu akan mendapatkan hasil sesuai dengan apa yang kamu lakukan. - Anonymous",
      "Jadilah dirimu sendiri; orang lain sudah diambil. - Oscar Wilde",
    ],
    romantis: [
      "Cinta itu bukan sesuatu yang kita temukan, tetapi sesuatu yang menemukan kita. - Loretta Young",
      "Cinta adalah kondisi di mana kebahagiaan orang lain sangat penting bagi kebahagiaanmu. - Robert Heinlein",
      "Aku mencintaimu bukan karena siapa kamu, tetapi karena siapa aku ketika aku bersamamu. - Roy Croft",
      "Setiap cinta yang sejati adalah cerita yang tidak pernah berakhir. - Anonymous",
      "Mencintai dan dicintai adalah merasakan matahari dari kedua sisi. - David Viscott",
    ],
    motivasi: [
      "Sukses adalah perjalanan, bukan tujuan akhir. Usaha adalah kemenangan. - Zig Ziglar",
      "Keberanian adalah melawan ketakutanmu dan mengalahkannya. - Mark Twain",
      "Tidak ada rahasia untuk sukses. Ini adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan. - Colin Powell",
      "Setiap langkah kecil yang kamu ambil, membawa kamu lebih dekat ke tujuanmu. - Anonymous",
      "Kesuksesan adalah kemampuan untuk pergi dari satu kegagalan ke kegagalan lain tanpa kehilangan antusiasme. - Winston Churchill",
    ],
    persahabatan: [
      "Persahabatan sejati datang ketika keheningan antara dua orang terasa nyaman. - David Tyson",
      "Seorang teman adalah seseorang yang mengetahui semua tentangmu dan tetap mencintaimu. - Elbert Hubbard",
      "Persahabatan bukan tentang siapa yang kamu kenal paling lama, tetapi siapa yang datang dan tidak pernah pergi. - Anonymous",
      "Teman sejati adalah orang yang masuk ketika seluruh dunia keluar. - Walter Winchell",
      "Persahabatan adalah hal tersulit di dunia untuk dijelaskan. Itu bukan sesuatu yang kamu pelajari di sekolah. - Muhammad Ali",
    ],
  };
  const chatId = msg.chat.id;
  if (msg.text === "/close") {
    delete userStates[chatId];
    bot.sendMessage(
      chatId,
      "terimakasih sudah menggunakan bot saya sampai jumpa",
    );
    return;
  }
  if (msg.text === "/start") {
    bot.sendMessage(
      chatId,
      "welcome to quotes bot silahkan pilih opsi quotes yang and inginkan, /hidup, /romantis, /motivasi, /persahabatan",
    );
    userStates[chatId] = "start";
    return;
  } else if (userStates[chatId] === "start") {
    console.log("fire");
    const resp = msg.text.substring(1);
    bot.sendMessage(
      chatId,
      randomQuotes[resp][Math.floor(Math.random() * randomQuotes[resp].length)],
    );
  }
  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, "Received your message");
});
