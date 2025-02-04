export interface Fruit {
  id: number;
  name: string;
  icon: string;
  filename: string;
  description: string;
  cost: 10000 | 30000 | 60000 | 75000 | 100000 | 500000 | 1000000;
  rarity: "Comum" | "Raro" | "Épico" | "Lendaria" | "Ultra Raro" | "Mitico";
  type: string;
  roman_name: string;
}

export const rarityMap: { [key: number]: Fruit["rarity"] } = {
  1: "Mitico", // Gomu Gomu no Mi (Luffy)
  2: "Lendaria", // Bara Bara no Mi (Buggy)
  3: "Raro", // Hana Hana no Mi (Nico Robin)
  4: "Épico", // Mera Mera no Mi (Ace/Sabo)
  5: "Ultra Raro", // Goro Goro no Mi (Enel)
  6: "Raro", // Sube Sube no Mi (Alvida)
  7: "Comum", // Kilo Kilo no Mi (Miss Valentine)
  8: "Comum", // Bomu Bomu no Mi (Mr. 5)
  9: "Raro", // Mane Mane no Mi (Mr. 2 Bon Clay)
  10: "Comum", // Toge Toge no Mi (Miss Doublefinger)
  11: "Comum", // Supa Supa no Mi (Mr. 1)
  12: "Comum", // Ori Ori no Mi (Hina)
  13: "Comum", // Bane Bane no Mi (Bellamy)
  14: "Épico", // Ito Ito no Mi (Doflamingo)
  15: "Comum", // Noro Noro no Mi (Foxy)
  16: "Comum", // Doa Doa no Mi (Blueno)
  17: "Comum", // Awa Awa no Mi (Kalifa)
  18: "Comum", // Beri Beri no Mi (Very Good)
  19: "Comum", // Sabi Sabi no Mi (Shu)
  20: "Comum", // Shari Shari no Mi (Bentham)
  21: "Lendaria", // Yomi Yomi no Mi (Brook)
  22: "Épico", // Kage Kage no Mi (Gecko Moria)
  23: "Raro", // Horo Horo no Mi (Perona)
  24: "Raro", // Suke Suke no Mi (Absalom)
  25: "Épico", // Nikyu Nikyu no Mi (Kuma)
  26: "Épico", // Jiki Jiki no Mi (Kid)
  27: "Lendaria", // Ope Ope no Mi (Law)
  28: "Raro", // Shiro Shiro no Mi (Bege)
  29: "Comum", // Wara Wara no Mi (Caribou)
  30: "Comum", // Oto Oto no Mi (Scratchmen Apoo)
  31: "Raro", // Mero Mero no Mi (Boa Hancock)
  32: "Raro", // Doku Doku no Mi (Magellan)
  33: "Raro", // Horu Horu no Mi (Ivankov)
  34: "Comum", // Choki Choki no Mi (Inazuma)
  35: "Mitico", // Gura Gura no Mi (Whitebeard/Blackbeard)
  36: "Comum", // Kira Kira no Mi (Diamond Jozu)
  37: "Comum", // Poke Poke no Mi (Blamenco)
  38: "Comum", // Woshu Woshu no Mi (Tsuru)
  39: "Raro", // Fuwa Fuwa no Mi (Shiki)
  40: "Comum", // Mato Mato no Mi (Van Augur)
  41: "Comum", // Fuku Fuku no Mi (Kin'emon)
  42: "Raro", // Buki Buki no Mi (Baby 5)
  43: "Comum", // Guru Guru no Mi (Buffalo)
  44: "Comum", // Beta Beta no Mi (Trebol)
  45: "Raro", // Hobi Hobi no Mi (Sugar)
  46: "Épico", // Zushi Zushi no Mi (Fujitora)
  47: "Comum", // Bari Bari no Mi (Bartolomeo)
  48: "Comum", // Nui Nui no Mi (Lao G)
  49: "Comum", // Giro Giro no Mi (Viola)
  50: "Comum", // Ato Ato no Mi (Giolla)
  51: "Comum", // Jake Jake no Mi (Jora)
  52: "Comum", // Pamu Pamu no Mi (Gladius)
  53: "Comum", // Sui Sui no Mi (Senor Pink)
  54: "Comum", // Ton Ton no Mi (Machvise)
  55: "Comum", // Hira Hira no Mi (Dellinger)
  56: "Comum", // Ishi Ishi no Mi (Pica)
  57: "Comum", // Fude Fude no Mi (Kanjuuro)
  58: "Comum", // Nagi Nagi no Mi (Rosinante)
  59: "Raro", // Chiyu Chiyu no Mi (Mansherry)
  60: "Épico", // Soru Soru no Mi (Big Mom)
  61: "Comum", // Mira Mira no Mi (Brulee)
  62: "Comum", // Pero Pero no Mi (Charlotte Perospero)
  63: "Comum", // Bisu Bisu no Mi (Charlotte Cracker)
  64: "Comum", // Kuri Kuri no Mi (Charlotte Galette)
  65: "Comum", // Bata Bata no Mi (Charlotte Opera)
  66: "Comum", // Buku Buku no Mi (Charlotte Mont-d'Or)
  67: "Comum", // Shibo Shibo no Mi (Charlotte Smoothie)
  68: "Comum", // Memo Memo no Mi (Charlotte Pudding)
  69: "Épico", // Mochi Mochi no Mi (Katakuri)
  70: "Comum", // Hoya Hoya no Mi (Charlotte Amande)
  71: "Comum", // Netsu Netsu no Mi (Charlotte Oven)
  72: "Comum", // Kuku Kuku no Mi (Charlotte Streusen)
  73: "Comum", // Gocha Gocha no Mi (Charlotte Dosmarche)
  74: "Comum", // Kubu Kobu no Mi (Charlotte Moscato)
  75: "Comum", // Oshi Oshi no Mi (Charlotte Counter)
  76: "Comum", // Kibi Kibi no Mi (Tama)
  77: "Lendaria", // Toki Toki no Mi (Toki)
  78: "Comum", // Juku Juku no Mi (Shinobu)
  79: "Comum", // Maki Maki no Mi (Charlotte Flampe)
  80: "Épico", // Moku Moku no Mi (Smoker)
  81: "Épico", // Suna Suna no Mi (Crocodile)
  82: "Épico", // Mera Mera no Mi (Ace/Sabo)
  83: "Ultra Raro", // Goro Goro no Mi (Enel)
  84: "Épico", // Hie Hie no Mi (Kuzan/Aokiji)
  85: "Mitico", // Yami Yami no Mi (Blackbeard)
  86: "Épico", // Pika Pika no Mi (Kizaru)
  87: "Épico", // Magu Magu no Mi (Akainu)
  88: "Comum", // Numa Numa no Mi (Caribou)
  89: "Comum", // Gasu Gasu no Mi (Caesar Clown)
  90: "Comum", // Yuki Yuki no Mi (Monet)
  91: "Comum", // Ushi Ushi no Mi (Dalton)
  92: "Raro", // Hito Hito no Mi (Chopper)
  93: "Comum", // Tori Tori no Mi (Pell)
  94: "Comum", // Mogu Mogu no Mi (Miss Merry Christmas)
  95: "Comum", // Inu Inu no Mi (Lassoo)
  96: "Comum", // Inu Inu no Mi (Chaka)
  97: "Comum", // Uma Uma no Mi (Pierre)
  98: "Raro", // Neko Neko no Mi (Rob Lucci)
  99: "Comum", // Zo Zo no Mi (Funkfreed)
  100: "Comum", // Inu Inu no Mi (Jabra)
  101: "Comum", // Ushi Ushi no Mi (Kaku)
  102: "Comum", // Hebi Hebi no Mi (Boa Marigold)
  103: "Comum", // Hebi Hebi no Mi (Boa Sandersonia)
  104: "Comum", // Kame Kame no Mi (Vander Decken IX)
  105: "Comum", // Tama Tama no Mi (Tamago)
  106: "Comum", // Sara Sara no Mi (SMILE user)
  107: "Comum", // Mushi Mushi no Mi (Kabu)
  108: "Comum", // Mushi Mushi no Mi (Bian)
  109: "Comum", // Tori Tori no Mi (Morgans)
  110: "Comum", // Inu Inu no Mi (Onimaru)
  111: "Raro", // Ryu Ryu no Mi (X Drake)
  112: "Raro", // Zo Zo no Mi (Jack)
  113: "Raro", // Ryu Ryu no Mi (Page One)
  114: "Raro", // Ryu Ryu no Mi (King)
  115: "Raro", // Ryu Ryu no Mi (Queen)
  116: "Raro", // Ryu Ryu no Mi (Ulti)
  117: "Raro", // Ryu Ryu no Mi (Sasaki)
  118: "Comum", // Kumo Kumo no Mi (Black Maria)
  119: "Raro", // Neko Neko no Mi (Who's-Who)
  120: "Mitico", // Tori Tori no Mi (Marco)
  121: "Mitico", // Hito Hito no Mi (Sengoku)
  122: "Mitico", // Uo Uo no Mi (Kaido)
  123: "Mitico", // Inu Inu no Mi (Catarina Devon)
  124: "Mitico", // Hebi Hebi no Mi (Orochi)
  125: "Mitico", // Hito Hito no Mi (Onimaru)
  126: "Mitico", // Inu Inu no Mi (Yamato)
  127: "Comum", // Sheep SMILE
  128: "Comum", // Bat SMILE
  129: "Comum", // Gazelle SMILE
  130: "Comum", // Mouse SMILE
  131: "Comum", // Lion SMILE
  132: "Comum", // Horse SMILE
  133: "Comum", // Snake SMILE
  134: "Comum", // Rabbit SMILE
  135: "Comum", // Hippopotamus SMILE
  136: "Comum", // Alpaca SMILE
  137: "Comum", // Elephant SMILE
  138: "Comum", // Scorpion SMILE
  139: "Comum", // Monkey SMILE
  140: "Comum", // Armadillo SMILE
  141: "Comum", // Ostrich SMILE
  142: "Comum", // Flying Squirrel SMILE
  143: "Comum", // White Snake SMILE
  144: "Comum", // Gorilla SMILE
  145: "Comum", // Rooster SMILE
  146: "Comum", // Giraffe SMILE
  147: "Comum", // Rattlesnake SMILE
  148: "Comum", // Heterodon SMILE
  149: "Comum", // Caiman SMILE
  150: "Comum", // Pug SMILE
  151: "Comum", // Goe Goe no Mi (Aisa)
  152: "Comum", // Hiso Hiso no Mi (Laffitte)
  153: "Comum", // Kama Kama no Mi (Kikunojo)
  154: "Comum", // Kachi Kachi no Mi (Mr. 3)
  155: "Comum", // Nemu Nemu no Mi (Laffitte)
  156: "Comum", // Mini Mini no Mi (Lily Enstomach)
  157: "Comum", // Atsu Atsu no Mi (Oven)
  158: "Comum", // Noko Noko no Mi (Caesar Clown)
  159: "Comum", // Ami Ami no Mi (Hody Jones)
  160: "Comum", // Kopi Kopi no Mi (Brulee)
  161: "Comum", // Mosa Mosa no Mi (Green Bit)
  162: "Comum", // Modo Modo no Mi (Shinobu)
  163: "Comum", // Gutsu Gutsu no Mi (Charlotte Oven)
  164: "Comum", // Peto Peto no Mi (Charlotte Mont-d'Or)
  165: "Comum", // Kone Kone no Mi (Charlotte Pudding)
  166: "Comum", // Moa Moa no Mi (Charlotte Smoothie)
  167: "Comum", // Kyubu Kyubu no Mi (Charlotte Cracker)
  168: "Comum", // Maji Maji no Mi (Charlotte Galette)
  169: "Comum", // Nito Nito no Mi (Charlotte Opera)
  170: "Comum", // Hore Hore no Mi (Charlotte Flampe)
  171: "Comum", // Nuku Nuke no Mi (Charlotte Amande)
  172: "Comum", // Koro Koro no Mi (Charlotte Counter)
  173: "Comum", // Jara Jara no Mi (Charlotte Moscato)
  174: "Comum", // Iro Iro no Mi (Charlotte Dosmarche)
  175: "Comum", // Gol Gol no Mi (Gild Tesoro)
  176: "Comum", // Raki Raki no Mi (Lucky Roux)
  177: "Comum", // Nepa Nepa no Mi (Charlotte Oven)
  178: "Comum", // Mono Mono no Mi (Charlotte Streusen)
  179: "Comum", // Bijo Bijo no Mi (Charlotte Smoothie)
  180: "Comum", // Ute Ute no Mi (Charlotte Cracker)
  181: "Comum", // Pocha Pocha no Mi (Charlotte Galette)
  182: "Comum", // Bana Bana no Mi (Charlotte Opera)
  183: "Comum", // Deri Deri no Mi (Charlotte Mont-d'Or)
  184: "Comum", // Dero Dero no Mi (Charlotte Pudding)
  185: "Comum", // Basu Basu no Mi (Charlotte Flampe)
  186: "Comum", // Gasha Gasha no Mi (Charlotte Amande)
  187: "Comum", // Nibi Nibi no Mi (Charlotte Counter)
  188: "Comum", // Toro Toro no Mi (Charlotte Moscato)
  189: "Comum", // Pasa Pasa no Mi (Charlotte Dosmarche)
  190: "Comum", // Ame Ame no Mi (Charlotte Streusen)
  191: "Comum", // Tori Tori no Mi (Morgans)
  192: "Comum", // Ushi Ushi no Mi (Dalton)
  193: "Comum", // Inu Inu no Mi (Onimaru)
  194: "Comum", // Batto Batto no Mi (Moria)
  195: "Comum", // Tori Tori no Mi (Marco)
  196: "Mitico", // Hito Hito no Mi, Nika model (Luffy)
  197: "Comum", // Artificial demon fruit from Vegapunk
  198: "Comum", // Nomi Nomi no Mi (Clover)
  199: "Comum", // Riki Riki no Mi (Hajrudin)
  200: "Comum", // Wapu Wapu no Mi (Van Augur)
  201: "Comum", // Shima Shima no Mi (Pappug)
  202: "Comum", // Deka Deka no Mi (Sanjuan Wolf)
  203: "Comum", // Gabu Gabu no Mi (Vander Decken IX)
  204: "Comum", // Shiku Shiku no Mi (Doc Q)
  205: "Mitico", // Uma Uma no Mi, Pegasus model (Pierre)
  206: "Mitico", // Tori Tori no Mi, Phoenix model (Marco)
};
