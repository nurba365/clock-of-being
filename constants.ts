
import { Scene } from './types';

export const INITIAL_STATS = {
  matter: 40,
  relations: 40,
  meaning: 40,
  happiness: 40,
  energy: 40,
};

export const SCENES: Scene[] = [
  // --- ФАЗА 1: УТРО ---
  {
    hour: 8,
    title: "Импульс утра",
    description: "Ты просыпаешься с ощущением: сегодня можно всё, что обычно откладываешь. С чего начнёшь?",
    backgroundKeyword: "morning soft light",
    tone: "soft",
    choices: [
      { id: "1_a", text: "Медленно позавтракать, сходить в душ без спешки, выйти на свежий воздух", category: "physiology", effect: { energy: 1 } },
      { id: "1_b", text: "Навести порядок в вещах и голове, закрыть мелкие, но висящие дела", category: "safety", effect: { matter: 1 } },
      { id: "1_c", text: "Позвать маму или близкого на чай и просто поболтать", category: "belonging", effect: { relations: 1 } },
      { id: "1_d", text: "Написать пост или сторис о том, что давно хотел(а) сказать", category: "esteem", effect: { meaning: 1 } },
      { id: "1_e", text: "Посидеть в тишине и подумать, чего я на самом деле хочу", category: "actualization", effect: { meaning: 1 } }
    ]
  },
  {
    hour: 10,
    title: "Решимость",
    description: "Есть одна вещь, которую ты давно хотел(а) сделать, но не решался(ась). Сегодня ты...",
    backgroundKeyword: "focused morning",
    tone: "focused",
    choices: [
      { id: "2_a", text: "Идёшь туда, где тебе всегда было просто хорошо", category: "physiology", effect: { happiness: 1 } },
      { id: "2_b", text: "Наконец решаешь вопрос, который давно тревожил", category: "safety", effect: { matter: 1 } },
      { id: "2_c", text: "Звонишь человеку, с которым давно не говорил(а)", category: "belonging", effect: { relations: 1 } },
      { id: "2_d", text: "Пишешь честное сообщение или текст без фильтров", category: "esteem", effect: { meaning: 1 } },
      { id: "2_e", text: "Записываю мысли в заметки, не планируя никому показывать", category: "actualization", effect: { meaning: 1 } }
    ]
  },
  {
    hour: 12,
    title: "Предчувствие полудня",
    description: "Как ты хочешь чувствовать себя к полудню?",
    backgroundKeyword: "bright noon",
    tone: "energetic",
    choices: [
      { id: "3_a", text: "Сытым(ой), отдохнувшим(ей), спокойным(ой)", category: "physiology", effect: { energy: 1 } },
      { id: "3_b", text: "С ощущением, что ничего не упущено", category: "safety", effect: { matter: 1 } },
      { id: "3_c", text: "С чувством, что я не один(одна)", category: "belonging", effect: { relations: 1 } },
      { id: "3_d", text: "Уверенность, что ты был(а) собой", category: "esteem", effect: { meaning: 1 } },
      { id: "3_e", text: "С ощущением внутренней ясности", category: "actualization", effect: { meaning: 1 } }
    ]
  },
  // --- ФАЗА 2: ДЕНЬ ---
  {
    hour: 14,
    title: "Свободные часы",
    description: "У тебя есть несколько свободных часов без обязательств. Ты выбираешь...",
    backgroundKeyword: "afternoon sun",
    tone: "neutral",
    choices: [
      { id: "4_a", text: "Прогулку, еду, маленькие радости", category: "physiology", effect: { happiness: 1 } },
      { id: "4_b", text: "Разобраться с документами / деньгами / делами", category: "safety", effect: { matter: 1 } },
      { id: "4_c", text: "Встретиться с тем, с кем можно говорить обо всём", category: "belonging", effect: { relations: 1 } },
      { id: "4_d", text: "Написать пост в Threads о том, что ты на самом деле думаешь", category: "esteem", effect: { meaning: 1 } },
      { id: "4_e", text: "Побыть одному(одной), отключив уведомления", category: "actualization", effect: { meaning: 1 } }
    ]
  },
  {
    hour: 16,
    title: "Сообщение",
    description: "Ты решаешь кому-то написать. Какое сообщение это будет?",
    backgroundKeyword: "typing focused",
    tone: "intense",
    choices: [
      { id: "5_a", text: "«Как ты? Я просто хотел(а) узнать»", category: "belonging", effect: { relations: 1 } },
      { id: "5_b", text: "«Нужно обсудить один важный момент»", category: "safety", effect: { matter: 1 } },
      { id: "5_c", text: "«Мне важно тебе кое-что сказать»", category: "belonging", effect: { relations: 1 } },
      { id: "5_d", text: "«Я хочу, чтобы ты знал(а), кем ты для меня был(а)»", category: "esteem", effect: { meaning: 1 } },
      { id: "5_e", text: "Письмо без адресата — просто чтобы отпустить", category: "actualization", effect: { meaning: 1 } }
    ]
  },
  {
    hour: 18,
    title: "Разговор",
    description: "В разговоре с близким человеком ты скорее...",
    backgroundKeyword: "evening cafe",
    tone: "warm",
    choices: [
      { id: "6_a", text: "Смеёшься и говоришь о простых вещах", category: "belonging", effect: { relations: 1 } },
      { id: "6_b", text: "Объясняешь всё спокойно и по делу", category: "safety", effect: { matter: 1 } },
      { id: "6_c", text: "Делишься личным, даже тем, о чём обычно молчишь", category: "belonging", effect: { relations: 1 } },
      { id: "6_d", text: "Скажешь то, что давно держал(а) в себе", category: "esteem", effect: { meaning: 1 } },
      { id: "6_e", text: "Слушаешь больше, чем говоришь", category: "actualization", effect: { meaning: 1 } }
    ]
  },
  // --- ФАЗА 3: ВЕЧЕР ---
  {
    hour: 20,
    title: "Последнее действие",
    description: "Вечером у тебя остаётся одно действие. Ты выбираешь...",
    backgroundKeyword: "twilight evening",
    tone: "peaceful",
    choices: [
      { id: "7_a", text: "Уютно поесть, завернуться в плед, включить любимую музыку", category: "physiology", effect: { energy: 1 } },
      { id: "7_b", text: "Проверить, что всё завершено и ничего не осталось «на потом»", category: "safety", effect: { matter: 1 } },
      { id: "7_c", text: "Провести вечер рядом с тем, кто дорог", category: "belonging", effect: { relations: 1 } },
      { id: "7_d", text: "Написать прощальное письмо или текст", category: "esteem", effect: { meaning: 1 } },
      { id: "7_e", text: "Выйти на улицу и просто побыть в тишине", category: "actualization", effect: { meaning: 1 } }
    ]
  },
  {
    hour: 22,
    title: "Память",
    description: "Если представить, что о тебе будут помнить, тебе важнее, чтобы...",
    backgroundKeyword: "starry night",
    tone: "mysterious",
    choices: [
      { id: "8_a", text: "Никто не беспокоился и не страдал", category: "physiology", effect: { happiness: 1 } },
      { id: "8_b", text: "Всё было понятно и спокойно", category: "safety", effect: { matter: 1 } },
      { id: "8_c", text: "Тебя вспоминали с теплом", category: "belonging", effect: { relations: 1 } },
      { id: "8_d", text: "О тебе говорили и помнили", category: "esteem", effect: { meaning: 1 } },
      { id: "8_e", text: "Ты сам(а) был(а) в мире с собой", category: "actualization", effect: { meaning: 1 } }
    ]
  },
  {
    hour: 24,
    title: "Завершение",
    description: "Как ты хочешь закончить этот день?",
    backgroundKeyword: "midnight void",
    tone: "transcendent",
    choices: [
      { id: "9_a", text: "Уют и отдых", category: "physiology", effect: { energy: 1 } },
      { id: "9_b", text: "С ощущением, что ничего не осталось «на потом»", category: "safety", effect: { matter: 1 } },
      { id: "9_c", text: "Объятия", category: "belonging", effect: { relations: 1 } },
      { id: "9_d", text: "Оставить след — текст, сообщение, поступок", category: "esteem", effect: { meaning: 1 } },
      { id: "9_e", text: "Принятие в тишине", category: "actualization", effect: { meaning: 1 } }
    ]
  }
];
