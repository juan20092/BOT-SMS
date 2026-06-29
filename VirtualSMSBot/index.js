import 'dotenv/config'
import { Telegraf, Markup } from 'telegraf'

const bot = new Telegraf(process.env.BOT_TOKEN)

// 🔐 Owner ID (privado)
const OWNER_ID = process.env.OWNER_ID

// 🟢 Inicio del bot
bot.start((ctx) => {
  const name = ctx.from.first_name

  ctx.reply(
    `👋 𝐇𝐨𝐥𝐚, ${name}\n\n` +
    `🤖 𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐨 𝐚𝐥 𝐁𝐨𝐭 𝐕𝐢𝐫𝐭𝐮𝐚𝐥\n` +
    `━━━━━━━━━━━━━━\n` +
    `Usa el menú para continuar`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📋 Menú', 'MENU')],
      [Markup.button.callback('❓ Ayuda', 'HELP')]
    ])
  )
})

// 📋 Menú principal
bot.action('MENU', (ctx) => {
  ctx.editMessageText(
    `📋 𝐌𝐄𝐍𝐔 𝐏𝐑𝐈𝐍𝐂𝐈𝐏𝐀𝐋\n` +
    `━━━━━━━━━━━━━━\n` +
    `📲 /start - Iniciar bot\n` +
    `📋 /menu - Ver menú\n` +
    `❓ /help - Ayuda\n` +
    `💎 Más funciones pronto...`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🔙 Volver', 'BACK')]
    ])
  )
})

// 🔙 Volver
bot.action('BACK', (ctx) => {
  ctx.editMessageText(
    `🏠 Menú principal`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📋 Menú', 'MENU')],
      [Markup.button.callback('❓ Ayuda', 'HELP')]
    ])
  )
})

// ❓ Ayuda
bot.action('HELP', (ctx) => {
  ctx.editMessageText(
    `🆘 𝐀𝐘𝐔𝐃𝐀\n` +
    `━━━━━━━━━━━━━━\n` +
    `Este bot está en desarrollo.\n` +
    `Pronto tendrá sistema de números virtuales.`,
    Markup.inlineKeyboard([
      [Markup.button.callback('🔙 Volver', 'BACK')]
    ])
  )
})

// 👮 Solo owner (ejemplo de comando privado)
bot.command('owner', (ctx) => {
  if (ctx.from.id.toString() !== OWNER_ID) {
    return ctx.reply('⛔ No tienes permiso.')
  }

  ctx.reply('🔐 Acceso de administrador confirmado.')
})

// ❌ Manejo de errores
bot.catch((err, ctx) => {
  console.log('❌ Error:', err)
  ctx.reply('⚠️ Error interno del bot')
})

// 🚀 Iniciar bot
bot.launch()
console.log('🤖 Bot profesional iniciado correctamente')

// 🧹 Cierre limpio
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))