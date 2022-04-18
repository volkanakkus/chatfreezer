import { readFileSync } from 'fs';

export default defineEventHandler((event) => {
  const file = readFileSync('./public/source/_chat.txt', 'utf-8');

  const chat = [];

  let lines = file.toString().split('\n');
  for (var line = 80000; line < file.length; line++) {
    const item = lines[line];

    if (item) {
      if (!item.startsWith('[') && !item.startsWith('‎')) {
        chat[chat.length - 1].message = chat[chat.length - 1].message.concat(
          ` ${item}`
        );
      } else {
        if (item.includes('attached')) {
          const attachments = {
            type: item.split('<attached:')[1].slice(0, -2).split('-')[1],
            src: item.split('<attached: ')[1].slice(0, -2),
          };

          chat.push({
            message: false,
            date:
              item.split(' ')[0].replace('[', '').replace('‎', '') +
              ' ' +
              item.split(' ')[1].replace(']', ''),
            sender: item.split(': ')[0].split('] ')[1],
            attachments,
          });
        } else {
          chat.push({
            message: item.split(': ')[1].replace('\r', ''),
            date:
              item.split(' ')[0].replace('[', '') +
              ' ' +
              item.split(' ')[1].replace(']', ''),
            sender: item.split(': ')[0].split('] ')[1],
            attachments: false,
          });
        }
      }
    }
  }

  return chat;
});
